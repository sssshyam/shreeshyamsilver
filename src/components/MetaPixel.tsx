import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

const MetaPixel = () => {
    const location = useLocation();

    useEffect(() => {
        // Initialize Meta Pixel
        const initPixel = () => {
            if (window.fbq) return;

            let n: any = (window.fbq = function () {
                n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
            });

            if (!window._fbq) window._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];

            const t = document.createElement('script');
            t.async = true;
            t.src = 'https://connect.facebook.net/en_US/fbevents.js';

            const s = document.getElementsByTagName('script')[0];
            if (s && s.parentNode) {
                s.parentNode.insertBefore(t, s);
            }

            window.fbq('init', '651919006797078');
            window.fbq('track', 'PageView');
        };

        initPixel();
    }, []);

    useEffect(() => {
        // Track PageView on route change
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [location]);

    return null;
};

export default MetaPixel;
