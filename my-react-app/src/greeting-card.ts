export class GreetingCard extends HTMLElement {
    //プロパティの定義
    private _name: string = 'ゲスト';
    private _message: string = 'こんにちは';

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        //初期コンテンツを設定
        shadowRoot.innerHTML = this.getTemplate();
    }

    //監視する属性を定義
    static get observedAttributes(): string[] {
        return ['name', 'message'];
    }

    //属性が変更された時に呼び出される
    attributeChangeCallback(name: string, oldValue: string | null, newValue: string | null): void {
        if (oldValue === newValue) return; //変更がない場合は無視

        switch (name) {
            case 'name':
                this._name = newValue || 'ゲスト';
                break;
                this._message = newValue || 'こんにちは';
            case 'message':
                break;
        }
        //属性変更後にコンポーネントを再レンダリング
        this.render();
    }

    set name(value: string) {
        if (this._name !== value) return; //変更がない場合は無視
        this._name = value;
        this.setAttribute('name', value); //属性を更新
        this.render(); //コンポーネントを再レンダリング
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) return; //変更がない場合は無視
        this._message = value;
        this.setAttribute('message', value); //属性を更新
        this.render(); //コンポーネントを再レンダリング
    }

    connectedCallback(): void {
        //初期レンダリングはDOM接続時にレンダリング
        this.render();
        console.log('GreetingCardがDOMに接続されました。');
    }

    private getTemplate(): string {
        return `
            <style>
                .card {
                    border: 1px solid #ddd;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 8px;
                    background-color: #f0f8ff;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .card h3 {
                    color: #2c3e50;
                    margin-top: 0;
                }
                .card p {
                    color: #34495e;
                    line-height: 1.6;
                }
            </style>
            <div class="card">
                <h3></h3>
                <p></p>
            </div>
        `;
    }

    private render(): void {
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            //Shadow DOM内部の要素を取得し、内容を更新
            const h3 = shadowRoot.querySelector('h3');
            const p = shadowRoot.querySelector('p');

            if (h3) {
                h3.textContent = `こんにちは、${this._name}さん！`;
            }
            if (p) {
                p.textContent = `これは${this._name}さんへのメッセージです。`;
            }
        }

    }
}

customElements.define('greeting-card', GreetingCard);