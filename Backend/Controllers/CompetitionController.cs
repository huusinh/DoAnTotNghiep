using Microsoft.AspNetCore.Mvc;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Database.Repositories;
using QuizzSystem.Database;
using QuizzSystem.Requests.Competition;
using QuizzSystem.Models;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using System.Threading.Tasks;
using System;
using QuizzSystem.Models;

namespace QuizzSystem.Controllers
{
    public class CompetitionController : BaseController
    {
        private readonly AppDbContext _dbContext;
        private readonly CompetitionRepository _competitionRepository;
        private readonly CompetitionTeamRepository _competitionTeamRepository;
        private readonly ResultRepository _ResultRepository;

        public CompetitionController(
            AppDbContext dbContext,
            CompetitionRepository competitionRepository,
            CompetitionTeamRepository competitionTeamRepository,
            ResultRepository resultRepository)
        {
            _dbContext = dbContext;
            _competitionRepository = competitionRepository;
            _competitionTeamRepository = competitionTeamRepository;
            _ResultRepository = resultRepository;
        }

        [HttpPost]
        public IActionResult AddCompetition(CreateCompetition request)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            _dbContext.SaveChanges();

            var competition = new Models.Competition
            {
                CompetitionName = request.CompetitionName,
                CreatorId = request.CreatorID,
                ContestTime = request.ContestTime,
                ContestRule = request.ContestRule,
                MaxQuestionCount = request.MaxQuestionCount,
                MaxTeamCount = request.MaxTeamCount
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
        public async Task<IActionResult> GetAllCompetitionInCompleted(int pageIndex)
        {
            try
            {
                var result = await _competitionRepository.GetPagedDataAsync(pageIndex, false);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("histories")]
        public async Task<IActionResult> GetAllCompetitionCompleted(int pageIndex)
        {
            try
            {
                var result = await _competitionRepository.GetPagedDataAsync(pageIndex, true);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("{competitionId:int}")]
        public async Task<IActionResult> GetCompetitionById(int competitionId)
        {
            var result = await _competitionRepository.GetByIdAsync(competitionId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
