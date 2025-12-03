class AppTitleBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        const style = `
            <style>
                @import url('https://unpkg.com/@phosphor-icons/web/src/regular/style.css'); /* Try CSS import if JS fails in shadow */
                
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #fff;
                    border-bottom: 1px solid #e2e8f0;
                    height: 100%;
                    -webkit-app-region: drag;
                    padding: 0 16px;
                    box-sizing: border-box;
                    position: relative;
                    font-family: "Inter", "PingFang SC", sans-serif;
                }
                .left-section {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding-left: 70px; /* Space for traffic lights */
                    width: 140px; 
                }
                .center-section {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                }
                .app-title {
                    font-weight: 700;
                    font-size: 14px;
                    color: #1e293b;
                }
                .app-version {
                    background: #f1f5f9;
                    color: #64748b;
                    font-size: 10px;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                }
                .right-section {
                    -webkit-app-region: no-drag;
                    width: 140px;
                    display: flex;
                    justify-content: flex-end;
                }
                .icon-btn {
                    background: transparent;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #64748b;
                    transition: all 0.2s;
                }
                .icon-btn:hover {
                    background: #f8fafc;
                    color: #0ea5e9;
                    border-color: #cbd5e1;
                }
                i {
                    font-size: 18px;
                }
            </style>
            <!-- Inject Phosphor script into Shadow DOM to ensure it processes icons inside -->
            <script src="https://unpkg.com/@phosphor-icons/web"></script>
        `;

        const html = `
            <div class="left-section">
                <!-- Placeholder for balance -->
            </div>
            <div class="center-section">
                <span class="app-title">奥奇传说</span>
                <span class="app-version" id="version-display">Ver...</span>
            </div>
            <div class="right-section">
                <button id="toggle-panel" class="icon-btn" title="控制面板">
                    <i class="ph ph-gear"></i>
                </button>
            </div>
        `;

        this.shadowRoot.innerHTML = style + html;
    }

    setupListeners() {
        this.shadowRoot.getElementById('toggle-panel').addEventListener('click', () => {
            // Send IPC to main process to toggle the separate window
            if (window.electronAPI && window.electronAPI.toggleControlPanel) {
                window.electronAPI.toggleControlPanel();
            }
        });

        if (window.electronAPI && window.electronAPI.getVersion) {
            window.electronAPI.getVersion().then(ver => {
                this.shadowRoot.getElementById('version-display').textContent = `Ver${ver}`;
            });
        }
    }
}

customElements.define('app-title-bar', AppTitleBar);
