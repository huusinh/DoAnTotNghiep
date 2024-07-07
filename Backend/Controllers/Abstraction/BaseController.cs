using Microsoft.AspNetCore.Mvc;
using QuizzSystem.ActionFilters;

namespace QuizzSystem.Controllers.Abstraction
{
    [ApiController]
    [StandardizeResponseActionFilter]
    [Route("api/v{v:apiVersion}/[controller]")]
    public class BaseController : ControllerBase
    {
    }
}
