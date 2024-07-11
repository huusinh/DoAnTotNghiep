using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Database;
using QuizzSystem.Database.Repositories;
using QuizzSystem.Models;
using QuizzSystem.Requests.Competition;
using System;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

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
                MaxTeamCount = request.MaxTeamCount,
                QuestionScore = request.QuestionScore,
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

        [HttpPost("{competitionID}/Update")]
        public async Task<IActionResult> UpdateCompetition([FromRoute] int competitionID, CreateCompetition request)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            var count = await _dbContext.Competitions
                                .Where(e => e.Id == competitionID)
                                .ExecuteUpdateAsync(setters =>
                                    setters
                                        .SetProperty(e => e.CompetitionName, request.CompetitionName)
                                        .SetProperty(e => e.ContestTime, request.ContestTime)
                                        .SetProperty(e=> e.ContestRule, request.ContestRule)
                                        .SetProperty(e=> e.MaxQuestionCount, request.MaxQuestionCount)
                                        .SetProperty(e=> e.MaxTeamCount, request.MaxTeamCount)
                                        .SetProperty(e=> e.QuestionScore, request.QuestionScore)
            );
            if (count == 0)
            {
                return NotFound();
            }

            await _dbContext.CompetitionTeams.Where(t => t.CompetitionId == competitionID)
                                                .ExecuteDeleteAsync();
            

            foreach (var Team in request.TeamList)
            {
                var team = new Models.CompetitionTeam
                {
                    TeamName = Team.Key,
                    CompetitionId = competitionID
                };

                _competitionTeamRepository.Add(team);
                _dbContext.SaveChanges();

                foreach (var item in Team.Value)
                {
                    _ResultRepository.Add(new Result
                    {
                        IsCorrect = 0,
                        QuestionId = item,
                        CompetitionTeamId = team.Id
                    });
                }
                _dbContext.SaveChanges();
            }
            _dbContext.SaveChanges();
            transaction.Commit();
            return Ok();

        }

        [HttpPost("{competitionId}/Delete")]
        public IActionResult DeleteCompetition(int competitionId)
        {
            _competitionRepository.Delete(competitionId);

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
            var result = await _dbContext.Competitions
                                         .Include(e => e.CompetitionTeams)
                                         .ThenInclude(e => e.Results)
                                         .ThenInclude(e => e.Question)
                                         .FirstOrDefaultAsync(e => e.Id == competitionId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{competitionId:int}/teams/{teamId:int}/questions")]
        public async Task<IActionResult> GetQuestionsOfTeam(int competitionId, int teamId)
        {
            var result = await _dbContext.Results
                                    .Include(e => e.Question)
                                    .Where(e => e.CompetitionTeam!.Competition!.Id == competitionId
                                                && e.CompetitionTeamId == teamId)
                                    .ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("Submit")]
        public async Task<IActionResult> SubmitTeamResult(SaveResultRequest request)
        {
            try
            {
                using var transaction = _dbContext.Database.BeginTransaction();
                foreach(var item in request.Result)
                {
                    var recordCount = await _dbContext.Results
                                .Where(e => e.Id == item.Key && e.CompetitionTeamId == request.TeamId)
                                .ExecuteUpdateAsync(setters =>
                                    setters
                                        .SetProperty(e => e.IsCorrect, item.Value ? 1 : 0));
                    await _dbContext.CompetitionTeams.Where(e => e.Id == request.TeamId)
                                .ExecuteUpdateAsync(setters => setters.SetProperty(e => e.IsCompleted, true));
                    if (recordCount == 0)
                    {
                        return NotFound();
                    }
                }

                await _dbContext.Competitions
                            .Where(e => e.Id == request.CompetitionId)
                            .ExecuteUpdateAsync(setters =>
                                setters.SetProperty(
                                    e => e.IsCompleted,
                                    _dbContext.CompetitionTeams
                                                .Where(e => e.CompetitionId == request.CompetitionId)
                                                .All(e => e.IsCompleted)
                                )
                            );
                await transaction.CommitAsync();
                TeamResultReponse teamResultReponse = new TeamResultReponse()
                {
                    CorrectAnswerCount = request.Result.Count(i => i.Value),
                    TeamScore = request.Result.Count(i => i.Value) * request.QuestionScore,
                };
                return Ok(teamResultReponse);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
