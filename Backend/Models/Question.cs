using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;

namespace QuizzSystem.Models;

public partial class Question : BaseEntity<int>
{
    public string? Description { get; set; }

    public string Keyword { get; set; } = default!;

    public virtual ICollection<Result> Results { get; set; } = new List<Result>();
}
