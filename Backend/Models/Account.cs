using QuizzSystem.Models.Common;
using System;
using System.Collections.Generic;

namespace QuizzSystem.Models;

public partial class Account : BaseEntity<int>
{

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public int? UserType { get; set; }

    public virtual ICollection<Competition> Competitions { get; set; } = new List<Competition>();
}
