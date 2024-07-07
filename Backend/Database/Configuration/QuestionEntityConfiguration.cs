using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuizzSystem.Models;

namespace QuizzSystem.Database.Configuration
{
    public class QuestionEntityConfiguration : BaseConfiguration<Question, int>
    {
        public override void Configure(EntityTypeBuilder<Question> builder)
        {
            base.Configure(builder);
        }
    }
}
