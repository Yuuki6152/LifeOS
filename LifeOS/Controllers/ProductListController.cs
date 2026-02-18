using LifeOS.Models; // ProductListモデルがこの名前空間にあると仮定
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
namespace LifeOS.Controllers
{
    public class ProductListController : Controller
    {

        private readonly List<ProductList> _products = new List<ProductList> // 簡易的なデータソース（DBの代わり）
        {
            new ProductList { Id = 1, Name = "Laptop", Price = 1200.00m, Description = "高性能ラップトップ" },
            new ProductList { Id = 2, Name = "Mouse", Price = 25.00m, Description = "ワイヤレスマウス" }
        };

        public IActionResult Index()
        {
            return View(_products);
        }

        public IActionResult Details(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound(); // 商品が見つからない場合
            }
            return View(product); // Viewに単一の商品を渡す
        }
    }

   


}
