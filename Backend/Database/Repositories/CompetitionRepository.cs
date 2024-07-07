using Microsoft.EntityFrameworkCore;
using Pagination.EntityFrameworkCore.Extensions;
using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;
using System.Threading;
using System.Threading.Tasks;

namespace QuizzSystem.Database.Repositories
{
    public class CompetitionRepository : BaseRepository<Competition, int>
    {
        public CompetitionRepository(AppDbContext dbContext) : base(dbContext.Competitions) { }

        public override async Task<Pagination<Competition>> GetPagedDataAsync(int pageIndex, CancellationToken cancellationToken = default)
        {
            var list = await DbSet.Include(e => e.CompetitionSetting).ToListAsync(cancellationToken);
            var total = list.Count;
            return new Pagination<Competition>(list, total, pageIndex);
        }
    }
}
