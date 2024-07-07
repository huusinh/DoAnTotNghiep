﻿using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;

namespace QuizzSystem.Models;

public partial class Competition : BaseEntity<int>
{
    public string? CompetitionName { get; set; }

    public int? CreatorId { get; set; }

    public int? CompetitionSettingId { get; set; }

    public virtual ICollection<CompetitionTeam> CompetitionTeams { get; set; } = new List<CompetitionTeam>();

    public virtual AppUser? Creator { get; set; }
    public bool IsCompleted { get; set; }
    public int? QuestionScore { get; set; }

    public int? ContestTime { get; set; }

    public string? ContestRule { get; set; }

    public int? MaxTeamCount { get; set; }

    public int? MaxQuestionCount { get; set; }
}
