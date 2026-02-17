using Microsoft.AspNetCore.Mvc;

namespace LifeOS.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Detail()
            {
                return View();
        }
    }
}
