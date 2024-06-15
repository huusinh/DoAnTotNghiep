using Microsoft.EntityFrameworkCore;
using QuizzSystem.Models.Common;

namespace QuizzSystem.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
