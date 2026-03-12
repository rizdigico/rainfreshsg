import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Sparkles, ChevronDown, Droplet, Droplets, Wind, Clock, RefreshCw, Instagram } from "lucide-react";
import { CollectionGallery } from "./components/CollectionGallery";
import { RainEffect } from "./components/RainEffect";
import { ScentQuiz } from "./components/ScentQuiz";
import { AmbientAudio } from "./components/AmbientAudio";
import { useGlobalClickSound } from "./hooks/useGlobalClickSound";
import { useSEO } from "./hooks/useSEO";

function NavBar() {
  const location = useLocation();

  // Don't show nav on the landing page
  if (location.pathname === "/") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 bg-gradient-to-b from-white via-white/80 to-transparent pb-4">
      <div className="max-w-7xl mx-auto px-8 h-12 flex items-center justify-between">
        <Link to="/home" className="flex flex-col items-start -space-y-1">
          <div className="flex items-start">
            <span className="text-slate-900 font-bold tracking-[-0.05em] text-2xl lowercase leading-none">rainfresh</span>
            {/* Tiny aesthetic raindrop purely css rendered */}
            <div className="w-1.5 h-2 rounded-full rounded-tr-none bg-blue-300 transform -rotate-45 ml-0.5 mt-0.5 opacity-50 shadow-[0_0_5px_rgba(147,197,253,0.5)]"></div>
          </div>
          <span className="text-slate-700 font-light tracking-[0.2em] text-[10px] lowercase pl-1">by Rai</span>
        </Link>
        <div className="hidden md:flex gap-10">
          <Link to="/home" className={`text-xs uppercase tracking-widest font-semibold transition-colors ${location.pathname === '/home' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>Home</Link>
          <Link to="/about" className={`text-xs uppercase tracking-widest font-semibold transition-colors ${location.pathname === '/about' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>About Us</Link>
          <Link to="/scent-guide" className={`text-xs uppercase tracking-widest font-semibold transition-colors ${location.pathname === '/scent-guide' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}>Scent Guide</Link>
        </div>
        {/* Mobile menu placeholder - just showing links for now to ensure functionality */}
        <div className="flex md:hidden gap-6 overflow-x-auto hide-scrollbar items-center">
          <Link to="/home" className={`text-xs uppercase font-bold whitespace-nowrap px-1 py-2 ${location.pathname === '/home' ? 'text-slate-900' : 'text-slate-400'}`}>Home</Link>
          <Link to="/about" className={`text-xs uppercase font-bold whitespace-nowrap px-1 py-2 ${location.pathname === '/about' ? 'text-slate-900' : 'text-slate-400'}`}>About</Link>
          <Link to="/scent-guide" className={`text-xs uppercase font-bold whitespace-nowrap px-1 py-2 ${location.pathname === '/scent-guide' ? 'text-slate-900' : 'text-slate-400'}`}>Guide</Link>
        </div>
      </div>
    </nav>
  );
}


function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      <motion.img
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src="/logoo.png"
        alt="Loading..."
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute bottom-16 flex space-x-3 z-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -8, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            className="w-2.5 h-2.5 bg-slate-400 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}


const reviews = [
  {
    id: 1,
    name: "Sarah L.",
    handle: "@sarahloves",
    text: "The Ion Escape scent literally makes my HDB smell like a luxury hotel! Obsessed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michelle T.",
    handle: "@michellet",
    text: "Drop Dead Gorgeous is my new signature room scent. So fresh and long-lasting!",
    rating: 5,
  },
  {
    id: 3,
    name: "Chloe W.",
    handle: "@chloewong",
    text: "Bought the Fantasy Land oil and it's so calming. Perfect for winding down after work.",
    rating: 5,
  }
];

function ReviewSection() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">As Seen on TikTok & Loved by You</h2>
        <p className="text-slate-400">Real reviews from our amazing community.</p>
      </div>

      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 gap-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card min-w-[300px] md:min-w-[400px] p-8 snap-center flex-shrink-0"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
                <img src={`https://picsum.photos/seed/${review.id}/100/100`} alt={review.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="text-white font-semibold">{review.name}</h4>
                <p className="text-slate-400 text-sm">{review.handle}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-slate-300 leading-relaxed">"{review.text}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  useSEO({
    title: "Rainfresh Singapore | Premium Room Scents & Hand Soaps",
    description: "Transform your space with Rainfresh's luxury air fresheners, therapeutic hand soaps, and premium scented oils. Discover the new aesthetic in Singapore.",
    url: "/"
  });

  return (
    <div className="relative font-sans bg-zinc-50">
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-32">
          {/* Left Side: Brand & Huge Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-900 block" />
                <span className="text-[10px] font-bold tracking-[0.25em] text-slate-800 uppercase">New Collection</span>
              </div>

              {/* The giant minimalist text treatment */}
              <h1 className="text-[17vw] md:text-[12vw] leading-none lg:text-[8rem] font-bold tracking-tighter text-slate-900 mb-6 drop-shadow-2xl">
                PURE.
              </h1>

              <p className="text-sm md:text-base text-slate-500 font-light max-w-sm tracking-wide leading-relaxed">
                We precisely craft products from organically sourced materials. Discover the new aesthetic.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Collection Grid / 3D Layout */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-10 mt-8 lg:mt-0">
            {/* Faint blue stylistic circle behind the grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[#e6f2ff] rounded-full blur-3xl -z-10 opacity-70" />

            {[
              {
                title: "Air Fresheners",
                slug: "air-fresheners",
                subtitle: "Instant Neutralization",
                image: "/new display image for air freshener collection.png",
                bgPos: "object-center"
              },
              {
                title: "Hand Soaps",
                slug: "hand-soaps",
                subtitle: "Gentle Cleansing",
                image: "/await-selection/Hand soaps.jpeg",
                bgPos: "object-bottom"
              },
              {
                title: "Oils",
                slug: "oils",
                subtitle: "Continuous Aroma",
                image: "/await-selection/Scented oils.jpeg",
                bgPos: "object-center"
              },
              {
                title: "Specials",
                slug: "vault",
                subtitle: "Customized Package",
                image: "/Specials (2).jpg",
                bgPos: "object-top"
              }
            ].map((category, idx) => (
              <Link key={category.slug} to={`/collections/${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[4/5] md:aspect-[3/4] lg:aspect-square bg-slate-900 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl flex flex-col items-center justify-end p-4 md:p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group relative"
                >
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 ${category.bgPos}`}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-0" />

                  {/* Subtle highlight overlay */}
                  <div className="absolute inset-0 border border-white/20 rounded-2xl z-10 pointer-events-none" />

                  {/* Content */}
                  <h3 className="text-white font-bold tracking-tight text-lg sm:text-xl md:text-3xl z-10 mb-1 drop-shadow-md text-center">{category.title}</h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-300 uppercase tracking-widest z-10 font-semibold text-center">{category.subtitle}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Guides */}
      <div className="w-full pt-24 pb-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Air Freshener Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-16 shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle glow bg */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="text-center mb-10 md:mb-16 relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">How to Use</h2>
              <p className="text-slate-400 text-sm sm:text-base">Maximize the impact of your Air Freshener.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 hover:scale-110">
                  <Droplet className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">1. Point to Floor</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">Aim the nozzle downwards towards the floor or carpet for optimal dispersion.</p>
              </div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 hover:scale-110">
                  <Wind className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">2. Spray in Waves</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">Press and spray in a gentle wave motion at least 3 times across the area.</p>
              </div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 hover:scale-110">
                  <Clock className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">3. Wait 30 Seconds</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">Allow the mist to settle and the scent profile to fully develop in the room.</p>
              </div>
            </div>
          </motion.div>

          {/* Perfume Oil Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-16 shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle glow bg */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="text-center mb-10 md:mb-16 relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">How to Use</h2>
              <p className="text-slate-400 text-sm sm:text-base">Perfect your ambiance with our Premium Perfume Oil.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 hover:scale-110">
                  <Droplet className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">1. Add Drops</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">Drop 4-5 drops of the perfume oil into your water-based diffuser for a mild room scent.</p>
              </div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 hover:scale-110">
                  <Droplets className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">2. Adjust Strength</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">Add 8-10 drops instead for a stronger, more pervasive aroma profile.</p>
              </div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 hover:scale-110">
                  <RefreshCw className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">3. Pro Tip: Rinse</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">Always clear out excess water and rinse off your diffuser before adding new scents so they do not mix.</p>
              </div>
            </div>

            <div className="mt-16 text-center text-slate-700 italic font-medium tracking-wide pt-8 border-t border-slate-800/50">
              "Self care is everything. Thank you for choosing to pamper yourself ♡"
            </div>
          </motion.div>

        </div>

        {/* Minimal Social Footer */}
        <footer className="w-full mt-16 mb-4 flex justify-center items-center gap-8 relative z-10">
          <a href="https://www.instagram.com/rainfreshsg/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors duration-300">
            <Instagram strokeWidth={1.5} className="w-8 h-8" />
          </a>
          <a href="https://www.tiktok.com/@rainfreshsg" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors duration-300 flex items-center justify-center">
            <svg
              className="w-[28px] h-[28px]"
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
        </footer>
      </div>
    </div>
  );
}

function AboutPage() {
  useSEO({
    title: "Our Story | Rainfresh Singapore",
    description: "Learn about the Rainfresh Paradox: A dream to help Singaporeans take a therapeutic pause in their daily lives with premium room scents and purposeful giving.",
    url: "/about"
  });

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Abstract Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-500/10 blur-[150px] pointer-events-none" />

      <header className="relative z-10 text-center pt-32 md:pt-24 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-200 bg-white/60 backdrop-blur-md shadow-sm"
        >
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Our Story</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-tight"
        >
          The <span className="text-cyan-500">Rainfresh</span> Paradox
        </motion.h1>
      </header>

      {/* Founder's Story */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="rounded-3xl overflow-hidden glass-card p-2">
              <div className="w-full rounded-2xl bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <img src="/about-us/439.jpg" alt="Founder Portrait" className="w-full h-auto object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">RAI</p>
                  <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Founder & Creator</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 space-y-6 text-slate-600 text-lg leading-relaxed"
          >
            <p>It all started with a dream.</p>
            <p>A dream to make Singaporeans be able to take a pause in their life and relax. And that was how Rainfresh came about.</p>
            <p>Quick, therapeutic escape through hand hygiene or room scents.</p>
            <p>Be in at home, in the car or at the office. There is always a chance to pamper yourself.</p>
            <p>In addition, 50 cents of each item will be donated for a good cause. So you are not only pampering yourself, but with a purpose ❤️</p>
            <p>Enjoy the scents and unwind.</p>
            <div className="pt-6 mt-6 border-t border-slate-200">
              <p className="font-bold text-slate-900 text-xl">Rai</p>
              <p className="text-cyan-600 text-sm font-bold tracking-widest pt-1 uppercase">Founder, RAINFRESH</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ScentGuidePage() {
  const scents = [
    {
      name: "Ion Escape",
      tagline: "ION Orchard scent-inspired",
      mood: "Clean, Tranquility, Citrusy, Elegance",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      topNotes: "Sparkling Italian Mandarin, Clary Sage, and Sea Breeze Accord",
      heartNotes: "Warm Woods, Ambrette Seed, Tonka Bean",
      baseNotes: ""
    },
    {
      name: "Drop Dead Gorgeous",
      tagline: "Victoria's Secret Bombshell scent-inspired",
      mood: "Refreshing, Sensual, Empowered, Alluring",
      color: "bg-pink-500",
      textColor: "text-pink-500",
      topNotes: "Passionfruit, Grapefruit, Pineapple, Tangerine, Big Strawberry",
      heartNotes: "Peony, Vanilla Orchid, Red Berries, Jasmine, Lily-of-the-Valley",
      baseNotes: "Musk, Woody Notes, Oakmoss"
    },
    {
      name: "Enchantment Spell",
      tagline: "B&BW Champagne Toast scent-inspired",
      mood: "Vibrant, Fruity, Sweet, Sparkling Fun",
      color: "bg-red-500",
      textColor: "text-red-500",
      topNotes: "Bubbly Champagne and Sparkling Tangerine",
      heartNotes: "Red Hibiscus, White Nectarine, Blackcurrant Chambord, and Juicy Passionfruit",
      baseNotes: "Plum Wood, Sugared Musk, and Vanilla extract"
    },
    {
      name: "Citrus Cedar",
      tagline: "Chanel Bleu scent-inspired",
      mood: "Timeless Masculine, Crisp, Alluring",
      color: "bg-indigo-600",
      textColor: "text-indigo-600",
      topNotes: "Grapefruit, Lemon, Mint, and Pink Pepper",
      heartNotes: "Ginger, Nutmeg, Jasmine, and Iso E Super",
      baseNotes: "Incense, Vetiver, Cedar, Sandalwood, Patchouli, Labdanum, and White Musk"
    },
    {
      name: "Fantasy Land",
      tagline: "Shangri-La Resort scent-inspired",
      mood: "Serene, Uplifting, Woody, Warm",
      color: "bg-teal-500",
      textColor: "text-teal-500",
      topNotes: "Bergamot, Lemon, and Sweet Orange",
      heartNotes: "Jasmine, Lavender, Neroli, and Rose",
      baseNotes: "Sandalwood, Musk, Vanilla, and Amber"
    },
    {
      name: "Ayataka Midori",
      tagline: "Green Tea scent-inspired",
      mood: "Invigorating, Fresh, Earthy, Tranquility",
      color: "bg-green-600",
      textColor: "text-green-600",
      topNotes: "Green tea",
      heartNotes: "",
      baseNotes: ""
    },
    {
      name: "Coastal Paradise",
      tagline: "Blue Ocean scent-inspired",
      mood: "Freshness, Breeze, Peace, Clean, Peaceful",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      topNotes: "Blue Ocean",
      heartNotes: "",
      baseNotes: ""
    }
  ];

  useSEO({
    title: "Scent Guide & Library | Rainfresh Singapore",
    description: "Take our scent quiz and explore our library of premium blends including Ion Escape, Citrus Cedar, and Drop Dead Gorgeous to find your perfect mood.",
    url: "/scent-guide"
  });

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Abstract Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-500/10 blur-[150px] pointer-events-none" />

      <header className="relative z-10 text-center pt-32 md:pt-24 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-200 bg-white/60 backdrop-blur-md shadow-sm"
        >
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Scent Library</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-tight"
        >
          Know Your <span className="text-cyan-500">Scents</span>
        </motion.h1>
      </header>

      <section className="relative z-10 max-w-5xl mx-auto px-6">
        <ScentQuiz />
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="space-y-6">
          {scents.map((scent, index) => (
            <motion.div
              key={scent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden relative group hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Subtle background glow linked to the scent's color */}
              <div className={`absolute -right-32 -top-32 w-96 h-96 blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${scent.color}`} />

              <div className="flex flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-12 relative z-10">
                {/* Brand & Inspiration (Left) */}
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200/60 pb-6 md:pb-0 md:pr-8 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 mb-3">{scent.name}</h2>
                  <p className={`text-[11px] font-bold tracking-[0.2em] uppercase ${scent.textColor}`}>{scent.tagline}</p>
                </div>

                {/* Notes & Mood (Right) */}
                <div className="w-full md:w-2/3 flex flex-col justify-center">
                  <p className="text-slate-800 font-semibold mb-6 flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${scent.color}`}></span>
                    {scent.mood}
                  </p>

                  <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
                    {scent.topNotes && (
                      <li className="flex items-start gap-2 md:gap-4 flex-col md:flex-row">
                        <span className="font-bold text-slate-900 md:min-w-[170px]">Top Notes:</span>
                        <span>{scent.topNotes}</span>
                      </li>
                    )}
                    {scent.heartNotes && (
                      <li className="flex items-start gap-2 md:gap-4 flex-col md:flex-row">
                        <span className="font-bold text-slate-900 md:min-w-[170px]">Heart (Middle) Notes:</span>
                        <span>{scent.heartNotes}</span>
                      </li>
                    )}
                    {scent.baseNotes && (
                      <li className="flex items-start gap-2 md:gap-4 flex-col md:flex-row">
                        <span className="font-bold text-slate-900 md:min-w-[170px]">Base Notes:</span>
                        <span>{scent.baseNotes}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CorporatePage() {
  useSEO({
    title: "Weddings & Corporate Gifts Singapore | Rainfresh",
    description: "Elevate your wedding or corporate event with customized premium scent packages and bespoke labels tailored for you in Singapore.",
    url: "/corporate"
  });

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Abstract Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-500/10 blur-[150px] pointer-events-none" />

      <header className="relative z-10 text-center pt-32 md:pt-24 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md lg:mt-0 mt-6"
        >
          <span className="text-xs font-semibold tracking-widest text-slate-300 uppercase">Weddings & Corporate</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-tight"
        >
          Elevate Your Event <br className="hidden md:block" />
          <span className="text-pink-400">with Rainfresh.</span>
        </motion.h1>
      </header>

      {/* Offerings */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-14 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 text-pink-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Weddings</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Make your special day unforgettable with personalized scents. We offer fully customized labels to match your wedding theme, creating a unique and memorable gift for your guests.
            </p>
            <ul className="text-slate-400 space-y-2 text-sm text-left w-full max-w-xs mx-auto">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-3" /> Bespoke label design</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-3" /> Choice of signature scents</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-pink-400 mr-3" /> Elegant packaging options</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-14 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-8">
              <ShoppingBag className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Corporate Events</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Leave a lasting impression on clients and partners. We provide exclusive bulk pricing and corporate branding options for events, retreats, and client appreciation gifts.
            </p>
            <ul className="text-slate-400 space-y-2 text-sm text-left w-full max-w-xs mx-auto">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" /> Tiered bulk pricing</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" /> Corporate logo integration</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3" /> Dedicated account manager</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-3xl p-8 md:p-20 backdrop-blur-xl"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6">Ready to Create Something Special?</h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
            Reach out to us directly on Instagram to discuss your event needs, request samples, or get a custom quote.
          </p>
          <a
            href="https://www.instagram.com/rainfreshsg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-bold text-lg tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:-translate-y-1"
          >
            Enquire via Instagram DM
          </a>
        </motion.div>
      </section>
    </div>
  );
}

export default function App() {
  useGlobalClickSound();

  return (
    <BrowserRouter>
      <div className="relative z-0 min-h-screen bg-white">
        <RainEffect />
        <AmbientAudio />
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/scent-guide" element={<ScentGuidePage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/collections/:slug" element={<CollectionGallery />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
