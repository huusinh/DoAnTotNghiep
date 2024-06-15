using System;
using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;

namespace QuizzSystem.Database.Repositories
{
	public class QuestionRepository : BaseRepository<Question, int>
	{
		public QuestionRepository(AppDbContext dbContext) : base(dbContext.Questions)
		{
		}


	}
}

