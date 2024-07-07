using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;

namespace QuizzSystem.Models;

public partial class Competition : BaseEntity<int>
{
    public string? CompetitionName { get; set; }

    public int? CreatorId { get; set; }

    public int? CompetitionSettingId { get; set; }

    public virtual CompetitionSetting? CompetitionSetting { get; set; }

    public virtual ICollection<CompetitionTeam> CompetitionTeams { get; set; } = new List<CompetitionTeam>();

    public virtual AppUser? Creator { get; set; }
}
