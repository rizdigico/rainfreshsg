import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export function AmbientAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Free, soothing, looping rain sound from Mixkit
    const rainAudioUrl = "https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.15; // lower volume further
            // Attempt to autoplay
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.log("Autoplay prevented by browser:", error);
                    setIsPlaying(false);
                });
            }
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
            <audio
                ref={audioRef}
                src={rainAudioUrl}
                loop
                preload="auto"
            />

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className={`flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md shadow-2xl transition-all duration-300 ${isPlaying
                    ? 'bg-slate-900/80 border-slate-700 text-white'
                    : 'bg-white/40 border-black/5 text-slate-600 hover:bg-white/80 hover:text-slate-900'
                    }`}
                aria-label={isPlaying ? 'Mute ASMR' : 'Play ASMR'}
            >
                <div className="relative flex items-center justify-center">
                    {isPlaying ? (
                        <>
                            <Volume2 className="w-5 h-5" />
                            {/* Simple pulsating radar effect when active */}
                            <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400 opacity-20"></span>
                        </>
                    ) : (
                        <VolumeX className="w-5 h-5" />
                    )}
                </div>
            </motion.button>
        </div>
    );
}
