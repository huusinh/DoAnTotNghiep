using System;
using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;

namespace QuizzSystem.Database.Repositories
{
	public class QuizzRepository : BaseRepository<Quizz, int>
	{
		public QuizzRepository(AppDbContext dbContext) : base(dbContext.Quizz) { }
	}
}

