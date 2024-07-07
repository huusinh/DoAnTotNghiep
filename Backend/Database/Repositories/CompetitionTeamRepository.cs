using QuizzSystem.Database.Repositories.Abstraction;
using QuizzSystem.Models;

namespace QuizzSystem.Database.Repositories
{
    public class CompetitionTeamRepository : BaseRepository<CompetitionTeam, int>
    {
        public CompetitionTeamRepository(AppDbContext dbContext) : base(dbContext.CompetitionTeams) { }
    }
}
