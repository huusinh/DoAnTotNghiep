using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuizzSystem.Models;
using System;

namespace QuizzSystem.Database.Configuration
{
	public class CompetitionTeamEntityConfiguration : BaseConfiguration<CompetitionTeam, int>
	{
        public override void Configure(EntityTypeBuilder<CompetitionTeam> builder)
        {
            base.Configure(builder);
            builder.HasMany(e => e.Results)
                .WithOne(e => e.CompetitionTeam)
                .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}

