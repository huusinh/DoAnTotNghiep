using Microsoft.EntityFrameworkCore;
using Pagination.EntityFrameworkCore.Extensions;
using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace QuizzSystem.Database.Repositories
{
    public class CompetitionRepository : BaseRepository<Competition, int>
    {
        public CompetitionRepository(AppDbContext dbContext) : base(dbContext.Competitions) { }

        public async Task<Pagination<Competition>> GetPagedDataAsync(int pageIndex, bool IsCompleted, CancellationToken cancellationToken = default)
        {
            var list = await DbSet.Include(i => i.CompetitionTeams).ThenInclude(t => t.Results).Where(x => x.IsCompleted == IsCompleted).ToListAsync(cancellationToken);
            var total = list.Count;
            return new Pagination<Competition>(list, total, pageIndex, applyPageAndLimitToResults: true);
        }
    }
}
