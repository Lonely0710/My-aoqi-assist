class CpRoleInfo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.innerHTML = `
            <div class="flex-1 p-6 overflow-y-auto custom-scrollbar relative h-full">
                
                <!-- Top SubTabs -->
                <div class="flex items-center space-x-8 mb-5 border-b border-slate-200">
                    <button data-subtab="basic" class="sub-tab active text-sm font-medium text-slate-500">基本信息</button>
                    <button data-subtab="resources" class="sub-tab text-sm font-medium text-slate-500">账号资源</button>
                </div>

                <!-- VIEW 1: Basic Info -->
                <div id="view-basic" class="fade-in space-y-4">
                    <!-- Avatar Card -->
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-6 relative overflow-hidden">
                        <div class="absolute right-0 top-0 w-40 h-40 bg-gradient-to-bl from-sky-50 to-transparent rounded-bl-[100px] pointer-events-none"></div>
                        <div class="text-center relative z-10">
                            <div class="w-24 h-24 rounded-full bg-slate-100 p-1 mb-2 mx-auto ring-4 ring-sky-50">
                                <div class="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <i class="ph-fill ph-user-circle text-7xl text-slate-300"></i>
                                </div>
                            </div>
                            <span class="bg-yellow-400 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm">VIP 12</span>
                        </div>
                        <div class="flex-1 grid grid-cols-2 gap-y-4 gap-x-8 pt-2 relative z-10">
                            <div><span class="text-xs text-slate-400">角色名称</span>
                                <div class="text-lg font-bold text-slate-800">开心飞蛾</div>
                            </div>
                            <div><span class="text-xs text-slate-400">战斗力</span>
                                <div class="text-lg font-bold text-slate-800 font-mono">250,420</div>
                            </div>
                            <div><span class="text-xs text-slate-400">金币</span>
                                <div class="text-sm font-bold text-amber-500 font-mono flex items-center"><i class="ph-fill ph-coins mr-1"></i> 8,946,205</div>
                            </div>
                            <div><span class="text-xs text-slate-400">钻石 (充/送)</span>
                                <div class="text-sm font-bold text-sky-500 font-mono flex items-center"><i class="ph-fill ph-diamond mr-1"></i> 0 / 47</div>
                            </div>
                        </div>
                    </div>

                    <!-- Resources Info -->
                    <div class="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
                        <h3 class="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center">
                            <i class="ph-bold ph-list-dashes mr-1.5"></i> 资源及部分信息
                        </h3>
                        <div class="space-y-0">
                            <div class="info-row grid grid-cols-2 gap-4">
                                <div class="flex items-center"><i class="ph-fill ph-scroll text-yellow-500 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">元宝:</span><span class="text-sm font-bold text-slate-700 font-mono">1,153</span></div>
                                <div class="flex items-center"><i class="ph-fill ph-cookie text-amber-600 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">金豆:</span><span class="text-sm font-bold text-slate-700 font-mono">52,000</span></div>
                            </div>
                            <div class="info-row grid grid-cols-2 gap-4">
                                <div class="flex items-center"><i class="ph-fill ph-star text-sky-500 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">聚星石:</span><span class="text-sm font-bold text-sky-600 font-mono">2,675</span></div>
                                <div class="flex items-center space-x-4">
                                    <div class="flex items-center"><i class="ph-fill ph-flask text-sky-400 mr-1 text-base"></i><span class="text-xs text-slate-500 mr-1">精华:</span><span class="text-sm font-bold text-slate-700 font-mono">1,605</span></div>
                                    <div class="flex items-center"><i class="ph-fill ph-sparkle text-indigo-400 mr-1 text-base"></i><span class="text-xs text-slate-500 mr-1">拓星:</span><span class="text-sm font-bold text-slate-700 font-mono">64</span></div>
                                </div>
                            </div>
                            <div class="info-row grid grid-cols-2 gap-4">
                                <div class="flex items-center"><i class="ph-fill ph-ghost text-purple-500 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">元魂:</span><span class="text-sm font-bold text-slate-700 font-mono">2,153</span></div>
                                <div class="flex items-center"><i class="ph-fill ph-puzzle-piece text-purple-400 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">元魂碎片:</span><span class="text-sm font-bold text-slate-700 font-mono">1,129</span></div>
                            </div>
                            <div class="info-row grid grid-cols-2 gap-4">
                                <div class="flex items-center"><i class="ph-fill ph-caret-double-up text-emerald-500 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">突破石:</span><span class="text-sm font-bold text-slate-700 font-mono">1,103</span></div>
                                <div class="flex items-center"><i class="ph-fill ph-lightning text-purple-600 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">潜能果:</span><span class="text-sm font-bold text-purple-600 font-mono">4,068</span></div>
                            </div>
                            <div class="info-row grid grid-cols-2 gap-4">
                                <div class="flex items-center"><i class="ph-fill ph-star text-red-500 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">红色星神碎片:</span><span class="text-sm font-bold text-red-500 font-mono">138</span></div>
                                <div class="flex items-center"><i class="ph-fill ph-star text-yellow-500 mr-2 text-base"></i><span class="text-xs text-slate-500 mr-2">金色星神碎片:</span><span class="text-sm font-bold text-yellow-500 font-mono">1,673</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- VIEW 2: Account Resources -->
                <div id="view-resources" class="hidden fade-in h-full flex flex-col gap-4 pb-2">
                    <div class="flex justify-between items-center -mb-2">
                        <span class="text-[10px] text-slate-400">数据更新时间: 12:00:05</span>
                        <button class="text-[10px] bg-slate-50 border border-slate-200 px-2 py-1 rounded hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition flex items-center">
                            <i class="ph-bold ph-arrows-clockwise mr-1"></i> 刷新数据
                        </button>
                    </div>

                    <!-- Top Row -->
                    <div class="flex-1 grid grid-cols-2 gap-4 min-h-0">
                        <!-- Star Wheel -->
                        <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                            <h3 class="text-xs font-bold text-slate-700 p-3 border-b border-slate-100 bg-white flex items-center shrink-0">
                                <i class="ph-fill ph-star text-sky-500 mr-2"></i> 星轮资源
                            </h3>
                            <div class="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500">
                                <span>星轮</span>
                                <span>数量</span>
                            </div>
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-0">
                                ${this.renderResourceItem('聚星石', '2,675', 'text-sky-600')}
                                ${this.renderResourceItem('聚星结晶', '743')}
                                ${this.renderResourceItem('聚星精华', '1,605')}
                                ${this.renderResourceItem('时空精华', '59')}
                                ${this.renderResourceItem('雷女精华', '59')}
                                ${this.renderResourceItem('小诺精华', '87')}
                                ${this.renderResourceItem('通灵师精华', '104')}
                                ${this.renderResourceItem('次元精华', '133')}
                            </div>
                        </div>

                        <!-- Red Star -->
                        <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                            <h3 class="text-xs font-bold text-slate-700 p-3 border-b border-slate-100 bg-white flex items-center shrink-0">
                                <i class="ph-fill ph-sparkle text-red-500 mr-2"></i> 红星资源
                            </h3>
                            <div class="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500">
                                <span>星神</span>
                                <span>数量</span>
                            </div>
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-0">
                                ${this.renderResourceItem('命中注定', 'Lv.6', 'text-red-500', 'text-red-700')}
                                ${this.renderResourceItem('有如神助', 'Lv.6', 'text-red-500', 'text-red-700')}
                                ${this.renderResourceItem('斗破苍穹', 'Lv.5', 'text-red-500', 'text-red-700')}
                                ${this.renderResourceItem('气吞山河', 'Lv.6', 'text-red-500', 'text-red-700')}
                                ${this.renderResourceItem('神圣命魂', 'Lv.6', 'text-red-500', 'text-red-700')}
                                ${this.renderResourceItem('神圣战魂', 'Lv.6', 'text-red-500', 'text-red-700')}
                                ${this.renderResourceItem('天神霸体', 'Lv.1', 'text-red-500', 'text-red-700')}
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Row -->
                    <div class="flex-1 grid grid-cols-2 gap-4 min-h-0">
                        <!-- Source Beast -->
                        <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                            <h3 class="text-xs font-bold text-slate-700 p-3 border-b border-slate-100 bg-white flex items-center shrink-0">
                                <i class="ph-fill ph-paw-print text-orange-500 mr-2"></i> 源兽资源
                            </h3>
                            <div class="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500">
                                <span>源兽</span>
                                <span>数量</span>
                            </div>
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-0">
                                ${this.renderResourceItem('神·命运神源兽', 'x1', 'text-orange-500')}
                                ${this.renderResourceItem('神·归墟噬神源兽', 'x2', 'text-orange-500')}
                                ${this.renderResourceItem('神·卡雅源兽', 'x5', 'text-orange-500')}
                                ${this.renderResourceItem('神·昆仑源兽', 'x1', 'text-orange-500')}
                                ${this.renderResourceItem('神·圣光源兽', 'x3', 'text-orange-500')}
                                ${this.renderResourceItem('杀破狼源兽', 'x10', 'text-orange-500')}
                            </div>
                        </div>

                        <!-- Soul -->
                        <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                            <h3 class="text-xs font-bold text-slate-700 p-3 border-b border-slate-100 bg-white flex items-center shrink-0">
                                <i class="ph-fill ph-ghost text-purple-500 mr-2"></i> 元魂资源
                            </h3>
                            <div class="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500">
                                <span>元魂</span>
                                <span>数量</span>
                            </div>
                            <div class="flex-1 overflow-y-auto custom-scrollbar p-0">
                                ${this.renderResourceItem('卡雅元魂', 'x12', 'text-purple-600')}
                                ${this.renderResourceItem('命运神元魂', 'x3', 'text-purple-600')}
                                ${this.renderResourceItem('归墟噬神元魂', 'x1', 'text-purple-600')}
                                ${this.renderResourceItem('修尔元魂', 'x5', 'text-purple-600')}
                                ${this.renderResourceItem('阿瑞斯元魂', 'x2', 'text-purple-600')}
                                ${this.renderResourceItem('潘多拉元魂', 'x1', 'text-purple-600')}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }

    renderResourceItem(name, value, valClass = '', nameClass = 'text-slate-600') {
        return `
            <div class="res-list-item hover:bg-slate-50">
                <span class="res-name ${nameClass}">${name}</span>
                <span class="res-val ${valClass}">${value}</span>
            </div>
        `;
    }

    setupListeners() {
        const btns = this.querySelectorAll('.sub-tab');
        const viewBasic = this.querySelector('#view-basic');
        const viewResources = this.querySelector('#view-resources');

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target.dataset.subtab;

                // Update tabs
                btns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Update views
                if (target === 'basic') {
                    viewBasic.classList.remove('hidden');
                    viewResources.classList.add('hidden');
                } else {
                    viewBasic.classList.add('hidden');
                    viewResources.classList.remove('hidden');
                }
            });
        });
    }
}

customElements.define('cp-role-info', CpRoleInfo);
