using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Database;
using QuizzSystem.Database.Repositories;
using QuizzSystem.Models;
using QuizzSystem.Requests.Question;

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
        [HttpGet]
        public async Task<IActionResult> GetAllQuestion(int pageIndex)
        {
            try
            {
                var result = await _questionRepository.GetAllAsync(pageIndex);
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
				Description = request.Description,
			});

			_dbContext.SaveChanges();
            
			return Ok();
		}

        [HttpPost("Update")]
        public IActionResult UpdateQuizz(CreateQuestion request)
        {
            _questionRepository.Update(new Models.Question
            {
                Description = request.Description
            });

            _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("Delete")]
        public IActionResult DeleteQuizz(int questionId)
        {
            _questionRepository.Delete(questionId);

            return Ok();
        }
    }
}

