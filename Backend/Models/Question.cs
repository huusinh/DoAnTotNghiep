using QuizzSystem.Models.Common;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace QuizzSystem.Models;

public partial class Question : BaseEntity<int>
{
    public string Keyword { get; set; } = default!;

    [JsonIgnore]
    public virtual ICollection<Result> Results { get; set; } = new List<Result>();
}
