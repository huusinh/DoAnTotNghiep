using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Database;
using QuizzSystem.Database.Repositories;
using QuizzSystem.Requests.Question;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuizzSystem.Controllers
{
    public class QuestionController : BaseController
    {
        private readonly AppDbContext _dbContext;
        private readonly QuestionRepository _questionRepository;

        public QuestionController(
            AppDbContext dbContext,
            QuestionRepository questionRepository)
        {
            _dbContext = dbContext;
            _questionRepository = questionRepository;
        }

        [HttpGet("{keywordId:int}")]
        public async Task<IActionResult> GetQuestionById(int keywordId)
        {
            var result = await _questionRepository.GetByIdAsync(keywordId);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("select")]
        public async Task<IActionResult> GetQuestionsSelect()
        {
            var result = await _dbContext.Questions.Select(e => new
            {
                e.Id,
                e.Keyword
            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllQuestion(int pageIndex)
        {
            try
            {
                var result = await _questionRepository.GetPagedDataAsync(pageIndex);
                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult AddQuestion(CreateQuestion request)
        {
            _questionRepository.Add(new Models.Question
            {
                Keyword = request.Keyword
            });

            _dbContext.SaveChanges();
            
            return Ok();
        }

        [HttpPost("{keywordId}/Update")]
        public async Task<IActionResult> UpdateQuizz([FromRoute] int keywordId, CreateQuestion request)
        {
            var count = await _dbContext.Questions
                                .Where(e => e.Id == keywordId)
                                .ExecuteUpdateAsync(setters =>
                                    setters
                                        .SetProperty(e => e.Keyword, request.Keyword)
            );

            if (count == 0)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPost("{keywordId}/Delete")]
        public IActionResult DeleteQuizz([FromRoute] int keywordId)
        {
            _questionRepository.Delete(keywordId);

            return Ok();
        }
    }
}
