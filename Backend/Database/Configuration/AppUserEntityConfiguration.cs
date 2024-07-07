using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuizzSystem.Models;

namespace QuizzSystem.Database.Configuration
{
    public class AppUserEntityConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.HasQueryFilter(e => !e.IsSoftDeleted);
        }
    }
}
