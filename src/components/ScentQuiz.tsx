import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
    {
        question: "What vibe are you trying to create today?",
        options: [
            { text: "Relaxed & Zen", points: { "Ayataka Midori": 2, "Coastal Paradise": 2 } },
            { text: "Vibrant & Playful", points: { "Enchantment Spell": 2, "Drop Dead Gorgeous": 2 } },
            { text: "Elegant & Sophisticated", points: { "Ion Escape": 2, "Citrus Cedar": 2 } },
            { text: "Cozy & Warm", points: { "Fantasy Land": 3 } },
        ]
    },
    {
        question: "Pick your ideal setting:",
        options: [
            { text: "A luxury hotel lobby", points: { "Ion Escape": 2, "Fantasy Land": 2 } },
            { text: "A sunny beach resort", points: { "Coastal Paradise": 2, "Ayataka Midori": 1 } },
            { text: "A chic cocktail bar", points: { "Enchantment Spell": 2, "Drop Dead Gorgeous": 2 } },
            { text: "A modern, sleek lounge", points: { "Citrus Cedar": 3 } },
        ]
    },
    {
        question: "Select your favorite type of notes:",
        options: [
            { text: "Citrus & Fruity", points: { "Ion Escape": 2, "Enchantment Spell": 1 } },
            { text: "Floral & Sweet", points: { "Drop Dead Gorgeous": 3 } },
            { text: "Woody & Earthy", points: { "Fantasy Land": 1, "Citrus Cedar": 2, "Ayataka Midori": 2 } },
            { text: "Clean & Ocean", points: { "Coastal Paradise": 3 } },
        ]
    },
    {
        question: "How do you usually spend your weekend downtime?",
        options: [
            { text: "Shopping or exploring the city", points: { "Ion Escape": 2, "Drop Dead Gorgeous": 1 } },
            { text: "A quiet getaway in nature", points: { "Ayataka Midori": 2, "Fantasy Land": 2 } },
            { text: "Going out for drinks and fun", points: { "Enchantment Spell": 2, "Citrus Cedar": 1 } },
            { text: "Lounging by the pool or beach", points: { "Coastal Paradise": 3 } },
        ]
    },
    {
        question: "What time of day makes you feel the most alive?",
        options: [
            { text: "Early, crisp, and fresh mornings", points: { "Ayataka Midori": 2, "Ion Escape": 1 } },
            { text: "Bright, sunny and warm afternoons", points: { "Coastal Paradise": 2, "Drop Dead Gorgeous": 1 } },
            { text: "Golden hour sunsets", points: { "Fantasy Land": 2, "Enchantment Spell": 1 } },
            { text: "Late, mysterious and cool nights", points: { "Citrus Cedar": 3 } },
        ]
    }
];

const scentDetails: Record<string, { color: string, text: string, tagline: string }> = {
    "Ion Escape": { color: "bg-orange-500", text: "text-orange-500", tagline: "ION Orchard scent-inspired" },
    "Drop Dead Gorgeous": { color: "bg-pink-500", text: "text-pink-500", tagline: "Victoria's Secret Bombshell scent-inspired" },
    "Enchantment Spell": { color: "bg-red-500", text: "text-red-500", tagline: "B&BW Champagne Toast scent-inspired" },
    "Citrus Cedar": { color: "bg-indigo-600", text: "text-indigo-600", tagline: "Chanel Bleu scent-inspired" },
    "Fantasy Land": { color: "bg-teal-500", text: "text-teal-500", tagline: "Shangri-La Resort scent-inspired" },
    "Ayataka Midori": { color: "bg-green-600", text: "text-green-600", tagline: "Green Tea scent-inspired" },
    "Coastal Paradise": { color: "bg-blue-500", text: "text-blue-500", tagline: "Blue Ocean scent-inspired" }
};

export function ScentQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [result, setResult] = useState<string | null>(null);

    // A softer, more premium minimal "UI reveal/positive" ping
    const playSuccessSound = () => {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3");
        audio.volume = 0.2; // very subtle
        audio.play().catch(e => console.log("Audio play failed:", e));
    };

    const handleOptionSelect = (points: Record<string, number>) => {
        const newScores = { ...scores };
        Object.entries(points).forEach(([scent, pts]) => {
            newScores[scent] = (newScores[scent] || 0) + pts;
        });
        setScores(newScores);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate winner
            let topScent = "Ion Escape"; // fallback
            let maxPoints = -1;
            Object.entries(newScores).forEach(([scent, pts]) => {
                const points = pts as number;
                if (points > maxPoints) {
                    maxPoints = points;
                    topScent = scent;
                }
            });

            playSuccessSound();
            setTimeout(() => {
                setResult(topScent);
            }, 300); // tiny delay for visual smoothness
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScores({});
        setResult(null);
    };

    return (
        <div className="glass-card w-full rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl mb-16 relative overflow-hidden">
            {/* Very faint background pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles className="w-48 h-48 text-cyan-400" />
            </div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h3 className="text-sm font-bold tracking-[0.2em] text-cyan-500 uppercase mb-2">Scent Matcher</h3>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900">
                        Find Your Perfect Rainfresh Scent
                    </h2>
                </div>

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key={`question-${currentQuestion}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-2xl mx-auto"
                        >
                            <p className="text-center text-slate-500 font-semibold mb-6 flex items-center justify-center gap-2">
                                <span>Question {currentQuestion + 1} of {questions.length}</span>
                                <span className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <span className="h-full bg-cyan-400 block" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
                                </span>
                            </p>

                            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-slate-800 mb-6 md:mb-8 px-2">
                                {questions[currentQuestion].question}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {questions[currentQuestion].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(option.points)}
                                        className="p-4 md:p-6 text-left rounded-2xl border border-slate-200/60 bg-white/40 hover:bg-white/80 hover:border-cyan-300/50 hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                                                <div className="w-3 h-3 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                                                {option.text}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center text-center max-w-xl mx-auto"
                        >
                            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">Your Match is</span>
                            <div className={`w-24 h-24 rounded-full ${scentDetails[result].color} flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/20 blur-md" />
                                <Sparkles className="w-10 h-10 text-white relative z-10" />
                            </div>
                            <h3 className={`text-4xl font-extrabold tracking-tighter ${scentDetails[result].text} mb-2`}>
                                {result}
                            </h3>
                            <p className="text-slate-500 font-medium uppercase tracking-[0.1em] text-xs mb-8">
                                {scentDetails[result].tagline}
                            </p>

                            <p className="text-slate-700 leading-relaxed mb-10">
                                Based on your answers, this scent profile perfectly matches the vibe you're looking to create. Try using it in your living room or before winding down for the night.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4">
                                <Link to="/home" className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors inline-block w-full sm:w-auto text-center">
                                    Shop {result}
                                </Link>
                                <button
                                    onClick={resetQuiz}
                                    className="flex items-center justify-center gap-2 px-6 py-3 text-slate-500 hover:text-slate-900 font-semibold transition-colors w-full sm:w-auto"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Retake Quiz</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
