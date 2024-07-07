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
            int settingID = _competitionSettingRepository.CreateID();
            _competitionSettingRepository.Add(new Models.CompetitionSetting
            {
                Id = settingID,
                ContestTime = request.ContestTime,
                ContestRule = request.ContestRule,
                MaxQuestionCount = request.MaxQuestionCount,
                MaxTeamCount = request.MaxTeamCount,
            });
            int competitionID = _competitionRepository.CreateID();
            _competitionRepository.Add(new Models.Competition
            {
                Id= competitionID,
                CompetitionName = request.CompetitionName,
                CreatorId = request.CreatorID,
                CompetitionSettingId = settingID
            });
            int teamID = _competitionTeamRepository.CreateID();
            int resultID = _ResultRepository.CreateID();
            foreach (var Team in request.TeamList)
            {
                _competitionTeamRepository.Add(new Models.CompetitionTeam
                {
                    Id = teamID,
                    TeamName = Team.Key,
                    CompetitionId = competitionID
                });
                foreach(var item in Team.Value)
                {
                    _ResultRepository.Add(new Result
                    {
                        Id = resultID,
                        IsCorrect = 0,
                        QuestionId = item,
                        CompetitionTeamId = teamID
                    });
                    resultID++;
                }
                teamID++;
            }
            _dbContext.SaveChanges();

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
                var result = await _competitionRepository.GetAllAsync(pageIndex);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
