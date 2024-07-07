using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;

namespace QuizzSystem.Models;

public partial class CompetitionSetting : BaseEntity<int>
{
    public int? QuestionScore { get; set; }

    public int? ContestTime { get; set; }

    public string? ContestRule { get; set; }

    public int? MaxTeamCount { get; set; }

    public int? MaxQuestionCount { get; set; }

    public bool? IsDefault { get; set; }
}
