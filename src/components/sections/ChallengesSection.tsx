import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  ArrowDown,
  TrendingUp,
  Store,
  Layers,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export const ChallengesSection: React.FC = () => {
  const { content, isRtl, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | '01' | '02' | '03'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: number]: { x: number; y: number } }>({});

  const sectionRef = useRef<HTMLElement>(null);
  const transitionBridgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const challenges = content.challenges.items;

  // Handle card mouse spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos((prev) => ({
      ...prev,
      [index]: { x, y },
    }));
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Seamless Bridge Ambient Entrance
      if (transitionBridgeRef.current) {
        gsap.fromTo(
          transitionBridgeRef.current.querySelectorAll('.bridge-elem'),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: transitionBridgeRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Main Editorial Headline Stagger Reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll('.reveal-elem'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Ultra-Modern Cards 3D Entrance Reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.challenge-card-item');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section
      ref={sectionRef}
      id="about-guide"
      className="relative w-full -mt-2 sm:-mt-4 pt-0 pb-28 md:pb-40 overflow-hidden transition-colors duration-700"
      style={{
        background: `
          radial-gradient(ellipse 100% 60% at 50% 12%, #FFFFFF 0%, #FAF9F6 40%, #F5F3EF 75%, #EEEAE2 100%)
        `,
      }}
    >
      {/* 
        ========================================================================
        SEAMLESS INTERLOCKING TRANSITION FROM HERO (سايحين على بعض ومتداخلين)
        Deep organic atmospheric gradient bleed without any hard line or border
        ========================================================================
      */}
      <div className="relative w-full overflow-hidden pointer-events-none select-none z-10">
        {/* Layer 1: Atmospheric dark dissolve extending directly from Hero (#1B1513) */}
        <div
          className="w-full h-44 sm:h-56 md:h-72"
          style={{
            background: `
              linear-gradient(180deg, 
                #1B1513 0%, 
                rgba(27, 21, 19, 0.96) 25%, 
                rgba(27, 21, 19, 0.75) 50%, 
                rgba(27, 21, 19, 0.35) 75%, 
                rgba(27, 21, 19, 0.0) 100%
              )
            `,
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Radiant Golden Ambient Glow Beam at the exact intersection */}
        <div
          className="absolute -top-12 inset-x-0 h-64 md:h-80 mx-auto max-w-4xl opacity-75 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.12) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* Layer 3: Flowing Couture Atelier Silk Threads intertwining the two sections */}
        <div className="absolute top-0 inset-x-0 h-64 opacity-35" aria-hidden="true">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 280"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M -100 20 C 350 140, 750 -40, 1540 120"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <path
              d="M 50 200 C 450 60, 950 240, 1500 40"
              stroke="#C29B38"
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* 
        ========================================================================
        INTERLOCKING TRANSITION BRIDGE BADGE (المحور الانتقالي)
        Physically bridges the dark Hero tone and the luminous Challenges tone
        ========================================================================
      */}
      <div
        ref={transitionBridgeRef}
        className="relative z-20 -mt-20 sm:-mt-24 md:-mt-28 mb-12 sm:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="bridge-elem inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#181311]/90 border border-[#D4AF37]/50 shadow-[0_15px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <span className="w-2 h-2 rotate-45 bg-[#D4AF37] animate-pulse" />
          <span className="text-xs sm:text-sm font-arabic-display tracking-wide text-[#F5DFB3] font-medium">
            {isRtl ? 'المحطة الثانية: تفكيك تحديات السوق' : 'Phase 02: Deconstructing Industry Realities'}
          </span>
          <span className="w-2 h-2 rotate-45 bg-[#D4AF37] animate-pulse" />
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: HIGH-CONTRAST MONUMENTAL EDITORIAL */}
        <div ref={headlineRef} className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          {/* Section Eyebrow */}
          <div className="reveal-elem inline-flex items-center gap-2.5 mb-4 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-sm text-xs font-editorial-serif tracking-[0.25em] text-[#B8860B] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="font-arabic-display font-bold">{content.challenges.eyebrow}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </div>

          {/* Monumental Headline in Pure Jet Obsidian */}
          <h2 className="reveal-elem text-3xl sm:text-5xl md:text-6xl font-black font-arabic-display tracking-tight text-[#09090B] leading-[1.18] mb-4">
            {content.challenges.mainHeadline}
          </h2>

          {/* Supporting Headline in Warm Radiant Calligraphy */}
          <p className="reveal-elem text-xl sm:text-2xl md:text-3xl font-arabic-calligraphy text-[#B8860B] mb-5">
            "{content.challenges.supportingHeadline}"
          </p>

          {/* Intro Prose in Crisp Slate */}
          <p className="reveal-elem text-sm sm:text-base md:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto font-light">
            {content.challenges.introText}
          </p>

          {/* Interactive Modern Pill Filter Controls */}
          <div className="reveal-elem flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-arabic-display font-medium transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-[#09090B] text-white shadow-lg shadow-black/15 scale-105'
                  : 'bg-white/80 text-slate-600 hover:text-black hover:bg-white border border-slate-200/80 shadow-sm'
              }`}
            >
              {isRtl ? 'جميع التحديات الثلاثة' : 'All Three Challenges'}
            </button>
            {challenges.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveFilter(ch.number as '01' | '02' | '03')}
                className={`px-4 py-1.5 rounded-full text-xs font-arabic-display font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  activeFilter === ch.number
                    ? 'bg-[#09090B] text-[#F3DEB2] shadow-lg shadow-black/15 scale-105 border border-[#D4AF37]/50'
                    : 'bg-white/80 text-slate-600 hover:text-black hover:bg-white border border-slate-200/80 shadow-sm'
                }`}
              >
                <span className="font-editorial-serif font-bold text-[11px] text-[#B8860B]">
                  {ch.number}
                </span>
                <span>{ch.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 
          ========================================================================
          ULTRA-MODERN 3-CARD EDITORIAL SHOWCASE
          Architectural Crystal Glass Cards with Interactive Mouse Spotlight
          ========================================================================
        */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {challenges.map((ch, idx) => {
            const isVisible = activeFilter === 'all' || activeFilter === ch.number;
            const isHovered = hoveredCard === idx;
            const pos = mousePos[idx] || { x: 0, y: 0 };

            if (!isVisible) return null;

            return (
              <div
                key={ch.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                className={`challenge-card-item group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-500 overflow-hidden cursor-default ${
                  isHovered
                    ? '-translate-y-2 shadow-[0_30px_60px_-15px_rgba(212,175,55,0.22)] border-[#D4AF37]/60'
                    : 'shadow-[0_20px_45px_-12px_rgba(15,23,42,0.08)] border-white/90 hover:border-slate-300'
                } bg-white/85 backdrop-blur-2xl border`}
                style={{
                  background: isHovered
                    ? `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.98), rgba(250,248,244,0.92))`
                    : 'rgba(255, 255, 255, 0.88)',
                }}
              >
                {/* Luminous Mouse-Follow Ambient Spotlight Glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(212, 175, 55, 0.18), transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Oversized Background Watermark Numeral */}
                <div
                  className="absolute -bottom-6 -right-4 font-editorial-serif font-black text-[120px] text-slate-900/[0.03] select-none pointer-events-none leading-none transition-transform duration-700 group-hover:scale-110 group-hover:text-[#D4AF37]/[0.06]"
                  aria-hidden="true"
                >
                  {ch.number}
                </div>

                {/* TOP ROW: Badge, Category, and Index */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#09090B] text-white flex items-center justify-center font-editorial-serif font-bold text-sm shadow-md shadow-black/15 group-hover:bg-[#D4AF37] group-hover:text-[#09090B] transition-colors duration-300">
                        {ch.number}
                      </div>
                      <span className="text-xs font-arabic-display font-semibold text-[#B8860B] tracking-wide">
                        {ch.category}
                      </span>
                    </div>

                    {/* Micro-Icon */}
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#B8860B] group-hover:border-[#D4AF37]/40 transition-colors">
                      {idx === 0 && <DollarSign className="w-4 h-4" />}
                      {idx === 1 && <Layers className="w-4 h-4" />}
                      {idx === 2 && <Store className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Primary Question (The Core Pain Point) */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-arabic-display text-[#09090B] leading-snug mb-4 group-hover:text-black transition-colors">
                    "{ch.question}"
                  </h3>

                  {/* Supporting Dilemma Copy */}
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6 font-light">
                    {ch.supporting}
                  </p>
                </div>

                {/* 
                  ==============================================================
                  INTERACTIVE BESPOKE MICRO-WIDGET FOR EACH CHALLENGE
                  Provides tangible, domain-specific visual richness
                  ==============================================================
                */}
                <div className="my-2 space-y-4">
                  {/* Card 01: Pricing Architecture Breakdown */}
                  {idx === 0 && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-[#FAF6EE] border border-slate-200/90 shadow-inner">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                        <span className="font-arabic-display">{isRtl ? 'هيكلة السعر الاحترافي' : 'Pricing Architecture'}</span>
                        <span className="text-[#B8860B] font-editorial-serif font-bold">100% Value</span>
                      </div>
                      {/* Visual Formula Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden flex mb-2.5">
                        <div className="bg-[#09090B] h-full w-[35%]" title="Materials 35%" />
                        <div className="bg-[#B8860B] h-full w-[25%]" title="Craftsmanship 25%" />
                        <div className="bg-[#D4AF37] h-full w-[40%]" title="Brand Equity & Margin 40%" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{isRtl ? 'خامات (35%)' : 'Fabrics'}</span>
                        <span>{isRtl ? 'قص وتنفيذ (25%)' : 'Craft'}</span>
                        <span className="font-bold text-[#09090B]">{isRtl ? 'هامش ربح (40%)' : 'Margin'}</span>
                      </div>
                    </div>
                  )}

                  {/* Card 02: Supplier & Fabric Sourcing Verification */}
                  {idx === 1 && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-[#FAF6EE] border border-slate-200/90 shadow-inner">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                        <span className="font-arabic-display">{isRtl ? 'معايير اختيار الموردين' : 'Supplier Verification'}</span>
                        <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white border border-slate-200/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{isRtl ? 'فحص عيّنات الأقمشة' : 'Fabric Swatch Test'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white border border-slate-200/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{isRtl ? 'اعتماد خياطة المشغل' : 'Atelier Stitch QC'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 03: Business Model Compass (Online vs Studio) */}
                  {idx === 2 && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-[#FAF6EE] border border-slate-200/90 shadow-inner">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                        <span className="font-arabic-display">{isRtl ? 'مصفوفة القرار الاستراتيجي' : 'Strategic Model Matrix'}</span>
                        <Compass className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <div className="flex-1 text-center p-2 rounded-lg bg-white border border-slate-200/80">
                          <span className="block font-bold text-[#09090B] mb-0.5">{isRtl ? 'أونلاين' : 'Online'}</span>
                          <span className="text-slate-500 text-[10px]">{isRtl ? 'مرونة وتكلفة أقل' : 'Lean & Agile'}</span>
                        </div>
                        <span className="text-slate-400 font-bold">vs</span>
                        <div className="flex-1 text-center p-2 rounded-lg bg-white border border-slate-200/80">
                          <span className="block font-bold text-[#09090B] mb-0.5">{isRtl ? 'أتيليه' : 'Atelier'}</span>
                          <span className="text-slate-500 text-[10px]">{isRtl ? 'تجربة حية وهيبة' : 'Prestige Experience'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Field Reality Insight Badge ("الواقع الميداني في السوق") */}
                  {ch.detailNote && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#D4AF37]/30 shadow-sm relative overflow-hidden">
                      <div className="flex items-center gap-1.5 mb-1.5 text-[#B8860B]">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-xs font-bold font-arabic-display">
                          {isRtl ? 'الحقيقة من واقع السوق' : 'Field Reality Insight'}
                        </span>
                      </div>
                      <p className="text-xs text-[#4B5563] leading-relaxed">
                        {ch.detailNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* BOTTOM FOOTER: Atelier Assurance Link */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-editorial-serif tracking-wider font-medium">
                    Atelier Munira · Case #{ch.number}
                  </span>
                  <button
                    onClick={() => {
                      document.getElementById('book-preview')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-[#09090B] group-hover:text-[#B8860B] transition-colors"
                  >
                    <span>{isRtl ? 'الحل داخل الدليل' : 'Solution in Guide'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
