using Microsoft.EntityFrameworkCore;
using QuizzSystem.Models;
using QuizzSystem.Models.Common;

namespace QuizzSystem.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Quizz> Quizz { get; set; }
    }
}
