using Microsoft.AspNetCore.Mvc;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Database.Repositories;
using QuizzSystem.Database;
using QuizzSystem.Requests.Question;
using QuizzSystem.Requests.Competition;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using QuizzSystem.Models;
using System.Threading.Tasks;
using System;

namespace QuizzSystem.Controllers
{
    public class CompetitionController : BaseController
    {
        private readonly AppDbContext _dbContext;
        private readonly CompetitionRepository _competitionRepository;
        private readonly CompetitionSettingRepository _competitionSettingRepository;
        private readonly CompetitionTeamRepository _competitionTeamRepository;
        private readonly ResultRepository _ResultRepository;

        public CompetitionController(
            AppDbContext dbContext,
            CompetitionRepository competitionRepository,
            CompetitionSettingRepository competitionSettingRepository,
            CompetitionTeamRepository competitionTeamRepository,
            ResultRepository resultRepository)
        {
            _dbContext = dbContext;
            _competitionRepository = competitionRepository;
            _competitionSettingRepository = competitionSettingRepository;
            _competitionTeamRepository = competitionTeamRepository;
            _ResultRepository = resultRepository;
        }

        [HttpPost]
        public IActionResult AddCompetition(CreateCompetition request)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            var setting = new Models.CompetitionSetting
            {
                ContestTime = request.ContestTime,
                ContestRule = request.ContestRule,
                MaxQuestionCount = request.MaxQuestionCount,
                MaxTeamCount = request.MaxTeamCount,
            };
            _competitionSettingRepository.Add(setting);
            _dbContext.SaveChanges();

            var competition = new Models.Competition
            {
                CompetitionName = request.CompetitionName,
                CreatorId = request.CreatorID,
                CompetitionSettingId = setting.Id
            };
            _competitionRepository.Add(competition);
            _dbContext.SaveChanges();

            foreach (var Team in request.TeamList)
            {
                var team = new Models.CompetitionTeam
                {
                    TeamName = Team.Key,
                    CompetitionId = competition.Id
                };

                _competitionTeamRepository.Add(team);
                _dbContext.SaveChanges();

                foreach(var item in Team.Value)
                {
                    _ResultRepository.Add(new Result
                    {
                        IsCorrect = 0,
                        QuestionId = item,
                        CompetitionTeamId = team.Id
                    });
                }
            }

            _dbContext.SaveChanges();
            transaction.Commit();

            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult UpdateCompetition(CreateCompetition request)
        {
            _competitionRepository.Update(new Models.Competition
            {
                CompetitionName = request.CompetitionName
            });

            _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("Delete")]
        public IActionResult DeleteCompetition(int competitionID)
        {
            _competitionRepository.Delete(competitionID);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompetition(int pageIndex)
        {
            try
            {
                var result = await _competitionRepository.GetPagedDataAsync(pageIndex);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
