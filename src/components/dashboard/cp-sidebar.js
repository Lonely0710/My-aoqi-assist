class CpSidebar extends HTMLElement {
    constructor() {
        super();
        // Light DOM
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.innerHTML = `
            <div class="flex flex-col w-48 bg-white border-r border-slate-200 h-full select-none">
                <!-- Logo -->
                <div class="h-16 flex items-center px-5 border-b border-slate-200 bg-white drag-region">
                    <div class="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-sky-200 text-white transform rotate-3">
                        <i class="ph-fill ph-game-controller text-xl"></i>
                    </div>
                    <div>
                        <span class="font-black text-slate-800 text-lg tracking-tight block leading-none mb-1">奥奇辅助</span>
                        <span class="text-[10px] text-sky-500 font-bold tracking-widest bg-sky-50 px-1 py-0.5 rounded">AOQI PRO</span>
                    </div>
                </div>

                <!-- Nav -->
                <nav class="flex-1 py-4 space-y-1 overflow-y-auto custom-scrollbar px-3">
                    
                    <!-- Group: General Info -->
                    <div class="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">综合信息</div>
                    
                    <button data-tab="role" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition-colors relative active">
                        <i class="ph ph-user-circle text-lg mr-3"></i>
                        <span>角色信息</span>
                    </button>

                    <button data-tab="notices" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-400 rounded-lg hover:bg-slate-50 transition-colors relative">
                        <i class="ph ph-newspaper text-lg mr-3"></i>
                        <span>更新公告</span>
                    </button>

                    <div class="my-2 border-t border-slate-200 mx-3"></div>

                    <!-- Group: AFK Features -->
                    <div class="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">挂机功能</div>
                    
                    <button data-tab="daily" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-400 rounded-lg hover:bg-slate-50 transition-colors relative">
                        <i class="ph ph-check-circle text-lg mr-3"></i>
                        <span>一键日常</span>
                    </button>

                    <button data-tab="farming" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-400 rounded-lg hover:bg-slate-50 transition-colors relative">
                        <i class="ph ph-sword text-lg mr-3"></i>
                        <span>自动刷关</span>
                    </button>

                    <button data-tab="story" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-400 rounded-lg hover:bg-slate-50 transition-colors relative">
                        <i class="ph ph-map-trifold text-lg mr-3"></i>
                        <span>剧情地图</span>
                        <span class="ml-auto bg-slate-200 text-slate-600 text-[9px] px-1 rounded">NEW</span>
                    </button>

                    <button data-tab="weekly" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-400 rounded-lg hover:bg-slate-50 transition-colors relative">
                        <i class="ph ph-gift text-lg mr-3"></i>
                        <span>每周活动</span>
                    </button>

                    <div class="my-2 border-t border-slate-200 mx-3"></div>

                    <!-- Group: Advanced Tools -->
                    <div class="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">高级工具</div>
                    
                    <button data-tab="settings" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-400 rounded-lg hover:bg-slate-50 transition-colors relative">
                        <i class="ph ph-sliders text-lg mr-3"></i>
                        <span>辅助设置</span>
                    </button>

                    <button data-tab="wpe" class="nav-item group flex items-center w-full px-3 py-2.5 text-sm text-slate-400 rounded-lg hover:bg-slate-50 transition-colors relative">
                        <i class="ph ph-code text-lg mr-3"></i>
                        <span>WPE封包</span>
                    </button>
                    
                </nav>
                
                <!-- Footer User Info -->
                <div class="p-3 m-2 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <i class="ph-fill ph-user-gear"></i>
                            </div>
                            <div>
                                <div class="text-[10px] text-slate-400">多多号</div>
                                <div class="text-xs font-bold text-slate-700 font-mono">182317208</div>
                            </div>
                        </div>
                        <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="已连接"></div>
                    </div>
                    <div class="pt-2 border-t border-slate-100 flex items-center text-[10px] text-slate-500">
                        <i class="ph-fill ph-globe-hemisphere-east mr-1 text-sky-400"></i>
                        <span class="truncate">服务器：1061 美食大陆</span>
                    </div>
                </div>
            </div>
        `;

        // Default to role info
        this.updateActiveState('role');
    }

    setupListeners() {
        const buttons = this.querySelectorAll('.nav-item');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Use currentTarget to ensure we get the button, not the icon
                const tab = e.currentTarget.dataset.tab;
                console.log('Sidebar clicked:', tab);

                this.updateActiveState(tab);

                this.dispatchEvent(new CustomEvent('tab-change', {
                    detail: { tab },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    updateActiveState(activeTab) {
        const buttons = this.querySelectorAll('.nav-item');
        buttons.forEach(btn => {
            const isTarget = btn.dataset.tab === activeTab;

            // Reset classes first
            btn.className = 'nav-item group flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors relative';

            if (isTarget) {
                // Active: bg-sky-50 text-sky-600 font-bold
                btn.classList.add('active', 'bg-sky-50', 'text-sky-600', 'font-bold');
            } else {
                // Inactive: text-slate-600 hover:bg-slate-50
                btn.classList.add('text-slate-600', 'hover:bg-slate-50');
            }
        });
    }
}

customElements.define('cp-sidebar', CpSidebar);
