using System.ComponentModel.DataAnnotations;

namespace LifeOS.Models
{
    public class ProductList
    {
        public int Id { get; set; } // 主キー
        [Required(ErrorMessage = "商品名は必須です。")] // データ検証ルール
        [StringLength(100, ErrorMessage = "商品名は100文字以内で入力してください。")]
        public string Name { get; set; }
        [Required(ErrorMessage = "価格は必須です。")]
        [Range(0.01, 10000.00, ErrorMessage = "価格は0.01から10000.00の間で入力してください。")]
        [DataType(DataType.Currency)] // 表示形式のヒント
        public decimal Price { get; set; }
        [StringLength(500, ErrorMessage = "説明は500文字以内で入力してください。")]
        public string Description { get; set; }
    }
}
