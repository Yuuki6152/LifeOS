export class SimpleCounter extends HTMLElement {

	private _counter: number = 0;

	//監視する属性を定義
	static get observerAttributes(): string[]{
		return ['initial-counter'];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		//初期HTML構造を設定
		shadowRoot.innerHTML = this.getTemplate();
	}

	//DOMに接続接続されたときに一度だけ呼び出される
	connectedCallback(): void {
		const initialCouter = this.getAttribute('initial-counter');
		this._counter = initialCouter ? parseInt(initialCouter) : 0;
		if (isNaN(this._counter)) {
			this._counter = 0;
		}

		//イベントリスナーの設定
		this.addEventListeners();

		this.render();

		console.log('SimpleCounterがDOMに追加されました');

	}

	//DOMから切断されたときに呼び出される
	disconnectedCallback(): void {
		this.removeEventListeners();
		console.log('SimpleCounterがDOMから削除されました');
	}

	//属性が変更されたときに呼び出される
	attributesChangeCallback(name: string, oldValue: string | null, newValue: string | null): void {
		if (oldValue === newValue) return; //変更がない場合は無視

		if (name === 'initial-couter') {
			const newCounter = newValue ? parseInt(newValue) : 0;
			if (!isNaN(newCounter)) {
				this._counter = newCounter;
				this.render();
			}
		}

	}

	get counter(): number {
		return this._counter;
	}

	set counter(value: number) {
		if (this._counter == value) return; //変更がない場合は無視

		this._counter = value;
		this.render(); //UIを更新

		//カスタムイベントを発火して、外部にカウンターの変更を通知
		this.dispatchEvent(new CustomEvent('counter-changed', {
			detail: { counter: this._counter },
			bubbles: true, //イベントがバブルするように設定
			composed: true //シャドウDOMの外でもイベントが伝播するように設定
		}));

	}

	

	//イベントリスナーの設定
	private addEventListeners(): void {
		const sharowRoot = this.shadowRoot;
		if (!sharowRoot) return;

		//ボタン用を取得し、クリックイベントリスナーを追加
		const incrementButton = sharowRoot.querySelector('.increment-btn') as HTMLButtonElement;
		const decrementButton = sharowRoot.querySelector('.decrement-btn') as HTMLButtonElement;

		if (incrementButton) {
			incrementButton.addEventListener('click', this.increment);
		}

		if (decrementButton) {
			decrementButton.addEventListener('click', this.decrement);
		}

	}

	//削除用のイベントリスナーの設定
	private removeEventListeners(): void {
		const shadowRoot = this.shadowRoot;
		if (!shadowRoot) return;
		const incrementButton = shadowRoot.querySelector('.increment-btn') as HTMLButtonElement;
		const decrementButton = shadowRoot.querySelector('.decrement-btn') as HTMLButtonElement;

		if (incrementButton) {
			incrementButton.removeEventListener('click', this.increment);			
		}
		if (decrementButton) {
			decrementButton.removeEventListener('click', this.decrement);
		}

	}

	//カウンターを増加させるイベントハンドラー
	private increment = (): void => {
		this.counter ++;
	}
	//カウンターを減少させるイベントハンドラー
	private decrement = (): void => {
		this.counter --;
	}



	

	private getTemplate(): string {
		return `
			<style>
                .counter-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #4CAF50;
                    padding: 10px;
                    border-radius: 5px;
                    background-color: #e8f5e9;
                }
                .counter-display {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #2E7D32;
                    min-width: 40px;
                    text-align: center;
                }
                button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1em;
                }
                button:hover {
                    background-color: #45a049;
                }
                button:active {
                    background-color: #388E3C;
                }
            </style>
            <div class="counter-container">
                <button class="decrement-btn">-</button>
                <span class="counter-display">0</span>
                <button class="increment-btn">+</button>
            </div>
		`;
	}

	//レンダリングを行う
	private render(): void {
		const shadowRoot = this.shadowRoot;
		if (!shadowRoot) return;

		const counterDisplay = shadowRoot.querySelector('.counter-display') as HTMLSpanElement;
		if (counterDisplay) {
			counterDisplay.textContent = this._counter.toString();
		}
	}


}

customElements.define('simple-counter', SimpleCounter);