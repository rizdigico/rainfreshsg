import React, { useEffect, useRef } from 'react';

export const RainEffect: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let drops: RainDrop[] = [];

        // Adjust for high-DPI displays
        const setCanvasSize = () => {
            // Use window innerHeight/Width or fallbacks
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initDrops();
        };

        class RainDrop {
            x: number;
            y: number;
            speed: number;
            length: number;
            opacity: number;
            thickness: number;
            angle: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Varies from 10 to 30 pixels per frame for speed
                this.speed = Math.random() * 20 + 10;
                // Varies from 10 to 40 pixels in length
                this.length = Math.random() * 30 + 10;
                // Very subtle opacity for the "rainfresh" vibe
                this.opacity = Math.random() * 0.2 + 0.05;
                // Thin drops for elegance
                this.thickness = Math.random() * 1.5 + 0.5;
                // Slight wind angle (slanted left to right)
                this.angle = 0.05;
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                // Start above the screen
                this.y = -this.length;
                this.speed = Math.random() * 20 + 10;
                this.length = Math.random() * 30 + 10;
                this.opacity = Math.random() * 0.2 + 0.05;
            }

            fall() {
                this.y += this.speed;
                this.x += this.speed * Math.tan(this.angle);

                // If drop falls below screen, reset it to the top
                if (this.y > canvas!.height) {
                    this.reset();
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                const endX = this.x + this.length * Math.tan(this.angle);
                const endY = this.y + this.length;
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = `rgba(147, 197, 253, ${this.opacity})`; // Soft blue matching brand
                ctx.lineWidth = this.thickness;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }

        const initDrops = () => {
            drops = [];
            // Calculate a density based on screen width so it's not overwhelming on mobile
            // e.g. 150 drops on a 1920px screen, 50 drops on a phone.
            const densityMultiplier = canvas!.width > 768 ? 150 : 50;
            const dropCount = Math.floor((canvas!.width / 1920) * densityMultiplier) || 50;

            for (let i = 0; i < dropCount; i++) {
                drops.push(new RainDrop());
            }
        };

        const render = () => {
            if (!ctx || !canvas) return;
            // Clear the canvas completely each frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw and update each drop
            for (let i = 0; i < drops.length; i++) {
                drops[i].draw();
                drops[i].fall();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Initialize size and start animation
        setCanvasSize();
        render();

        // Handle resize events
        window.addEventListener('resize', setCanvasSize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10 w-full h-full"
            aria-hidden="true"
        />
    );
};
