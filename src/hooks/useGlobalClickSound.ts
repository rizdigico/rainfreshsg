import { useEffect } from 'react';

// Free, soft generic pop/click sound
const CLICK_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

export function useGlobalClickSound() {
    useEffect(() => {
        const audio = new Audio(CLICK_SOUND_URL);
        audio.volume = 0.2; // Keep it subtle and aesthetic!

        const handleGlobalClick = (event: MouseEvent) => {
            // We only want to play the click sound if the user is interacting with something
            // like a button, a link, or an element meant to be "clickable"
            const target = event.target as HTMLElement;

            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.hasAttribute('role') && target.getAttribute('role') === 'button';

            if (isClickable) {
                // Reset playback to start so fast clicking doesn't cut out
                audio.currentTime = 0;

                // Play and catch any interaction policy errors gracefully
                audio.play().catch(e => {
                    // Browsers block audio before first user interaction, which is fine!
                    // We just silently fail if the browser blocks it.
                });
            }
        };

        // Use capture phase to ensure it runs before React event handlers potentially stop propagation
        document.addEventListener('click', handleGlobalClick, true);

        return () => {
            document.removeEventListener('click', handleGlobalClick, true);
        };
    }, []);
}
