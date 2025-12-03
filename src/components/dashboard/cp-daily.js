class CpDaily extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="p-6 h-full fade-in">
                <div class="flex h-full gap-4">
                    <!-- Left: Common Tasks -->
                    <div class="w-1/2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                        <div class="p-3 border-b border-slate-100 bg-slate-50 rounded-t-xl flex justify-between items-center">
                            <h3 class="text-sm font-bold text-slate-700">通用日常 (全民版本)</h3>
                            <button class="text-[10px] text-sky-600 font-bold hover:underline">全选</button>
                        </div>
                        <div class="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-1">
                            ${this.renderTask('领取钻石任务箱子', true)}
                            ${this.renderTask('领取红钻', true)}
                            ${this.renderTask('联盟签到 & 领钱')}
                            ${this.renderTask('农场收菜 & 偷菜')}
                            ${this.renderTask('勇者之塔')}
                            ${this.renderTask('竞技场挑战')}
                            ${this.renderTask('家族捐献')}
                            ${this.renderTask('挖矿任务')}
                        </div>
                    </div>

                    <!-- Right: Advanced & Exchange -->
                    <div class="w-1/2 flex flex-col gap-4">
                        <!-- VIP Tasks -->
                        <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                            <div class="p-3 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                                <h3 class="text-sm font-bold text-slate-700">高级会员区</h3>
                            </div>
                            <div class="p-3 space-y-1">
                                ${this.renderTask('源兽之门', false, 'text-purple-500', 'focus:ring-purple-400')}
                                ${this.renderTask('星轮探险', false, 'text-purple-500', 'focus:ring-purple-400')}
                            </div>
                        </div>

                        <!-- Exchange -->
                        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                            <h3 class="text-xs font-bold text-sky-600 mb-2 pb-1 border-b border-slate-100">每日传说石自动兑换</h3>
                            <div class="grid grid-cols-2 gap-2 mb-2">
                                <div>
                                    <label class="text-[10px] text-slate-400 block">换掉的石头</label>
                                    <select class="w-full text-xs p-1 bg-slate-50 border border-slate-200 rounded text-slate-600">
                                        <option>物攻传说</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-[10px] text-slate-400 block">需要的石头</label>
                                    <select class="w-full text-xs p-1 bg-slate-50 border border-slate-200 rounded text-slate-600">
                                        <option>暴击传说</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <span class="text-[10px] text-slate-500 mr-1">次数:</span>
                                    <input type="number" value="5" class="w-10 text-xs p-1 border border-slate-200 rounded text-center">
                                </div>
                                <button class="bg-sky-500 hover:bg-sky-600 text-white text-[10px] px-3 py-1.5 rounded font-bold transition">开始兑换</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTask(name, checked = false, colorClass = 'text-sky-500', ringClass = 'focus:ring-sky-400') {
        return `
            <label class="flex items-center p-2 rounded hover:bg-slate-50 cursor-pointer group transition">
                <input type="checkbox" class="form-checkbox h-4 w-4 ${colorClass} rounded border-slate-300 ${ringClass}" ${checked ? 'checked' : ''}>
                <div class="ml-3">
                    <div class="text-xs font-bold text-slate-700 group-hover:text-sky-600">${name}</div>
                </div>
            </label>
        `;
    }
}

customElements.define('cp-daily', CpDaily);
