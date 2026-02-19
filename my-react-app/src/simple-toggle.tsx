export class SimpleToggle extends HTMLElement {

	private _istoggled: boolean = false;

	static get observedAttributes(): string[] {
		return ['istoggled'];
	}

	constructor() {
		super();
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = this.getTemplate();
	}


	//DOMに接続されたときに一度だけ呼び出される
	connectedCallback(): void {
		const initialToggled = this.getAttribute('istoggled');
		this._istoggled = initialToggled === 'true';
		this.addEventListeners();
		this.render();		

		console.log('SimpleToggleがDOMに追加されました。');
	}

	//DOMから切断されたときに呼び出される
	disconnectedCallback(): void {
		this.removeEventListeners();
		console.log('SimpleToggleがDOMから削除されました。');
	}

	//属性が変更されたときに呼び出される
	attributesChangeCallback(name: string, oldValue: string | null, newValue: string | null): void {
		if (oldValue === newValue) return; //変更がない場合は無視

		if (name === 'istoggled') {
			this._istoggled = newValue === 'true';
			this.render();
		}
	}

	get istoggled(): boolean {
		return this._istoggled;
	}

	set istoggled(value: boolean) {
		if (this._istoggled === value) return; //変更がない場合は無視
		this._istoggled = value;
		this.setAttribute('istoggled', value.toString());

		//カスタムイベントを発火して、属性の変更を通知
		this.dispatchEvent(new CustomEvent('toggled', {
			detail: { istoggled: this._istoggled },
			bubbles: true,
			composed: true
		}));

		this.render();

	}

	private addEventListeners(): void {
		const shadowRoot = this.shadowRoot;
		if (!shadowRoot) return;

		const toggleButton = shadowRoot.querySelector('.toggle-button') as HTMLElement;
		if (toggleButton) {
			toggleButton.addEventListener('click', this.toggle);
		}

	}

	private removeEventListeners(): void {
		const shadowRoot = this.shadowRoot;
		if (!shadowRoot) return;

		const toggleButton = shadowRoot.querySelector('.toggle-button') as HTMLElement;
		if (toggleButton) {
			toggleButton.removeEventListener('click', this.toggle);
		}

	}

	private toggle = (): void => {
		this.istoggled = !this._istoggled;
	}


	private getTemplate(): string {
		return `
			<style>
			.toggle-container {
				display: inline-flex;
				align-items: center;
				padding: 5px 10px;
				border: 1px solid #ccc;
				border-radius: 20px;
				background-color: #f0f0f0;
				cursor: pointer;
				}
			.toggle-button {
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background-color: #4CAF50;
				margin-right: 10px;
				transition: transform 0.3s ease;
				}
			.toggle-button:active {
				transform: scale(0.9);
				}
			</style>
			<div class="toggle-container">
				<button class="toggle-button"></button>
				<span>${this._istoggled ? 'ON' : 'OFF'}</span>
			</div>
		`;
	}

	private render(): void {
		const shadowRoot = this.shadowRoot;
		if (!shadowRoot) return;

		const statusText = shadowRoot.querySelector('span') as HTMLElement;
		if (statusText) {
			statusText.textContent = this._istoggled ? 'ON' : 'OFF';
		}

	}

}

customElements.define('simple-toggle', SimpleToggle);