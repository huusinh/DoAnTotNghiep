using Microsoft.AspNetCore.Identity;
using QuizzSystem.Models.Common;

namespace QuizzSystem.Models
{
    public class AppRole : IdentityRole<int>, ISoftDelete
    {
        public bool IsSoftDeleted { get; set; }
    }
}
