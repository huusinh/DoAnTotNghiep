using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuizzSystem.Models;

namespace QuizzSystem.Database.Configuration
{
    public class CompetitionEntityConfiguration : BaseConfiguration<Competition, int>
    {
        public override void Configure(EntityTypeBuilder<Competition> builder)
        {
            base.Configure(builder);
        }
    }
}
