import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ScentEffectsProps {
    activeScent: string | null;
    collectionSlug?: string;
}

// Common helper to get random values
const random = (min: number, max: number) => Math.random() * (max - min) + min;

const IonEscapeEffect = () => {
    // amber dust motes
    const [motes, setMotes] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number }[]>([]);

    useEffect(() => {
        const newMotes = Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            x: random(0, 100),
            y: random(0, 100),
            size: random(3, 8),
            duration: random(10, 20),
            delay: random(0, 5),
        }));
        setMotes(newMotes);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-90 mix-blend-multiply pointer-events-none">
            {motes.map(mote => (
                <motion.div
                    key={mote.id}
                    className="absolute rounded-full bg-amber-500/70 blur-[1px]"
                    style={{
                        width: mote.size,
                        height: mote.size,
                        left: `${mote.x}%`,
                        top: `${mote.y}%`,
                        boxShadow: '0 0 15px 4px rgba(245, 158, 11, 0.5)'
                    }}
                    animate={{
                        y: ["-5vh", "-40vh"],
                        x: [`${mote.x}%`, `${mote.x + random(-15, 15)}%`],
                        opacity: [0, 0.9, 0],
                        scale: [0.8, 1.3, 0.8]
                    }}
                    transition={{
                        duration: mote.duration,
                        repeat: Infinity,
                        delay: mote.delay,
                        ease: "linear"
                    }}
                />
            ))}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            />
        </div>
    );
};

const DropDeadGorgeousEffect = () => {
    // sensual pink mist
    return (
        <div className="absolute inset-0 overflow-hidden mix-blend-multiply opacity-80 pointer-events-none">
            <motion.div
                className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-pink-400/40 blur-[90px]"
                animate={{ x: [0, 150, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-rose-400/30 blur-[100px]"
                animate={{ x: [0, -120, 0], y: [0, 80, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
        </div>
    );
};

const EnchantmentSpellEffect = () => {
    // champagne bubbles
    const [bubbles, setBubbles] = useState<{ id: number, left: number, size: number, duration: number, delay: number }[]>([]);

    useEffect(() => {
        const newBubbles = Array.from({ length: 70 }).map((_, i) => ({
            id: i,
            left: random(5, 95),
            size: random(3, 14),
            duration: random(3, 8),
            delay: random(0, 5),
        }));
        setBubbles(newBubbles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-90 pointer-events-none">
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent mix-blend-multiply"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            />
            {bubbles.map(bubble => (
                <motion.div
                    key={bubble.id}
                    className="absolute bottom-0 rounded-full border border-red-500/60 bg-red-400/40"
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: `${bubble.left}%`,
                        boxShadow: '0 0 8px 1px rgba(239, 68, 68, 0.4)'
                    }}
                    animate={{
                        y: ["10vh", "-120vh"],
                        x: [`0px`, `${random(-30, 30)}px`],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: bubble.duration,
                        repeat: Infinity,
                        delay: bubble.delay,
                        ease: "easeIn"
                    }}
                />
            ))}
        </div>
    );
};

const CitrusCedarEffect = () => {
    // dark smoky beams & subtle cedar ash
    const [ash, setAsh] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number }[]>([]);

    useEffect(() => {
        const newAsh = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: random(0, 100),
            y: random(0, 100),
            size: random(2, 5),
            duration: random(12, 25),
            delay: random(0, 10),
        }));
        setAsh(newAsh);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-90 pointer-events-none">
            <motion.div className="absolute inset-0 mix-blend-multiply">
                <motion.div
                    className="absolute -top-[10%] left-[10%] w-[130%] h-[60%] bg-gradient-to-b from-indigo-800/30 via-slate-800/20 to-transparent -rotate-45 transform-gpu blur-[80px]"
                    animate={{ opacity: [0.3, 0.7, 0.3], x: [-60, 60, -60] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[0%] -right-[10%] w-[110%] h-[50%] bg-gradient-to-t from-slate-900/40 via-blue-900/20 to-transparent rotate-12 transform-gpu blur-[80px]"
                    animate={{ opacity: [0.2, 0.6, 0.2], y: [-30, 30, -30] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                    className="absolute top-[20%] -left-[20%] w-[80%] h-[60%] bg-gradient-to-tr from-zinc-800/30 to-transparent -rotate-12 transform-gpu blur-[90px]"
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                />
            </motion.div>

            {/* Very slow, glowing points mimicking ambient cedar dust/ash in the light */}
            {ash.map(a => (
                <motion.div
                    key={a.id}
                    className="absolute rounded-full bg-amber-600/30 blur-[1px]"
                    style={{
                        width: a.size,
                        height: a.size,
                        left: `${a.x}%`,
                        top: `${a.y}%`,
                    }}
                    animate={{
                        y: ["-5vh", "-35vh"],
                        x: [`${a.x}%`, `${a.x + random(-15, 15)}%`],
                        opacity: [0, 0.6, 0],
                        scale: [0.8, 1.4, 0.8]
                    }}
                    transition={{
                        duration: a.duration,
                        repeat: Infinity,
                        delay: a.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

const FantasyLandEffect = () => {
    // teal fireflies
    const [fireflies, setFireflies] = useState<{ id: number, startX: number, startY: number, size: number, duration: number, delay: number }[]>([]);

    useEffect(() => {
        const newFireflies = Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            startX: random(10, 90),
            startY: random(20, 80),
            size: random(3, 6),
            duration: random(8, 15),
            delay: random(0, 6),
        }));
        setFireflies(newFireflies);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-100 pointer-events-none mix-blend-multiply">
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            />
            {fireflies.map(ff => (
                <motion.div
                    key={ff.id}
                    className="absolute rounded-full bg-teal-500/90"
                    style={{
                        width: ff.size,
                        height: ff.size,
                        left: `${ff.startX}%`,
                        top: `${ff.startY}%`,
                        boxShadow: '0 0 15px 4px rgba(20, 184, 166, 0.8)'
                    }}
                    animate={{
                        x: [0, random(-120, 120), random(-60, 60), 0],
                        y: [0, random(-120, 120), random(-180, 80), 0],
                        opacity: [0, 1, 0.3, 1, 0],
                        scale: [0.5, 1.4, 0.8, 1.6, 0.5]
                    }}
                    transition={{
                        duration: ff.duration,
                        repeat: Infinity,
                        delay: ff.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

const AyatakaMidoriEffect = () => {
    // rising steam / faint green blur + falling leaves
    const [leaves, setLeaves] = useState<{ id: number, startX: number, startY: number, size: number, duration: number, delay: number, rotation: number }[]>([]);

    useEffect(() => {
        const newLeaves = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            startX: random(5, 95),
            startY: random(-20, -5),
            size: random(12, 28),
            duration: random(14, 28),
            delay: random(0, 15),
            rotation: random(0, 360),
        }));
        setLeaves(newLeaves);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-90 pointer-events-none">
            {/* Steam / Background */}
            <motion.div className="absolute inset-0 mix-blend-multiply">
                <motion.div
                    className="absolute bottom-[0%] left-[10%] w-[50%] h-[90%] rounded-full bg-emerald-600/20 blur-[100px]"
                    animate={{ y: [0, -100, 0], x: [0, 40, 0], scaleY: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[0%] right-[15%] w-[45%] h-[100%] rounded-full bg-green-500/20 blur-[110px]"
                    animate={{ y: [40, -150, 40], x: [0, -40, 0], scaleY: [1.1, 1.5, 1.1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                    className="absolute top-[10%] left-[25%] w-[60%] h-[60%] rounded-full bg-teal-700/15 blur-[120px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                />
            </motion.div>

            {/* Falling Leaves */}
            {leaves.map(leaf => (
                <motion.div
                    key={leaf.id}
                    className="absolute opacity-0"
                    style={{
                        left: `${leaf.startX}%`,
                        top: `${leaf.startY}%`,
                    }}
                    animate={{
                        y: ["0vh", "120vh"],
                        x: [
                            0,
                            random(-40, 40),
                            random(-20, 20),
                            random(-50, 50),
                            random(-15, 15)
                        ],
                        rotate: [leaf.rotation, leaf.rotation + random(180, 540)],
                        opacity: [0, 0.7, 0.9, 0.7, 0]
                    }}
                    transition={{
                        duration: leaf.duration,
                        repeat: Infinity,
                        delay: leaf.delay,
                        ease: "linear"
                    }}
                >
                    {/* Minimalist leaf silhouette */}
                    <svg
                        width={leaf.size}
                        height={leaf.size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-emerald-500/30 drop-shadow-sm blur-[0.3px]"
                    >
                        <path d="M12 2C8.686 2 6 4.686 6 8C6 11.314 12 22 12 22C12 22 18 11.314 18 8C18 4.686 15.314 2 12 2Z" fill="currentColor" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

const CoastalParadiseEffect = () => {
    // water ripples / caustics
    return (
        <div className="absolute inset-0 overflow-hidden opacity-70 mix-blend-multiply pointer-events-none">
            <motion.div
                className="absolute top-[30%] left-[40%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full border-[3px] border-sky-500/40"
                animate={{ scale: [0.5, 2.2], opacity: [0.9, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
                className="absolute top-[50%] left-[60%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full border-[2px] border-blue-500/50"
                animate={{ scale: [0.5, 2.6], opacity: [0.7, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
            />
            <motion.div
                className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] rounded-full border-[4px] border-cyan-500/30"
                animate={{ scale: [0.8, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
        </div>
    );
};

const CelestialVaultEffect = () => {
    // deep amber and slate dust/glow for Specials
    const [stars, setStars] = useState<{ id: number, startX: number, startY: number, size: number, duration: number, delay: number }[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            startX: random(5, 95),
            startY: random(5, 95),
            size: random(2, 6),
            duration: random(10, 20),
            delay: random(0, 8),
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-90 pointer-events-none">
            {/* Elegant deep background glow */}
            <motion.div className="absolute inset-0 mix-blend-multiply">
                <motion.div
                    className="absolute top-[10%] right-[10%] w-[60%] h-[70%] rounded-full bg-slate-600/15 blur-[120px]"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[10%] left-[10%] w-[50%] h-[60%] rounded-full bg-amber-700/15 blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </motion.div>

            {/* Drifting amber/slate "star" dust */}
            {stars.map((star, i) => {
                const isAmber = i % 2 === 0;
                return (
                    <motion.div
                        key={star.id}
                        className={`absolute rounded-full blur-[0.5px] ${isAmber ? 'bg-amber-600/40' : 'bg-slate-700/40'}`}
                        style={{
                            width: star.size,
                            height: star.size,
                            left: `${star.startX}%`,
                            top: `${star.startY}%`,
                            boxShadow: isAmber ? '0 0 12px 2px rgba(180, 83, 9, 0.4)' : '0 0 12px 2px rgba(51, 65, 85, 0.4)'
                        }}
                        animate={{
                            y: ["-2vh", "-20vh"],
                            x: [`0vw`, `${random(-8, 8)}vw`],
                            opacity: [0, 0.9, 0.3, 0.9, 0],
                            scale: [0.5, 1.2, 0.8, 1.5, 0.5]
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "linear"
                        }}
                    />
                );
            })}
        </div>
    );
};

export function ScentEffects({ activeScent, collectionSlug }: { activeScent: string | null, collectionSlug?: string }) {
    // If we're on the vault page and no specific scent is selected (which is default for vault),
    // show the special effect.
    if (collectionSlug === 'vault' && !activeScent) {
        return (
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden transition-opacity duration-1000">
                <AnimatePresence mode="wait">
                    <motion.div key="celestial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
                        <CelestialVaultEffect />
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    if (!activeScent) return null;

    return (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden transition-opacity duration-1000">
            <AnimatePresence mode="wait">
                {activeScent === 'ion-escape' && <motion.div key="ion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><IonEscapeEffect /></motion.div>}
                {activeScent === 'drop-dead-gorgeous' && <motion.div key="ddg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><DropDeadGorgeousEffect /></motion.div>}
                {activeScent === 'enchantment-spell' && <motion.div key="spell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><EnchantmentSpellEffect /></motion.div>}
                {activeScent === 'citrus-cedar' && <motion.div key="cedar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><CitrusCedarEffect /></motion.div>}
                {activeScent === 'fantasy-land' && <motion.div key="fantasy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><FantasyLandEffect /></motion.div>}
                {activeScent === 'ayataka-midori' && <motion.div key="midori" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><AyatakaMidoriEffect /></motion.div>}
                {activeScent === 'coastal-paradise' && <motion.div key="coastal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><CoastalParadiseEffect /></motion.div>}
            </AnimatePresence>
        </div>
    );
}
