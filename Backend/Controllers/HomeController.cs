using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuizzSystem.Controllers.Abstraction;

namespace QuizzSystem.Controllers
{
    public class HomeController : BaseController
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Test(int q)
        {

            return "Everything ok!";
        }
    }
}
