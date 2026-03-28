import { useEffect } from 'react';

/**
 * A lightweight hook to dynamically update document title and meta description.
 * This avoids needing heavy wrappers like react-helmet-async that might break complex
 * framer-motion page transitions.
 */
export function useSEO({ title, description, url }: { title: string; description: string; url?: string; }) {
    useEffect(() => {
        // Update basic document title
        document.title = title;

        // Update standard meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description;
            document.head.appendChild(meta);
        }

        // Update Open Graph tracking for social media (TikTok/Instagram link shares)
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', description);

        if (url) {
            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute('content', `https://rainfreshsg.com${url}`);
        }

    }, [title, description, url]);
}
