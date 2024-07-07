using Microsoft.AspNetCore.Identity;
using QuizzSystem.Models.Common;

namespace QuizzSystem.Models
{
    public class AppUser : IdentityUser<int>, ISoftDelete
    {
        public string FullName { get; set; } = default!;

        public bool IsSoftDeleted { get; set; }
    }
}
