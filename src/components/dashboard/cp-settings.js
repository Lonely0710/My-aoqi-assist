class CpSettings extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.innerHTML = `
            <div class="p-6 h-full fade-in flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                
                <!-- Top Row: Game Control & Battle Settings -->
                <div class="flex gap-4 flex-1 min-h-0">
                    
                    <!-- 1. Game Control (Left) -->
                    <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div class="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center shrink-0">
                            <i class="ph-fill ph-game-controller text-sky-500 mr-2"></i>
                            <span class="text-sm font-bold text-slate-700">游戏控制</span>
                        </div>
                        <div class="p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                            <!-- Refresh & Mute Row -->
                            <div class="grid grid-cols-2 gap-3">
                                <button id="btn-refresh" class="flex items-center justify-center space-x-2 bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-600 border border-slate-200 hover:border-sky-200 rounded-lg py-2.5 transition group">
                                    <i class="ph-bold ph-arrows-clockwise text-lg group-hover:rotate-180 transition-transform duration-500"></i>
                                    <span class="text-xs font-bold">刷新游戏</span>
                                </button>
                                <button id="btn-mute" class="flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg py-2.5 transition">
                                    <i class="ph-bold ph-speaker-high text-lg" id="icon-mute"></i>
                                    <span class="text-xs font-bold" id="text-mute">静音开关</span>
                                </button>
                            </div>

                            <!-- Version Switch -->
                            <div class="bg-slate-50 rounded-lg border border-slate-200 p-3 flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500">
                                        <i class="ph-fill ph-swap text-lg"></i>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-xs font-bold text-slate-700">游戏版本</span>
                                        <span class="text-[10px] text-slate-400" id="version-status">当前: Flash版</span>
                                    </div>
                                </div>
                                <button id="btn-switch-version" class="px-3 py-1.5 bg-white border border-slate-200 hover:border-sky-200 hover:text-sky-500 text-slate-600 text-xs font-bold rounded-lg transition shadow-sm flex items-center space-x-1">
                                    <span>切换版本</span>
                                </button>
                            </div>

                            <!-- Quality -->
                            <div class="bg-slate-50 rounded-lg border border-slate-200 p-2 flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                                    <i class="ph-fill ph-image text-lg"></i>
                                </div>
                                <div class="flex-1 flex bg-white rounded-lg border border-slate-200 p-1 gap-1">
                                    <button class="quality-btn flex-1 py-1.5 rounded text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition flex items-center justify-center space-x-1" data-q="low">
                                        <i class="ph-bold ph-circle"></i> <span>低画质</span>
                                    </button>
                                    <button class="quality-btn flex-1 py-1.5 rounded text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition flex items-center justify-center space-x-1" data-q="medium">
                                        <i class="ph-bold ph-circle-half"></i> <span>中画质</span>
                                    </button>
                                    <button class="quality-btn flex-1 py-1.5 rounded text-xs font-bold text-white bg-sky-500 shadow-sm transition flex items-center justify-center space-x-1" data-q="high">
                                        <i class="ph-fill ph-circle"></i> <span>高画质</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Frame Rate -->
                            <div class="bg-slate-50 rounded-lg border border-slate-200 p-2 flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                                    <i class="ph-fill ph-gauge text-lg"></i>
                                </div>
                                <div class="flex-1 flex bg-white rounded-lg border border-slate-200 p-1 gap-1">
                                    <button class="framerate-btn flex-1 py-1.5 rounded text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition flex items-center justify-center space-x-1" data-f="low">
                                        <i class="ph-bold ph-battery-medium"></i> <span>低帧率</span>
                                    </button>
                                    <button class="framerate-btn flex-1 py-1.5 rounded text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition flex items-center justify-center space-x-1" data-f="medium">
                                        <i class="ph-bold ph-lightning"></i> <span>中帧率</span>
                                    </button>
                                    <button class="framerate-btn flex-1 py-1.5 rounded text-xs font-bold text-white bg-sky-500 shadow-sm transition flex items-center justify-center space-x-1" data-f="high">
                                        <i class="ph-fill ph-lightning"></i> <span>高帧率</span>
                                    </button>
                                </div>
                            </div>

                            <div class="border-t border-slate-100 my-1"></div>

                            <!-- General Settings (Moved from Right) -->
                            <div class="space-y-3">
                                ${this.renderToggle('开机自动启动', true)}
                                ${this.renderToggle('启动后自动最小化')}
                                ${this.renderToggle('关闭主窗口时退出程序', true)}
                                ${this.renderToggle('启用硬件加速 (需重启)', true)}
                            </div>
                        </div>
                    </div>

                    <!-- 2. Battle Settings (Right) -->
                    <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div class="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center shrink-0">
                            <i class="ph-fill ph-sword text-sky-500 mr-2"></i>
                            <span class="text-sm font-bold text-slate-700">战斗设置</span>
                        </div>
                        <div class="p-4 space-y-4 overflow-y-auto custom-scrollbar">
                            ${this.renderToggle('加载战斗画面', true)}
                            ${this.renderToggle('无冷却', false)}
                            
                            <div class="border-t border-slate-100"></div>

                            ${this.renderToggleWithDesc('0秒跳过战斗', '直接结算战斗结果')}
                            ${this.renderToggleWithDesc('自动回血', '战斗结束后自动补满状态')}
                        </div>
                    </div>
                </div>

                <!-- 3. About (Bottom) -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden shrink-0 mt-auto">
                    <div class="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center">
                        <i class="ph-fill ph-info text-sky-500 mr-2"></i>
                        <span class="text-sm font-bold text-slate-700">关于软件</span>
                    </div>
                    <div class="p-4 flex items-center justify-between">
                        <div>
                            <div class="text-sm font-bold text-slate-700">My奥奇传说</div>
                            <div class="text-[10px] text-slate-400">Version 1.0.6 · Electron</div>
                        </div>
                        <button class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded transition">
                            检查更新
                        </button>
                    </div>
                </div>

            </div>
        `;
    }

    renderToggle(label, checked = false) {
        return `
            <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-slate-600">${label}</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" ${checked ? 'checked' : ''}>
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
            </div>
        `;
    }

    renderToggleWithDesc(label, desc, checked = false) {
        return `
            <div class="flex items-center justify-between py-1">
                <div>
                    <div class="text-xs font-bold text-slate-700">${label}</div>
                    <div class="text-[10px] text-slate-400">${desc}</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" ${checked ? 'checked' : ''}>
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
            </div>
        `;
    }

    setupListeners() {
        let ipcRenderer;
        try {
            const electron = require('electron');
            ipcRenderer = electron.ipcRenderer;
        } catch (e) {
            console.error('Failed to load electron:', e);
        }

        // Refresh
        const btnRefresh = this.querySelector('#btn-refresh');
        if (btnRefresh) {
            btnRefresh.addEventListener('click', () => {
                if (ipcRenderer) ipcRenderer.send('control-action', 'refresh');
            });
        }

        // Version Switch
        const btnSwitchVersion = this.querySelector('#btn-switch-version');
        const versionStatus = this.querySelector('#version-status');

        // Initial state
        if (ipcRenderer) {
            ipcRenderer.invoke('get-game-mode').then(isH5 => {
                versionStatus.textContent = isH5 ? "当前: H5版" : "当前: Flash版";
            });
        }

        if (btnSwitchVersion) {
            btnSwitchVersion.addEventListener('click', () => {
                if (ipcRenderer) {
                    ipcRenderer.send('control-action', 'switch-port');
                    // Optimistic update, actual state will be reflected on reload/next check if needed, 
                    // but since page reloads, we might just want to toggle text or wait for reload.
                    // For now, let's just toggle the text to give feedback.
                    const currentText = versionStatus.textContent;
                    versionStatus.textContent = currentText.includes('Flash') ? "当前: H5版" : "当前: Flash版";
                }
            });
        }

        // Mute
        const btnMute = this.querySelector('#btn-mute');
        const iconMute = this.querySelector('#icon-mute');
        const textMute = this.querySelector('#text-mute');
        let isMuted = false;

        if (btnMute) {
            btnMute.addEventListener('click', () => {
                isMuted = !isMuted;
                if (ipcRenderer) ipcRenderer.send('control-action', 'mute');

                if (isMuted) {
                    iconMute.classList.replace('ph-speaker-high', 'ph-speaker-slash');
                    iconMute.classList.add('text-red-500');
                    textMute.textContent = "已静音";
                    btnMute.classList.add('bg-red-50', 'border-red-200');
                } else {
                    iconMute.classList.replace('ph-speaker-slash', 'ph-speaker-high');
                    iconMute.classList.remove('text-red-500');
                    textMute.textContent = "静音开关";
                    btnMute.classList.remove('bg-red-50', 'border-red-200');
                }
            });
        }

        // Quality
        const qualityBtns = this.querySelectorAll('.quality-btn');
        qualityBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const q = target.dataset.q;
                if (ipcRenderer) ipcRenderer.send('control-action', 'quality', q);

                // Update UI
                qualityBtns.forEach(b => {
                    b.className = 'quality-btn flex-1 py-1.5 rounded text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center space-x-1';
                });
                target.className = 'quality-btn flex-1 py-1.5 rounded text-xs font-bold text-white bg-sky-500 shadow-sm transition flex items-center justify-center space-x-1';
            });
        });

        // Frame Rate
        const framerateBtns = this.querySelectorAll('.framerate-btn');
        framerateBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const f = target.dataset.f;
                if (ipcRenderer) ipcRenderer.send('control-action', 'framerate', f);

                // Update UI
                framerateBtns.forEach(b => {
                    b.className = 'framerate-btn flex-1 py-1.5 rounded text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center space-x-1';
                });
                target.className = 'framerate-btn flex-1 py-1.5 rounded text-xs font-bold text-white bg-sky-500 shadow-sm transition flex items-center justify-center space-x-1';
            });
        });
    }
}

customElements.define('cp-settings', CpSettings);
