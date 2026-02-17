import { useEffect ,useState} from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
}

export default function ProductList() {
    const [Products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);    

    useEffect(() => {

        const API_BASE_URL = window.location.origin;

        const url = `${API_BASE_URL}/api/products`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Product[]) => setProducts(data))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setError('商品の取得に失敗に失敗しました。');
            });
    }, []);

    const handleClick = (product: Product) => {
        alert(`商品名: ${product.name}\n価格: ${product.price}円`);

        if (error) {
            return <div>エラー：{error}</div>
        }

    }


    return (
        <div className="ProductList">
            <p>商品リスト</p>
            {Products.map(product => (
                <li onClick={() => handleClick(product) }>
                    { product.name}
                </li>
            ))}


        </div>
    )
}