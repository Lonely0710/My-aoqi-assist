class AppGameView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const style = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    background: #000;
                }
                webview {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        `;

        // The URL will be set by main process or default
        const html = `
            <webview id="game-webview" src="https://aoqi.100bt.com/play/play.html" plugins></webview>
        `;

        this.shadowRoot.innerHTML = style + html;
    }
}

customElements.define('app-game-view', AppGameView);
