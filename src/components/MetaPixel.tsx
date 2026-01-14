import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

const MetaPixel = () => {
    const location = useLocation();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the first render because index.html handles the initial PageView
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Track PageView on subsequent route changes
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [location]);

    return null;
};

export default MetaPixel;
