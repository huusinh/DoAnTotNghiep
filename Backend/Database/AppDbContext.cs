using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizzSystem.Models;
using System.Reflection;

namespace QuizzSystem.Database
{
    public class AppDbContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Competition> Competitions { get; set; }

        public DbSet<CompetitionTeam> CompetitionTeams { get; set; }

        public DbSet<Result> Results { get; set; }

        public DbSet<CompetitionSetting> CompetitionSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=LAPTOP-3J2ABMEP\\MSSQLSERVER01;Initial Catalog=UnderstandingTeammates;Integrated Security=True;Encrypt=False;Trust Server Certificate=True");
            }
        }
    }
}
