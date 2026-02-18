export class MySimpleComponent extends HTMLElement{
    constructor(){
        super(); // 必須：HTMLElementのコンストラクタを呼び出す
        console.log('MySimpleComponentがインスタンス化されました。');

        const shadowRoot = this.attachShadow({ mode: 'open' }); // シャドウDOMを作成

        shadowRoot.innerHTML = `
            <style>
                /*Shadow DOM内部のスタイルは外部に影響せず、外部のスタイルも内部に影響しない*/
                div {
                    border: 1px solid #ccc;
                    padding:10px;
                    background-color: #f9f9f9;
                    fpmt^family: sans-serif;
                }
                h2{
                    color:blue;
                }
                p{
                    color :#333;
                }
            </style>

        `;


    }

    //要素がDOMに初めて接続された田沖に呼び出されるライフサイクルコールバック
    connectedCallback() {
        this.innerHTML = `
            <div>
                <h1>Hellow from MySimpleComponent</h1>
                <p>これはカスタムWebコンポーネントです。</p>
            </div>
        `;

        console.log('MySimpleComponentがDOMに接続されました。');
    }

    //要素がDOMから切り離されたときに呼び出されるライフサイクルコールバック
    disconnectedCallback() {
        console.log('MySimpleComponentがDOMから切り離されました。');
    }

    //要素の属性が変更されたときに呼び出されるライフサイクルコールバック
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(`MySimpleComponentの属性が変更されました: ${name}が${oldValue}から${newValue}に変更されました。`);
    }

    //監視する属性を指定する静的なプロパティ
    static get observedAttributes() {
        return ['name']; // 例: name属性を監視
    }


}




customElements.define('my-simple-component', MySimpleComponent); // カスタム要素を定義