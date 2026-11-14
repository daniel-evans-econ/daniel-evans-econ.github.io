/*!
* Start Bootstrap - Scrolling Nav v5.0.5 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && window.bootstrap) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Research topics are additive: selected topics must all match an entry.
window.addEventListener('DOMContentLoaded', () => {
    const filters = document.getElementById('research-filters');
    if (!filters) return;
    const entries = Array.from(document.querySelectorAll('.research-entry'));
    const sections = ['JobMarketPaper', 'Papers', 'WorksInProgress'].map(id => document.getElementById(id));
    const buttons = Array.from(document.querySelectorAll('button[data-topic]'));
    const selected = new Set();
    const status = document.getElementById('filter-status');
    const clear = filters.querySelector('[data-clear-topics]');
    const update = () => {
        let visible = 0;
        entries.forEach(entry => {
            const topics = entry.dataset.topics.split(' ');
            entry.hidden = !Array.from(selected).every(topic => topics.includes(topic));
            if (!entry.hidden) visible++;
        });
        sections.forEach(section => {
            section.hidden = !section.querySelector('.research-entry:not([hidden])');
        });
        buttons.forEach(button => button.setAttribute('aria-pressed', String(selected.has(button.dataset.topic))));
        clear.setAttribute('aria-pressed', String(selected.size === 0));
        const labels = Array.from(selected).map(topic => filters.querySelector('[data-topic="' + topic + '"]').textContent);
        status.textContent = selected.size ? visible + ' of ' + entries.length + ' papers and projects · ' + labels.join(' + ') : '';
        document.getElementById('filter-empty').hidden = visible !== 0;
    };
    buttons.forEach(button => button.addEventListener('click', () => {
        const topic = button.dataset.topic;
        selected.has(topic) ? selected.delete(topic) : selected.add(topic);
        update();
        if (!filters.contains(button)) {
            filters.scrollIntoView({block: 'start'});
            filters.querySelector('[data-topic="' + topic + '"]').focus({preventScroll: true});
        }
    }));
    clear.addEventListener('click', () => { selected.clear(); update(); });
    // Section navigation always reveals the requested section.
    document.querySelectorAll('#mainNav a[href="#Papers"], #mainNav a[href="#WorksInProgress"]').forEach(link => {
        link.addEventListener('click', () => { selected.clear(); update(); });
    });
    filters.hidden = false;
    update();
});
