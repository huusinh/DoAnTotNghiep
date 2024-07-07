using Pagination.EntityFrameworkCore.Extensions;
using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;
using System.Linq;

namespace QuizzSystem.Database.Repositories
{
    public class CompetitionSettingRepository : BaseRepository<CompetitionSetting, int>
    {
        public CompetitionSettingRepository(AppDbContext dbContext) : base(dbContext.CompetitionSettings) { }  
    }
}
