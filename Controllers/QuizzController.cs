using System;
using Microsoft.AspNetCore.Mvc;
using QuizzSystem.Controllers.Abstraction;
using QuizzSystem.Database;
using QuizzSystem.Database.Repositories;
using QuizzSystem.Requests.Quizz;

namespace QuizzSystem.Controllers
{
    public class QuizzController : BaseController
    {
        private readonly AppDbContext _dbContext;
        private readonly QuizzRepository _quizzRepository;

        public QuizzController(AppDbContext dbContext, QuizzRepository quizzRepository)
        {
            _dbContext = dbContext;
            _quizzRepository = quizzRepository;
        }

        [HttpPost]
        public IActionResult AddQuizz(CreateQuizz request)
        {
            _quizzRepository.Add(new Models.Quizz
            {
                QuizzName = request.QuizzName
            });

            _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult UpdateQuizz(CreateQuizz request)
        {
            _quizzRepository.Update(new Models.Quizz
            {
                QuizzName = request.QuizzName
            });

            _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("Delete")]
        public IActionResult DeleteQuizz(int quizzId)
        {
            _quizzRepository.Delete(quizzId);

            return Ok();
        }
    }
}
