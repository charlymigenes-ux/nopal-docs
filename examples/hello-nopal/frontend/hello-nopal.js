(() => {
    const PLUGIN_ID = 'hello-nopal';
    if (window.NopalPluginRegistry?.[PLUGIN_ID]) return;

    const I18N = {
        es: { nav: 'Hola NOPAL', title: 'Hola NOPAL', button: 'Saludar', error: 'No se pudo obtener el saludo' },
        en: { nav: 'Hello NOPAL', title: 'Hello NOPAL', button: 'Say hello', error: 'Could not get the greeting' },
    };

    function lang() {
        const value = String(document.documentElement.lang || localStorage.getItem('language') || 'es').toLowerCase();
        return I18N[value] ? value : 'en';
    }

    function tr(key) {
        return I18N[lang()][key];
    }

    function mount() {
        if (document.getElementById('hello-nopal-section')) return;

        const navContainer = document.querySelector('.nav-category[data-group="plugins"] .nav-category-items');
        const navButton = document.createElement('button');
        navButton.type = 'button';
        navButton.className = 'nav-item';
        navButton.dataset.section = PLUGIN_ID;
        navButton.dataset.pluginNav = PLUGIN_ID;
        navButton.innerHTML = `<span>${tr('nav')}</span>`;
        navButton.addEventListener('click', () => window.switchSection?.(PLUGIN_ID));
        navContainer?.appendChild(navButton);

        const section = document.createElement('section');
        section.id = 'hello-nopal-section';
        section.className = 'content-section hn-section';
        section.innerHTML = `
            <h1>${tr('title')}</h1>
            <button type="button" class="hn-button">${tr('button')}</button>
            <p class="hn-output" aria-live="polite"></p>`;
        section.querySelector('.hn-button').addEventListener('click', saludar);
        document.querySelector('.content')?.appendChild(section);

        window.applySidebarOrder?.();
    }

    async function saludar() {
        const output = document.querySelector('#hello-nopal-section .hn-output');
        try {
            const response = await fetch('/api/hello-nopal/saludo');
            if (!response.ok) throw new Error(String(response.status));
            const data = await response.json();
            output.textContent = `${data.mensaje}, ${data.usuario} (${data.rol})`;
        } catch (error) {
            window.showToast?.(tr('error'), 'error');
        }
    }

    function unmount() {
        document.querySelector(`[data-plugin-nav="${PLUGIN_ID}"]`)?.remove();
        document.getElementById('hello-nopal-section')?.remove();
    }

    window.NopalPluginRegistry = window.NopalPluginRegistry || {};
    window.NopalPluginRegistry[PLUGIN_ID] = { mount, unmount, version: '0.1.0' };
    mount();
})();
