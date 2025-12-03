class CpNotices extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="p-6 h-full flex flex-col gap-4 fade-in">
                <!-- Updates List -->
                <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col h-[70%]">
                    <h3 class="text-sm font-bold text-slate-700 mb-3 flex items-center">
                        <i class="ph-fill ph-lightning text-yellow-500 mr-2"></i> 更新快讯
                    </h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                        <div class="bg-sky-50 border-l-4 border-sky-400 p-3 rounded-r">
                            <div class="flex justify-between text-[10px] text-sky-600 mb-1">
                                <span class="font-bold">v3.2.1 重要更新</span>
                                <span>2023-10-27</span>
                            </div>
                            <p class="text-xs text-slate-700 leading-relaxed">1. 修复了自动刷关偶发卡顿的问题，优化了农场偷菜逻辑。<br>2. 新增BOSS[圣光·帝释天]的挑战脚本。<br>3. 优化了内存占用，减少闪退频率。</p>
                        </div>
                        <div class="bg-slate-50 border-l-4 border-slate-300 p-3 rounded-r">
                            <div class="flex justify-between text-[10px] text-slate-500 mb-1">
                                <span class="font-bold">日常维护</span>
                                <span>2023-10-25</span>
                            </div>
                            <p class="text-xs text-slate-600">服务器例行维护结束，辅助工具已适配最新游戏版本协议。</p>
                        </div>
                    </div>
                </div>

                <!-- System Log -->
                <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-inner flex flex-col h-[30%]">
                    <div class="flex justify-between items-center border-b border-slate-700 pb-2 mb-2">
                        <span class="text-xs text-slate-400 font-mono">SYSTEM LOG</span>
                        <span class="text-[10px] text-green-500 flex items-center"><span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>Connected</span>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar font-mono text-[11px] space-y-1">
                        <p class="text-slate-500">[12:00:00] <span class="text-sky-400">INFO</span> Initialization complete.</p>
                        <p class="text-slate-500">[12:00:05] <span class="text-sky-400">INFO</span> Loaded user config.</p>
                        <p class="text-green-500 animate-pulse">_</p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('cp-notices', CpNotices);
