import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO() {
    const location = useLocation();

    useEffect(() => {
        // Base canonical URL
        const baseUrl = 'https://www.shreeshyamsilver.com';
        const canonicalUrl = `${baseUrl}${location.pathname}`;

        // Update Canonical Tag
        let linkRelCanonical = document.querySelector("link[rel='canonical']");
        if (!linkRelCanonical) {
            linkRelCanonical = document.createElement('link');
            linkRelCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkRelCanonical);
        }
        linkRelCanonical.setAttribute('href', canonicalUrl);

        // Basic Auto-Title (Fallback)
        // More specific titles are handled in individual pages usually, but this is a good safety net
        const path = location.pathname;
        let title = 'Shree Shyam Silver | Premium Silver & Resin Decor in Nokha';

        if (path.includes('/shop')) title = 'Shop Exclusive Silver Collections | Shree Shyam Silver';
        if (path.includes('/about')) title = 'About Us - 26 Years of Excellence | Shree Shyam Silver';
        if (path.includes('/contact')) title = 'Contact Us | Shree Shyam Silver Nokha';
        if (path.includes('/blog')) title = 'Silver Insights & Tips | Shree Shyam Silver Blog';

        document.title = title;

    }, [location]);

    return null; // Logic only component
}
