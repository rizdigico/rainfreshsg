import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Instagram, Sparkles } from "lucide-react";
import { ScentEffects } from "./ScentEffects";
import { useSEO } from "../hooks/useSEO";

const collections = {
    'air-fresheners': {
        name: 'Air Fresheners',
        description: 'Instantly elevate your space with our premium room sprays. Formulated to neutralize odors and leave a lasting, pristine scent.',
        volume: '300ml (10.1 oz)',
        video: "RFSG UI 1 (2)"
    },
    'hand-soaps': {
        name: 'Hand Soaps',
        description: "Pamper yourself with a therapeutic gentle foaming hand soap while cleaning away germs and preserving the skin's natural moisture barrier - free from dyes, parabens and sulfates 🌟",
        volume: '250ml (8.45 oz)',
        video: "RFSG UI 2 (2)"
    },
    'oils': {
        name: 'Scented Oils',
        description: 'Pamper yourself with a therapeutic scent to alleviate your room.',
        volume: '30ml (1.0 oz)',
        video: "RFSG UI 3 (2)"
    },
    'vault': {
        name: 'Specials',
        description: 'Exclusive, custom packages and highly sought-after blends tailored to your aesthetic.',
        volume: '',
        video: "RFSG UI 4 (2)"
    }
};

const scents = [
    {
        id: 'ion-escape',
        name: 'Ion Escape',
        color: 'bg-[#f59e0b]', // amber-500
        glowClass: 'bg-orange-500/20',
        vibes: 'Clean, Tranquility, Citrusy, Elegance',
        topNotes: 'Sparkling Italian Mandarin, Clary Sage, and Sea Breeze Accord',
        heartNotes: 'Warm Woods, Ambrette Seed, Tonka Bean',
        baseNotes: '',
        price: "$24.00",
    },
    {
        id: 'drop-dead-gorgeous',
        name: 'Drop Dead Gorgeous',
        color: 'bg-[#ec4899]', // pink-500
        glowClass: 'bg-pink-500/20',
        vibes: 'Refreshing, Sensual, Empowered, Alluring',
        topNotes: 'Passionfruit, Grapefruit, Pineapple, Tangerine, Big Strawberry',
        heartNotes: 'Peony, Vanilla Orchid, Red Berries, Jasmine, Lily-of-the-Valley',
        baseNotes: 'Musk, Woody Notes, Oakmoss',
        price: "$24.00",
    },
    {
        id: 'enchantment-spell',
        name: 'Enchantment Spell',
        color: 'bg-[#dc2626]', // red-600
        glowClass: 'bg-red-500/20',
        vibes: 'Vibrant, Fruity, Sweet, Sparkling Fun',
        topNotes: 'Bubbly Champagne and Sparkling Tangerine',
        heartNotes: 'Red Hibiscus, White Nectarine, Blackcurrant Chambord, and Juicy Passionfruit',
        baseNotes: 'Plum Wood, Sugared Musk, and Vanilla extract',
        price: "$24.00",
    },
    {
        id: 'citrus-cedar',
        name: 'Citrus Cedar',
        color: 'bg-[#1e1b4b]', // indigo-950
        glowClass: 'bg-blue-600/30',
        vibes: 'Timeless Masculine, Crisp, Alluring',
        topNotes: 'Grapefruit, Lemon, Mint, and Pink Pepper',
        heartNotes: 'Ginger, Nutmeg, Jasmine, and Iso E Super',
        baseNotes: 'Incense, Vetiver, Cedar, Sandalwood, Patchouli, Labdanum, and White Musk',
        price: "$24.00",
    },
    {
        id: 'fantasy-land',
        name: 'Fantasy Land',
        color: 'bg-[#14b8a6]', // teal-500
        glowClass: 'bg-teal-400/20',
        vibes: 'Serene, Uplifting, Woody, Warm',
        topNotes: 'Bergamot, Lemon, and Sweet Orange',
        heartNotes: 'Jasmine, Lavender, Neroli, and Rose',
        baseNotes: 'Sandalwood, Musk, Vanilla, and Amber',
        price: "$24.00",
    },
    {
        id: 'ayataka-midori',
        name: 'Ayataka Midori',
        color: 'bg-[#16a34a]', // green-600
        glowClass: 'bg-emerald-500/20',
        vibes: 'Invigorating, Fresh, Earthy, Tranquility',
        topNotes: 'Green tea',
        heartNotes: '',
        baseNotes: '',
        price: "$24.00",
    },
    {
        id: 'coastal-paradise',
        name: 'Coastal Paradise',
        color: 'bg-[#3b82f6]', // blue-500
        glowClass: 'bg-sky-400/20',
        vibes: 'Freshness, Breeze, Peace, Clean, Peaceful',
        topNotes: 'Blue Ocean',
        heartNotes: '',
        baseNotes: '',
    },
];

const getScentPrice = (slug: string, scentId: string) => {
    if (slug === 'air-fresheners') {
        if (scentId === 'citrus-cedar' || scentId === 'ion-escape') return '$12.50';
        return '$14.90';
    }
    if (slug === 'hand-soaps') {
        return '$10.50';
    }
    if (slug === 'oils') {
        if (scentId === 'coastal-paradise') return '$5.90';
        return '$6.50';
    }
    return '$24.00';
};

export function CollectionGallery() {
    const { slug } = useParams();
    const currentSlug = slug || 'air-fresheners';
    const collection = collections[currentSlug as keyof typeof collections] || collections['air-fresheners'];

    useSEO({
        title: `${collection.name} | Rainfresh Singapore`,
        description: collection.description,
        url: `/collections/${currentSlug}`
    });

    const collectionScents = scents.filter((scent) => {
        if (currentSlug === 'air-fresheners') {
            return scent.id !== 'coastal-paradise' && scent.id !== 'fantasy-land';
        }
        if (currentSlug === 'hand-soaps') {
            return scent.id !== 'coastal-paradise';
        }
        if (currentSlug === 'vault') {
            return false;
        }
        return true;
    });

    // State to track the currently selected scent in this collection
    const [selectedScent, setSelectedScent] = useState<any>(null);

    const getScentImage = (slug: string, scentId: string) => {
        // e.g. "drop-dead-gorgeous" -> "drop dead gorgeous"
        const formattedScentName = scentId.replace(/-/g, ' ');
        if (slug === 'air-fresheners') {
            return `/Air freshener (${formattedScentName}).jpeg`;
        }
        if (slug === 'hand-soaps') {
            return `/Hand soaps (${formattedScentName}).jpeg`;
        }
        if (slug === 'oils') {
            return `/Scented oil (${formattedScentName}).jpeg`;
        }
        return '';
    };

    const getDefaultImage = (slug: string) => {
        if (slug === 'air-fresheners') return '/new display image for air freshener collection.png';
        if (slug === 'hand-soaps') return '/await-selection/Hand soaps.jpeg';
        if (slug === 'oils') return '/await-selection/Scented oils.jpeg';
        if (slug === 'vault') return '/await-selection/Specials.jpg';
        return '';
    };

    /**
     * Determines optimal aspect-ratio and scale factor for the incoming product image
     * to eliminate black letterbox margins without overly clipping the bottle itself.
     */
    const getViewportConfig = (slug: string, isDefault: boolean = false) => {
        if (slug === 'air-fresheners') {
            return {
                aspect: 'aspect-[3/4]',
                scale: isDefault ? 'scale-100 hover:scale-[1.02]' : 'scale-[1.05] hover:scale-[1.08]'
            };
        }
        if (slug === 'hand-soaps') {
            return {
                aspect: isDefault ? 'aspect-[4/5]' : 'aspect-[4/5]',
                scale: isDefault ? 'scale-[1.25] origin-bottom hover:scale-[1.28]' : 'scale-[1.12] hover:scale-[1.18]'
            };
        }
        if (slug === 'oils') {
            return {
                aspect: isDefault ? 'aspect-[3/4]' : 'aspect-[3/4]',
                scale: isDefault ? 'scale-[1.08] origin-center hover:scale-[1.11]' : 'scale-[1.15] origin-center hover:scale-[1.20]'
            };
        }
        if (slug === 'vault') {
            return {
                aspect: 'aspect-[3/4] md:aspect-[4/3]',
                scale: isDefault ? 'scale-[1.18] origin-top' : 'scale-[1.20] origin-top hover:scale-[1.22]',
                objectPos: 'object-top'
            };
        }
        return {
            aspect: isDefault ? 'aspect-[3/4]' : 'aspect-[4/5]',
            scale: isDefault ? 'scale-100 hover:scale-[1.02]' : 'scale-[1.12] hover:scale-[1.18]',
            objectPos: 'object-center'
        };
    };

    const renderNote = (title: string, content?: string) => {
        if (!content) return null;
        return (
            <div className="mb-4">
                <h4 className="text-[9px] text-slate-400 uppercase tracking-[0.2em] mb-1 font-sans">{title}</h4>
                <p className="font-serif text-slate-800 text-sm leading-relaxed">
                    {content}
                </p>
            </div>
        );
    };

    return (
        <div className="min-h-screen relative w-full overflow-hidden flex font-sans bg-zinc-50">
            {/* Very faint background layout struct */}
            <div className="absolute inset-0 z-0">
                <ScentEffects activeScent={selectedScent?.id || null} collectionSlug={currentSlug} />
                {/* Asymmetric Light Drop */}
                <div className="absolute top-0 right-0 w-[50%] h-full bg-[#fdfdfd] border-l border-slate-100 z-0" />
                {/* Very faint collection title watermark, mimicking 3D presentation setups */}
                <div className="absolute bottom-10 left-10 text-8xl md:text-[15rem] leading-none font-bold tracking-tighter text-slate-900/[0.02] whitespace-nowrap overflow-hidden pointer-events-none z-0">
                    {collection.name}
                </div>
            </div>

            {/* Back Button */}
            <Link
                to="/home"
                className="fixed top-24 left-6 md:left-12 z-50 flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.15em] text-[10px] font-semibold bg-white/40 px-4 py-2 rounded-full border border-black/5 backdrop-blur-md hover:bg-white hover:shadow-sm duration-300"
            >
                <ArrowLeft className="w-3 h-3" />
                <span>Back</span>
            </Link>

            {/* Main Content Area */}
            <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-center pt-24 md:pt-32 pb-8 md:pb-16 px-6 lg:px-24">

                {/* Left Side: Information Architecture */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="w-full md:w-1/2 lg:w-5/12 max-w-lg md:pr-12 lg:pr-24 flex flex-col justify-center h-full relative"
                >
                    <div className="flex flex-col h-full min-h-[auto] md:min-h-[500px]">

                        {/* Always show Collection Header */}
                        <div className="mb-10 lg:mb-16">
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-3 flex items-center gap-3">
                                <span className="w-4 h-[1px] bg-slate-400"></span>
                                {currentSlug.replace('-', ' ')}
                            </h2>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900 leading-[0.9]">
                                {collection.name.split(' ').map((word: string, i: number) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>
                        </div>

                        {/* Middle Content swaps between Description and Scent Details */}
                        <div className="flex flex-col flex-grow relative">
                            <AnimatePresence mode="wait">
                                {!selectedScent ? (
                                    <motion.div
                                        key="collection-desc"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full overflow-y-auto pr-4 custom-scrollbar pb-6"
                                    >
                                        {currentSlug === 'vault' ? (
                                            <div className="space-y-6 max-w-xl text-slate-600 leading-relaxed font-medium">
                                                <p className="text-xl font-bold tracking-tight text-slate-900 mb-2">
                                                    Wedding Favours / Door Gifts / Berkat <br />
                                                    <span className="text-sm font-semibold tracking-widest text-slate-400 uppercase mt-1 block">Perfume Room Mist & Pillow Mist (30ml)</span>
                                                </p>

                                                <div className="flex items-center gap-4 py-4 border-y border-black/5">
                                                    <div>
                                                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 block mb-1 font-semibold">Starting Price</span>
                                                        <span className="text-2xl font-bold tracking-tight text-slate-900">S$3.50</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 text-[15px]">
                                                    <p>A simple way to instantly refresh and elevate any space.</p>
                                                    <p>Just a few sprays can transform your room into a calming, inviting environment that smells clean, cozy, and beautifully scented.</p>
                                                    <p>Perfect for use on linens, pillows, curtains, carpets, and even in your bathroom or car.</p>
                                                    <p>Compact and elegant, they also make thoughtful gifts for special occasions like weddings, housewarmings, or celebrations ♡</p>
                                                </div>

                                                <div className="space-y-3 pt-4">
                                                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.1em]">Package Inclusive Of:</h4>
                                                    <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
                                                        <li>Basic black 30ml spray bottle</li>
                                                        <li>Personalised/Customised sticker on bottle</li>
                                                        <li>Choice of one scent</li>
                                                        <li><strong>FREE Delivery</strong> for orders above 100 bottles</li>
                                                    </ul>
                                                </div>

                                                <div className="space-y-3 pt-2">
                                                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.1em]">Choice of Scents:</h4>
                                                    <ul className="list-disc list-inside space-y-1 pl-2 text-sm">
                                                        <li><strong>CITRUS CEDAR</strong> (Chanel Bleu)</li>
                                                        <li><strong>ION ESCAPE</strong> (Ion Orchard)</li>
                                                        <li><strong>DROP DEAD GORGEOUS</strong> (Victoria Secret Bombshell)</li>
                                                        <li><strong>AYATAKA MIDORI</strong> (Green Tea)</li>
                                                        <li><strong>FANTASY LAND</strong> (Shangri-La Resort)</li>
                                                        <li><strong>COASTAL PARADISE</strong> (Blue Ocean + Oud)</li>
                                                    </ul>
                                                </div>

                                                <div className="space-y-3 pt-4 border-t border-black/5">
                                                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.1em]">Add Ons:</h4>
                                                    <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                                                        <li>
                                                            Empty Plain Black Packaging Box
                                                            <div className="pl-5 mt-1 space-y-1 text-slate-500">
                                                                <p>With Sticker + $0.80 per box</p>
                                                                <p>Without sticker + $0.50 per box</p>
                                                            </div>
                                                        </li>
                                                        <li>Glass Bottle + $1.00 / per bottle</li>
                                                        <li>Multiple Choice of Scents + $0.30 / per bottle</li>
                                                        <li>Customised Greetings Card + $0.60 per card</li>
                                                    </ul>
                                                </div>

                                                <div className="space-y-3 pt-4 border-t border-black/5">
                                                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.1em]">Notes:</h4>
                                                    <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-500">
                                                        <li>Lead time - 3 months before wedding date</li>
                                                        <li>50% non-refundable deposit payment to be made upon booking</li>
                                                        <li>Balance of 50% payment to be made before items delivered on wedding day</li>
                                                        <li>Absence of timely payment would result in items not delivered and fulfilled</li>
                                                    </ul>
                                                </div>

                                                <div className="bg-slate-900 text-white p-6 rounded-2xl mt-8">
                                                    <p className="font-bold mb-2">Ready to secure your booking?</p>
                                                    <p className="text-sm text-slate-300 mb-4">Contact us and we'd be happy to share the details! 👇🏼</p>

                                                    <a href="https://www.instagram.com/rainfreshsg/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-slate-100 transition-colors w-auto">
                                                        <Instagram className="w-4 h-4" />
                                                        <span>Enquire via Instagram DM</span>
                                                    </a>
                                                    <p className="text-xs text-slate-400 mt-4">Or WhatsApp: <strong>9684 2440</strong></p>
                                                </div>

                                                {/* Sarang Sayang Partner Card */}
                                                <div className="mt-4 p-6 rounded-2xl border border-blue-100/50 bg-gradient-to-br from-blue-50/50 to-white/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#60A5FA" fillOpacity="0.2" /></svg>
                                                        </div>
                                                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Featured Partner</span>
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-800 mb-2 leading-relaxed">
                                                        Planning a Malay wedding?
                                                    </p>
                                                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                                        Our custom Berkat packages are proudly featured on <strong>Sarang Sayang</strong> — the ultimate platform for all things Malay weddings. Discover over 100 vendors for emcees, gifts, marriage courses, and more.
                                                    </p>
                                                    <a href="https://www.sarangsayang.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-500 hover:text-blue-700 transition-colors uppercase tracking-[0.1em]">
                                                        <span>Visit Sarang Sayang</span>
                                                        <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                                                    {collection.description}
                                                </p>
                                                {collection.volume && (
                                                    <p className="text-sm font-bold tracking-widest text-slate-400 mt-6 uppercase">
                                                        {collection.volume}
                                                    </p>
                                                )}

                                                {/* Generic Multi-Buy Discount Display */}
                                                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-slate-200/40 to-slate-100/20 border border-slate-200/60 inline-block w-full max-w-sm">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shadow-md">
                                                            <Sparkles className="w-3 h-3 text-white" />
                                                        </div>
                                                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em]">Bundle Deals</h4>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">Buy 3 items</span>
                                                            <span className="text-lg font-bold text-slate-800">3% <span className="text-sm text-slate-500 font-medium">OFF</span></span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">Buy 5 items</span>
                                                            <span className="text-lg font-bold text-slate-800">5% <span className="text-sm text-slate-500 font-medium">OFF</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={`scent-info-${selectedScent.id}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full flex flex-col"
                                    >
                                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4 pb-4 border-b border-black/5">
                                            {selectedScent.name}
                                        </h2>

                                        <div className="mb-6 space-y-4">
                                            {renderNote("Top Notes", selectedScent.topNotes)}
                                            {renderNote("Heart Notes", selectedScent.heartNotes)}
                                            {renderNote("Base Notes", selectedScent.baseNotes)}
                                        </div>

                                        <div className="flex items-center gap-8 mt-auto pt-6">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 block mb-1 font-semibold">Price</span>
                                                <span className="text-xl font-bold tracking-tight text-slate-900">{getScentPrice(currentSlug, selectedScent.id)}</span>
                                            </div>
                                            <a href="https://tinyurl.com/shoprainfresh" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white hover:bg-slate-800 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 font-bold w-full md:w-auto">
                                                <span>Buy on TikTok</span>
                                                <svg
                                                    className="w-4 h-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                                </svg>
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom: Minimalist Color Pickers */}
                        {collectionScents.length > 0 && (
                            <div className="mt-8 md:pt-8 md:mt-auto relative z-10 pb-6 md:pb-0">
                                <h3 className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-4 font-sans font-semibold flex items-center gap-4">
                                    <span>Scents</span>
                                    {selectedScent && (
                                        <button
                                            onClick={() => setSelectedScent(null)}
                                            className="text-[9px] lowercase text-slate-400 hover:text-slate-900 underline decoration-transparent hover:decoration-slate-900 transition-colors"
                                        >
                                            clear
                                        </button>
                                    )}
                                </h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {collectionScents.map(scent => (
                                        <button
                                            key={scent.id}
                                            onClick={() => setSelectedScent(scent)}
                                            aria-label={scent.name}
                                            className={`relative group w-8 h-8 md:w-6 md:h-6 rounded-full transition-all duration-300
                                                ${selectedScent?.id === scent.id ? 'scale-110 ring-2 ring-offset-2 ring-slate-900' : 'ring-1 ring-black/10 hover:scale-110'}
                                            `}
                                        >
                                            {/* Inner color swatch */}
                                            <div className={`absolute inset-0 rounded-full ${scent.color} ${selectedScent?.id === scent.id ? 'border border-white/20' : ''}`} />

                                            {/* Tooltip */}
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] whitespace-nowrap text-white font-medium bg-slate-900 px-2.5 py-1 rounded shadow-sm pointer-events-none z-50">
                                                {scent.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Right Side: Showcase / 3D Product Layout */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="w-full md:w-1/2 lg:w-7/12 relative flex items-center justify-center min-h-[40vh] md:min-h-[80vh] mt-8 md:mt-0"
                >
                    <AnimatePresence mode="wait">
                        {selectedScent ? (
                            <motion.div
                                key={`img-${selectedScent.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full h-full flex justify-center items-center p-8 lg:p-16"
                            >
                                {/* Subtle tinted spotlight glow behind the product instead of full background mutation */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square ${selectedScent.glowClass} blur-[100px] rounded-full z-0 transition-colors duration-700 pointer-events-none opacity-40`} />

                                <motion.div
                                    animate={{ y: [-8, 8, -8] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className={`relative z-10 w-full max-w-[420px] ${getViewportConfig(currentSlug, false).aspect} rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/5`}
                                >
                                    <img
                                        src={getScentImage(currentSlug, selectedScent.id)}
                                        alt={selectedScent.name}
                                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${getViewportConfig(currentSlug, false).objectPos || 'object-center'} ${getViewportConfig(currentSlug, false).scale}`}
                                    />
                                </motion.div>
                            </motion.div>
                        ) : currentSlug === 'vault' ? (
                            <motion.div
                                key="vault-empty-visual"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full flex flex-col items-center lg:items-end justify-start px-4 lg:pr-12 xl:pr-24 pt-4 md:pt-0"
                            >
                                <div className="flex flex-col gap-6 md:gap-14 w-full max-w-[460px] lg:max-w-[520px] md:-mt-8 pb-12">
                                    {[1, 2, 3, 4].map((num) => (
                                        <motion.div
                                            key={`specials-${num}`}
                                            className="relative z-10 w-full rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5 group"
                                        >
                                            <img
                                                src={`/Specials (${num}).jpg`}
                                                alt={`Specials Packaging ${num}`}
                                                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty-visual"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full flex items-center justify-center p-8 lg:p-16"
                            >
                                <motion.div
                                    animate={{ y: [-8, 8, -8] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className={`relative z-10 w-full max-w-[420px] ${getViewportConfig(currentSlug, true).aspect} rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/5`}
                                >
                                    <img
                                        src={getDefaultImage(currentSlug)}
                                        alt="Awaiting Selection"
                                        className={`w-full h-full object-cover transition-transform duration-700 ease-out opacity-[0.95] ${getViewportConfig(currentSlug, true).objectPos || 'object-center'} ${getViewportConfig(currentSlug, true).scale}`}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
}
