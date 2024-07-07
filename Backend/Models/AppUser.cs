using Microsoft.AspNetCore.Identity;
using QuizzSystem.Models.Common;

namespace QuizzSystem.Models
{
    public class AppUser : IdentityUser<int>, ISoftDelete
    {
        public bool IsSoftDeleted { get; set; }
    }
}
