using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Pagination.EntityFrameworkCore.Extensions;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Database;
using QuizzSystem.Models;
using QuizzSystem.Response;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizzSystem.Controllers
{
    public class HomeController : BaseController
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _dbContext;

        public HomeController(ILogger<HomeController> logger, AppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardData(int pageIndex)
        {
            var keywordsCount = await _dbContext.Questions.CountAsync();
            var competitionsCount = await _dbContext.Competitions.CountAsync();
            var histories = await _dbContext.CompetitionTeams
                                        .AsNoTracking()
                                        .Where(e => e.Competition!.IsCompleted)
                                        .Select(e => new HistoryRecord
                                        {
                                            Id = e.Id,
                                            CompetitionName = e.Competition!.CompetitionName!,
                                            TeamName = e.TeamName!,
                                            CorrectAnswerCount = e.CorrectAnswerCount,
                                            FailedAnswerCount = e.Results.Count() - e.CorrectAnswerCount
                                        })
                                        .ToListAsync();

            var data = new
            {
                KeywordsCount = keywordsCount,
                CompetitionsCount = competitionsCount,
                Histories = new Pagination<HistoryRecord>(histories, histories.Count, pageIndex, applyPageAndLimitToResults: true)
            };

            return Ok(data);
        }
    }
}
