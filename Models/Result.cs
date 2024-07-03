using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;

namespace QuizzSystem.Models;

public partial class Result : BaseEntity<int>
{
    public int? IsCorrect { get; set; }

    public int? QuestionId { get; set; }

    public int? CompetitionTeamId { get; set; }

    public virtual CompetitionTeam? CompetitionTeam { get; set; }

    public virtual Question? Question { get; set; }
}
