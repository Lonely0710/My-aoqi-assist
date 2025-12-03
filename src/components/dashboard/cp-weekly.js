class CpWeekly extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="p-6 h-full fade-in flex items-center justify-center">
                <div class="text-center">
                    <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <i class="ph-fill ph-gift text-4xl"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-600">每周活动</h3>
                    <p class="text-sm text-slate-400 mt-2">功能开发中，敬请期待...</p>
                </div>
            </div>
        `;
    }
}

customElements.define('cp-weekly', CpWeekly);
