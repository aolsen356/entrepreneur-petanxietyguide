/**
 * Exit-Intent Popup - Pet Anxiety Guide
 * Captures visitors about to leave with helpful pet anxiety resources
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'pag_exit_shown';
    const COOLDOWN_HOURS = 24;

    function wasRecentlyShown() {
        const lastShown = localStorage.getItem(STORAGE_KEY);
        if (!lastShown) return false;
        const hoursSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60);
        return hoursSince < COOLDOWN_HOURS;
    }

    function markAsShown() {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }

    function createPopup() {
        const overlay = document.createElement('div');
        overlay.id = 'exit-intent-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const popup = document.createElement('div');
        popup.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 32px;
            max-width: 480px;
            width: 90%;
            text-align: center;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        `;

        popup.innerHTML = `
            <button id="exit-popup-close" style="
                position: absolute;
                top: 12px;
                right: 12px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #9CA3AF;
                padding: 4px;
            ">&times;</button>
            <div style="
                width: 64px;
                height: 64px;
                background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            ">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
            </div>
            <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 12px; color: #111827;">
                Wait! Your Pet Needs You
            </h3>
            <p style="color: #6B7280; margin-bottom: 24px; line-height: 1.6;">
                Don't leave without taking our free anxiety assessment. Get personalized recommendations to help your furry friend feel calmer.
            </p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="/dog-anxiety-calculator.html" style="
                    display: block;
                    background: #6366F1;
                    color: white;
                    padding: 14px 24px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#4F46E5'" onmouseout="this.style.background='#6366F1'">
                    Take Dog Anxiety Quiz
                </a>
                <a href="/cat-anxiety-calculator.html" style="
                    display: block;
                    background: #F3F4F6;
                    color: #374151;
                    padding: 14px 24px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#E5E7EB'" onmouseout="this.style.background='#F3F4F6'">
                    Take Cat Anxiety Quiz
                </a>
            </div>
            <p style="font-size: 12px; color: #9CA3AF; margin-top: 16px;">
                Free 2-minute assessment with personalized tips
            </p>
        `;

        const container = document.createElement('div');
        container.style.position = 'relative';
        container.appendChild(popup);
        overlay.appendChild(container);

        return overlay;
    }

    function showPopup() {
        if (wasRecentlyShown()) return;
        if (document.getElementById('exit-intent-overlay')) return;

        const overlay = createPopup();
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            overlay.querySelector('div > div').style.transform = 'translateY(0)';
        });

        markAsShown();

        const closePopup = () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        };

        overlay.querySelector('#exit-popup-close').addEventListener('click', closePopup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePopup();
        });

        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', handler);
            }
        });
    }

    function init() {
        if (window.innerWidth < 768) return;

        let triggered = false;

        document.addEventListener('mouseout', (e) => {
            if (triggered) return;
            if (e.clientY < 0 && e.relatedTarget === null) {
                triggered = true;
                showPopup();
            }
        });

        let lastScrollTop = 0;
        let rapidScrollCount = 0;

        window.addEventListener('scroll', () => {
            const st = window.pageYOffset;
            if (st < lastScrollTop && lastScrollTop - st > 100) {
                rapidScrollCount++;
                if (rapidScrollCount > 2 && !triggered) {
                    triggered = true;
                    showPopup();
                }
            } else {
                rapidScrollCount = 0;
            }
            lastScrollTop = st;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
