﻿using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;

namespace QuizzSystem.Models;

public partial class CompetitionTeam : BaseEntity<int>
{
    public string? TeamName { get; set; }

    public int? CompetitionId { get; set; }

    public virtual Competition? Competition { get; set; }

    public virtual ICollection<Result> Results { get; set; } = new List<Result>();
}