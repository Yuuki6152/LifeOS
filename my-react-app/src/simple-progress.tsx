export default class SimpleProgress extends HTMLElement {
    private _progress: number = 0;

    // this が壊れないようにアロー関数で保持
    private onProgressInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement | null;
        if (!target) return;

        const n = Number(target.value);
        const next = Number.isFinite(n) ? n : 0;

        this.progress = next;               // setter経由（render + event発火）
        this.setAttribute("progress", String(this._progress)); // 属性にも反映したい場合
    };

    static get observedAttributes(): string[] {
        return ["progress"];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = this.getTemplate();
    }

    // DOMに接続されたとき
    connectedCallback(): void {
        const initialProgress = this.getAttribute("progress");
        const p = initialProgress ? parseInt(initialProgress, 10) : 0;
        this._progress = Number.isFinite(p) ? p : 0;
        this._progress = this.clamp(this._progress);

        this.addEventListeners();
        this.render();

        console.log("simple-progress connected");
    }

    // DOMから切断されたとき
    disconnectedCallback(): void {
        this.removeEventListeners();
        console.log("simple-progress disconnected");
    }

    attributeChangedCallback(
        name: string,
        oldValue: string | null,
        newValue: string | null
    ): void {
        if (oldValue === newValue) return;

        if (name === "progress") {
            const p = newValue ? parseInt(newValue, 10) : 0;
            this._progress = Number.isFinite(p) ? p : 0;
            this._progress = this.clamp(this._progress);
            this.render();
        }
    }

    get progress(): number {
        return this._progress;
    }

    set progress(value: number) {
        const next = this.clamp(value);
        if (this._progress === next) return;

        this._progress = next;
        this.render();

        // カスタムイベントを発行
        this.dispatchEvent(
            new CustomEvent("progress-changed", {
                detail: { progress: this._progress },
                bubbles: true,
                composed: true,
            })
        );
    }

    private addEventListeners(): void {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;

        const progressInput = shadowRoot.querySelector(
            ".progress-text"
        ) as HTMLInputElement | null;

        if (progressInput) {
            progressInput.addEventListener("change", this.onProgressInputChange);
            progressInput.addEventListener("input", this.onProgressInputChange); // リアルタイム更新
        }
    }

    private removeEventListeners(): void {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;

        const progressInput = shadowRoot.querySelector(
            ".progress-text"
        ) as HTMLInputElement | null;

        if (progressInput) {
            progressInput.removeEventListener("change", this.onProgressInputChange);
            progressInput.removeEventListener("input", this.onProgressInputChange);
        }
    }

    private render(): void {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;

        const bar = shadowRoot.querySelector(".bar") as HTMLElement | null;
        const label = shadowRoot.querySelector(".label") as HTMLElement | null;
        const input = shadowRoot.querySelector(".progress-text") as HTMLInputElement | null;

        const pct = this._progress;

        if (bar) bar.style.width = `${pct}%`;
        if (label) label.textContent = `${pct}%`;

        // UI側にも反映（ユーザーが直接入力していないときも同期）
        if (input && input.value !== String(pct)) {
            input.value = String(pct);
        }
    }

    private getTemplate(): string {
        return `
      <style>
        :host { display:block; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
        .wrap { width: 320px; }
        .row { display:flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; }
        .label { font-size: 0.9rem; color:#111; }
        .progress-text { width: 72px; padding: 4px 6px; }
        .track { width: 100%; height: 14px; background: #e9ecef; border-radius: 999px; overflow:hidden; }
        .bar { height: 100%; width: 0%; background: #0d6efd; transition: width 160ms ease; }
        .hint { font-size: 0.8rem; color:#666; margin-top: 6px; }
      </style>

      <div class="wrap">
        <div class="row">
          <div class="label">0%</div>
          <input class="progress-text" type="number" min="0" max="100" step="1" value="0" />
        </div>
        <div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="100">
          <div class="bar"></div>
        </div>
        <div class="hint">0〜100 を入力</div>
      </div>
    `;
    }

    private clamp(v: number): number {
        const n = Number(v);
        if (!Number.isFinite(n)) return 0;
        return Math.max(0, Math.min(100, Math.round(n)));
    }
}

// define（StrictModeや複数回読み込み対策）
if (!customElements.get("simple-progress")) {
    customElements.define("simple-progress", SimpleProgress);
}