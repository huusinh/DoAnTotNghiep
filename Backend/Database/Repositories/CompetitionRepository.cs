using Microsoft.EntityFrameworkCore;
using Pagination.EntityFrameworkCore.Extensions;
using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;
using System.Linq;
using System.Threading.Tasks;

namespace QuizzSystem.Database.Repositories
{
    public class CompetitionRepository : BaseRepository<Competition, int>
    {
        public CompetitionRepository(AppDbContext dbContext) : base(dbContext.Competitions) { }
    }
}
