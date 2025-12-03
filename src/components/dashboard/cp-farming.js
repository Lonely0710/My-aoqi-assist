class CpFarming extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.innerHTML = `
            <div class="h-full flex flex-col fade-in p-6">
                
                <!-- Tabs -->
                <div class="flex items-center space-x-8 mb-4 border-b border-slate-200 px-1">
                    <button data-subtab="settings" class="sub-tab active text-sm font-medium text-slate-500">刷关设置</button>
                    <button data-subtab="status" class="sub-tab text-sm font-medium text-slate-500">对局情况</button>
                </div>

                <!-- VIEW 1: Settings -->
                <div id="farming-view-settings" class="fade-in flex h-[calc(100%-40px)] gap-4">
                    <!-- Left Column (Settings & Controls) -->
                    <div class="w-[60%] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                        
                        <!-- Strategy -->
                        <div class="p-4 border-b border-slate-100">
                            <h3 class="text-xs font-bold text-slate-700 mb-3 flex items-center">
                                <i class="ph-fill ph-sliders-horizontal text-sky-500 mr-1.5"></i> 刷关策略
                                <span class="ml-auto text-sky-500 text-[9px]">v3.5</span>
                            </h3>
                            <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] text-slate-600">
                                <label class="flex items-center space-x-1 cursor-pointer"><input type="radio" name="farming-mode" class="text-sky-500 focus:ring-sky-500" checked><span class="truncate">死亡上阵</span></label>
                                <label class="flex items-center space-x-1 cursor-pointer"><input type="radio" name="farming-mode" class="text-sky-500 focus:ring-sky-500"><span class="truncate">单纯胜利停止</span></label>
                                <label class="flex items-center space-x-1 cursor-pointer"><input type="checkbox" class="text-sky-500 rounded focus:ring-sky-500"><span class="truncate">不满足条件重置</span></label>
                                <label class="flex items-center space-x-1 cursor-pointer">
                                    <input type="checkbox" id="toggle-condition" class="text-sky-500 rounded focus:ring-sky-500">
                                    <span class="truncate font-medium text-sky-600">开启条件判断</span>
                                </label>

                                <div class="col-span-2 border-t border-slate-100 my-1"></div>
                                <label class="flex items-center space-x-1 cursor-pointer"><input type="radio" name="heal-mode" class="text-sky-500"><span class="truncate">VIP回血</span></label>
                                <label class="flex items-center space-x-1 cursor-pointer"><input type="radio" name="heal-mode" class="text-sky-500"><span class="truncate">非VIP免费</span></label>
                                <label class="flex items-center space-x-1 cursor-pointer"><input type="radio" name="heal-mode" class="text-sky-500"><span class="truncate">非VIP花钱</span></label>

                                <div class="col-span-2 flex items-center space-x-2 mt-2">
                                    <span class="whitespace-nowrap">刷关次数:</span>
                                    <input type="number" value="500" class="w-16 p-1 border border-slate-200 rounded text-center text-xs">
                                    <span class="whitespace-nowrap ml-2">必过条件:</span>
                                    <input type="text" placeholder="..." class="flex-1 p-1 border border-slate-200 rounded text-xs">
                                </div>
                            </div>
                        </div>

                        <!-- Recording Controls -->
                        <div class="p-4 border-b border-slate-100">
                            <h3 class="text-xs font-bold text-slate-700 mb-3 flex items-center">
                                <i class="ph-fill ph-video-camera text-sky-500 mr-1.5"></i> 录制控制
                            </h3>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                                    <span class="text-[10px] font-bold text-slate-600 w-10">常规</span>
                                    <div class="flex space-x-2">
                                        <button class="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-slate-200 text-sky-500 hover:bg-sky-50 hover:border-sky-200 transition"><i class="ph-fill ph-circle"></i></button>
                                        <button class="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"><i class="ph-fill ph-square"></i></button>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                                    <span class="text-[10px] font-bold text-red-500 w-10">死亡</span>
                                    <div class="flex space-x-2">
                                        <button class="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition"><i class="ph-fill ph-circle"></i></button>
                                        <button class="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"><i class="ph-fill ph-square"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="p-4 mt-auto">
                            <div class="flex space-x-2">
                                <button class="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center justify-center"><i class="ph-bold ph-play mr-1"></i> 开始</button>
                                <button class="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition flex items-center justify-center"><i class="ph-bold ph-pause mr-1"></i> 暂停</button>
                                <button class="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg text-xs font-bold transition flex items-center justify-center"><i class="ph-bold ph-skull mr-1"></i> 送死</button>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column (Condition List) -->
                    <div class="w-[40%] bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                        <div class="flex items-center justify-between mb-3">
                            <h3 class="text-xs font-bold text-slate-700">条件列表</h3>
                            <button class="text-[10px] text-sky-500 hover:underline">清空</button>
                        </div>
                        <div class="flex-1 bg-slate-50 rounded-lg border border-slate-100 p-2 overflow-y-auto custom-scrollbar">
                            <div class="text-[10px] text-slate-400 text-center mt-10">暂无判断条件</div>
                        </div>
                    </div>
                </div>

                <!-- VIEW 2: Status -->
                <div id="farming-view-status" class="hidden fade-in flex h-[calc(100%-40px)] gap-4">
                    <!-- HP Monitor -->
                    <div class="w-1/2 bg-slate-900 rounded-xl shadow-sm p-4 flex flex-col">
                        <div class="text-[10px] font-bold text-slate-500 mb-3 flex justify-between">
                            <span>BATTLE MONITOR</span>
                            <span class="text-green-500">LIVE</span>
                        </div>
                        <div class="flex-1 flex items-center justify-center space-x-8">
                            <div class="text-center">
                                <div class="text-3xl font-mono font-bold text-green-400 mb-1">100%</div>
                                <div class="w-24 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto"><div class="h-full bg-green-500 w-full"></div></div>
                                <div class="text-[10px] text-slate-500 mt-2 font-bold">我方 HP</div>
                            </div>
                            <div class="text-slate-600 font-bold text-xl">VS</div>
                            <div class="text-center">
                                <div class="text-3xl font-mono font-bold text-red-400 mb-1">100%</div>
                                <div class="w-24 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto"><div class="h-full bg-red-500 w-full"></div></div>
                                <div class="text-[10px] text-slate-500 mt-2 font-bold">敌方 HP</div>
                            </div>
                        </div>
                    </div>

                    <!-- Logs -->
                    <div class="w-1/2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div class="bg-slate-50 px-4 py-2 border-b border-slate-200 flex text-[10px] font-bold text-slate-500">
                            <span class="flex-1">系统日志</span>
                            <span>WPE</span>
                        </div>
                        <div class="flex-1 p-3 font-mono text-[10px] text-slate-500 overflow-y-auto custom-scrollbar space-y-1">
                            <div>[12:00:01] 初始化战斗模块...</div>
                            <div>[12:00:02] 加载策略: 死亡上阵</div>
                            <div>[12:00:02] 等待用户操作...</div>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }

    setupListeners() {
        const btns = this.querySelectorAll('.sub-tab');
        const viewSettings = this.querySelector('#farming-view-settings');
        const viewStatus = this.querySelector('#farming-view-status');

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.dataset.subtab;

                btns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                if (target === 'settings') {
                    viewSettings.classList.remove('hidden');
                    viewStatus.classList.add('hidden');
                } else {
                    viewSettings.classList.add('hidden');
                    viewStatus.classList.remove('hidden');
                }
            });
        });
    }
}

customElements.define('cp-farming', CpFarming);
