class CpStory extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="p-6 h-full fade-in flex gap-4">
                
                <!-- Left: List Area -->
                <div class="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div class="p-4 border-b border-slate-100">
                        <h3 class="text-sm font-bold text-slate-700 flex items-center">
                            <i class="ph-fill ph-book-bookmark text-sky-500 mr-2"></i> 剧情列表区
                        </h3>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-slate-50 text-slate-500 font-medium text-xs uppercase">
                                <tr>
                                    <th class="px-4 py-2 w-16 text-center">ID</th>
                                    <th class="px-4 py-2">剧情名称</th>
                                    <th class="px-4 py-2 text-right">状态</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr class="hover:bg-slate-50">
                                    <td class="px-4 py-3 text-center font-mono text-slate-400">0</td>
                                    <td class="px-4 py-3 text-slate-700 font-medium">新手任务 (前)</td>
                                    <td class="px-4 py-3 text-right text-green-500 font-bold text-xs">已完成</td>
                                </tr>
                                <tr class="hover:bg-slate-50 bg-sky-50/30">
                                    <td class="px-4 py-3 text-center font-mono text-sky-600 font-bold">2</td>
                                    <td class="px-4 py-3 text-sky-700 font-bold">乔乔的宝藏 (上)</td>
                                    <td class="px-4 py-3 text-right text-slate-400 text-xs">未开始</td>
                                </tr>
                                <!-- More rows... -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Right: One-click Area -->
                <div class="w-64 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                    <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center">
                        <i class="ph-fill ph-paper-plane-tilt text-sky-500 mr-2"></i> 剧情一键区
                    </h3>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">起始剧情 ID</label>
                            <input type="number" value="2" class="w-full p-2 border border-slate-200 rounded-lg text-lg font-mono font-bold text-slate-700 focus:border-sky-500 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1">结束剧情 ID</label>
                            <input type="number" value="1043" class="w-full p-2 border border-slate-200 rounded-lg text-lg font-mono font-bold text-slate-700 focus:border-sky-500 outline-none">
                        </div>
                    </div>

                    <div class="mt-auto grid grid-cols-2 gap-3">
                        <button class="py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-bold shadow-sm shadow-sky-200 transition">快捷发送</button>
                        <button class="py-2 bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 rounded-lg font-bold transition">停止发送</button>
                    </div>
                </div>

            </div>
        `;
    }
}

customElements.define('cp-story', CpStory);
