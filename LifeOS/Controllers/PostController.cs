using Microsoft.AspNetCore.Mvc;

namespace LifeOS.Controllers
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public System.DateTime CreatedDate { get; set; }
    }

    [Route("posts")] // このコントローラーが処理するベースパス
    public class PostController : Controller
    {
        // ダミーのデータストア（実際のアプリケーションではデータベースと連携）
        private static List<Post> _posts = new List<Post>
        {
            new Post { Id = 1, Title = "最初の記事", Content = "これはテスト記事です。", CreatedDate = System.DateTime.Now.AddDays(-1) },
            new Post { Id = 2, Title = "二番目の記事", Content = "ASP.NET Core MVCについて。", CreatedDate = System.DateTime.Now }
        };
        private static int _nextId = 3; // 次の記事のID
                                        // GET /posts
        [HttpGet("")]
        public IActionResult Index()
        {
            // モデルから記事リストを取得（ダミーデータを使用）
            var posts = _posts.OrderByDescending(p => p.CreatedDate).ToList();
            // 取得したデータをビューに渡して表示
            return View(posts);
        }
        // GET /posts/create
        [HttpGet("create")]
        public IActionResult Create()
        {
            // 記事作成フォームを表示
            return View();
        }
        // POST /posts/create
        [HttpPost("create")]
        [ValidateAntiForgeryToken] // CSRF対策
        public IActionResult Create(Post post) // リクエストボディからPostオブジェクトに自動バインド
        {
            // モデルのバリデーション（例: タイトルが必須）
            if (string.IsNullOrWhiteSpace(post.Title))
            {
                ModelState.AddModelError("Title", "タイトルは必須です。");
            }
            if (string.IsNullOrWhiteSpace(post.Content))
            {
                ModelState.AddModelError("Content", "本文は必須です。");
            }
            if (ModelState.IsValid) // バリデーションが成功した場合
            {
                post.Id = _nextId++; // 新しいIDを割り当て
                post.CreatedDate = System.DateTime.Now;
                _posts.Add(post); // ダミーデータストアに追加
                                  // 記事一覧ページへリダイレクト
                return RedirectToAction(nameof(Index)); // Indexアクションにリダイレクト
            }
            // バリデーションエラーがあった場合は、フォームを再表示
            return View(post);
        }
        // GET /posts/{id}
        [HttpGet("{id}")]
        public IActionResult Details(int id)
        {
            var post = _posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
            {
                return NotFound(); // 404 Not Foundを返す
            }
            return View(post);
        }
    }
}
