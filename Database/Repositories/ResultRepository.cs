using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;

namespace QuizzSystem.Database.Repositories
{
    public class ResultRepository : BaseRepository<Result, int>
    {
        public ResultRepository(AppDbContext dbContext) : base(dbContext.Results) { }
    }
}
