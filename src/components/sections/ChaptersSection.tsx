import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { CTAButton } from '../ui/CTAButton';
import { trackEvent } from '../../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

interface ChaptersSectionProps {
  onOpenPreorder: () => void;
}

export const ChaptersSection: React.FC<ChaptersSectionProps> = ({ onOpenPreorder }) => {
  const { content, isRtl, language } = useLanguage();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualPanelRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLImageElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);

  const chaptersData = content.chaptersShowcase.chapters;
  const currentChapter = chaptersData[activeChapterIndex] || chaptersData[0];
  const supplierDir = content.chaptersShowcase.supplierDirectory;

  // Header entrance animation & Slow-Speed Image Parallax with ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.header-reveal'),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Slow-Speed Editorial Image Parallax
      if (imageParallaxRef.current && visualPanelRef.current) {
        gsap.fromTo(
          imageParallaxRef.current,
          { y: -30 },
          {
            y: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: visualPanelRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Directory card reveal
      if (directoryRef.current) {
        gsap.fromTo(
          directoryRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: directoryRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [language, activeChapterIndex]);

  // Transition animation when active chapter changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (visualPanelRef.current && textPanelRef.current) {
      gsap.fromTo(
        visualPanelRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        textPanelRef.current.querySelectorAll('.chapter-text-anim'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
      );
    }
  }, [activeChapterIndex]);

  const handleNext = () => {
    setActiveChapterIndex((prev) => (prev < chaptersData.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveChapterIndex((prev) => (prev > 0 ? prev - 1 : chaptersData.length - 1));
  };

  const handleCtaClick = () => {
    trackEvent('select_buy_cta', { source: 'chapters_section_cta' });
    onOpenPreorder();
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
      id="chapters"
      className="relative w-full py-24 md:py-36 overflow-hidden border-t border-slate-200/80 transition-colors duration-700"
      style={{
        background: `
          radial-gradient(ellipse 90% 70% at 50% 10%, #FFFFFF 0%, #FAFAFC 45%, #F4F5F8 85%, #EDEDF2 100%)
        `,
      }}
    >
      {/* OVERHEAD AMBIENT STUDIO LIGHT RADIANCE */}
      <div
        className="absolute top-0 inset-x-0 h-[450px] pointer-events-none select-none z-0"
        style={{
          background: 'radial-gradient(ellipse 85% 60% at 50% 0%, rgba(212, 175, 55, 0.16) 0%, rgba(240, 220, 180, 0.06) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative Atelier Haute Couture Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-15 select-none z-0" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="400" r="300" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="1200" cy="600" r="400" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: HIGH-CONTRAST MODERN EDITORIAL CREST */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <div className="header-reveal inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-white/80 border border-slate-200/80 shadow-sm text-xs font-editorial-serif tracking-[0.25em] text-[#B8860B] uppercase">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
            <span className="font-arabic-display font-semibold">{content.chaptersShowcase.eyebrow}</span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
          </div>

          <h2 className="header-reveal text-3xl sm:text-5xl md:text-6xl font-black font-arabic-display tracking-tight text-[#09090B] leading-[1.18] mb-4">
            {content.chaptersShowcase.mainHeadline}
          </h2>

          <p className="header-reveal text-sm sm:text-base md:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto font-light">
            {content.chaptersShowcase.supportingDescription}
          </p>
        </div>

        {/* CHAPTERS NAVIGATION TRACK (HORIZONTAL EDITORIAL DOCK) */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-2 md:gap-3 min-w-max mx-auto justify-center px-2">
            {chaptersData.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`group px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2.5 text-xs sm:text-sm font-medium ${
                    isActive
                      ? 'bg-[#09090B] text-white font-bold shadow-xl shadow-black/20 scale-105 border border-[#09090B]'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-black border border-slate-200/80 shadow-sm'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className={`font-editorial-serif font-bold ${isActive ? 'text-[#F3DEB2]' : 'text-[#B8860B]'}`}>
                    {ch.number}
                  </span>
                  <span className="font-arabic-display whitespace-nowrap">
                    {ch.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN EDITORIAL CHAPTER SHOWCASE (Modern Crystal Glass Magazine Spread) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch glass-panel-light border border-slate-200/80 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
          
          {/* GIGANTIC WATERMARK CHAPTER NUMBER */}
          <div
            className="absolute -top-12 -start-10 text-[180px] sm:text-[240px] md:text-[320px] font-editorial-serif font-black text-slate-900/[0.03] pointer-events-none select-none leading-none z-0"
            aria-hidden="true"
          >
            {currentChapter.number}
          </div>

          {/* LEFT: TEXT CONTENT & CHAPTER EDITORIAL CURATION */}
          <div
            ref={textPanelRef}
            className="lg:col-span-7 flex flex-col justify-between z-10 space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            <div>
              {/* Category Kicker & Index */}
              <div className="chapter-text-anim flex items-center gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#09090B] text-xs font-editorial-serif font-bold tracking-widest uppercase shadow-sm">
                  {isRtl ? `الفصل ${currentChapter.number}` : `CHAPTER ${currentChapter.number}`}
                </span>
                <span className="text-xs text-[#B8860B] font-arabic-display font-semibold">
                  {currentChapter.tag}
                </span>
              </div>

              {/* Main Chapter Title in Jet Black */}
              <h3 className="chapter-text-anim text-2xl sm:text-4xl md:text-5xl font-bold font-arabic-display text-[#09090B] leading-tight mb-3">
                {currentChapter.title}
              </h3>

              {/* Subtitle in Warm Gold Calligraphy */}
              <p className="chapter-text-anim text-base sm:text-xl font-arabic-calligraphy text-[#B8860B] mb-6 leading-relaxed">
                "{currentChapter.subtitle}"
              </p>

              {/* Detailed Chapter Blueprint Description */}
              <p className="chapter-text-anim text-sm sm:text-base md:text-lg text-[#4B5563] leading-relaxed font-light mb-6">
                {currentChapter.description}
              </p>

              {/* Atelier Key Takeaways Box (Modern White Porcelain & Amber Accent) */}
              <div className="chapter-text-anim p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-[#FCFAF7] to-[#F7F2EA] border border-[#D4AF37]/35 flex items-start gap-3.5 shadow-sm">
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-arabic-display">
                  <span className="text-[#B8860B] font-bold block mb-0.5">
                    {isRtl ? 'الأثر العملي لمشروعك:' : 'Practical Venture Impact:'}
                  </span>
                  {isRtl
                    ? 'خطوات منهجية عملية ومجربة تمنع الهدر المالي وتختصر سنوات من التجربة والخطأ في السوق الكويتي والخليجي.'
                    : 'Systematic frameworks preventing capital misallocation, shaving years off trial-and-error in regional fashion business.'}
                </div>
              </div>
            </div>

            {/* Pagination Controls & Chapter Progress Bar */}
            <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
              {/* Stepper info */}
              <div className="flex items-center gap-3">
                <span className="font-editorial-serif text-lg font-bold text-[#09090B]">
                  {currentChapter.number}
                </span>
                <div className="w-24 sm:w-36 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F3DEB2] via-[#D4AF37] to-[#B8860B] transition-all duration-300"
                    style={{ width: `${((activeChapterIndex + 1) / chaptersData.length) * 100}%` }}
                  />
                </div>
                <span className="font-editorial-serif text-xs text-slate-400 font-bold">
                  07
                </span>
              </div>

              {/* Interactive Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#09090B] hover:border-slate-400 transition-all duration-200 shadow-sm"
                  aria-label="Previous Chapter"
                >
                  <ArrowRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gradient-to-r from-[#F3DEB2] via-[#D4AF37] to-[#B8860B] text-[#0A0A0C] hover:shadow-md transition-all duration-200 glow-aura-warm"
                  aria-label="Next Chapter"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: EDITORIAL FASHION PHOTOGRAPHY VISUAL */}
          <div
            ref={visualPanelRef}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[520px] lg:max-h-none border border-slate-200/80 shadow-xl z-10 order-1 lg:order-2 group bg-slate-100"
          >
            {/* High-Fidelity Fashion Visual Image */}
            {!imageErrorMap[currentChapter.id] ? (
              <img
                ref={imageParallaxRef}
                src={currentChapter.image}
                alt={currentChapter.title}
                onError={() => handleImageError(currentChapter.id)}
                referrerPolicy="no-referrer"
                className="w-full h-[116%] -top-[8%] relative object-cover object-center will-change-transform transition-[scale] duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              /* Resilient Fallback Container */
              <div
                className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 to-slate-200"
              >
                <BookOpen className="w-12 h-12 text-[#D4AF37] mb-4" />
                <span className="font-editorial-serif text-3xl font-bold text-[#09090B] mb-2">
                  {currentChapter.number}
                </span>
                <span className="font-arabic-display text-lg text-[#B8860B]">
                  {currentChapter.title}
                </span>
              </div>
            )}

            {/* Gradient Scrim for Legibility & Fashion Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(9, 9, 11, 0.75) 0%, rgba(9, 9, 11, 0.1) 40%, transparent 80%)',
              }}
            />

            {/* Corner Editorial Stamp */}
            <div className="absolute top-4 end-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-editorial-serif tracking-widest text-[#09090B] uppercase font-bold shadow-md">
              Munira Alharbi Atelier
            </div>

            {/* Bottom Floating Visual Caption */}
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl glass-panel-light border border-white/90 shadow-lg">
              <span className="text-[10px] font-editorial-serif tracking-widest uppercase text-[#B8860B] block mb-0.5 font-bold">
                {isRtl ? 'محور تطبيقي معتمد' : 'CURATED PRACTICAL PILLAR'}
              </span>
              <span className="text-xs sm:text-sm font-arabic-display font-semibold text-[#09090B] truncate block">
                {currentChapter.title} — {currentChapter.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* 4. BONUS CONTENT: SUPPLIER DIRECTORY CONCLUDING HIGHLIGHT (Modern Crisp Ivory & Alabaster Spread) */}
        <div
          ref={directoryRef}
          className="mt-14 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white via-[#FCFAF8] to-[#F5F2EC] border border-slate-200/90 shadow-[0_25px_60px_-12px_rgba(212,175,55,0.18)] relative overflow-hidden"
        >
          {/* Subtle gold shimmer top line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 8 Cols: Directory Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#B8860B] text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-arabic-display">{supplierDir.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold font-arabic-display text-[#09090B]">
                {supplierDir.title}
              </h3>

              <div className="flex items-center gap-2 text-sm sm:text-base font-editorial-serif tracking-widest text-[#B8860B] font-semibold">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>{supplierDir.subtitle}</span>
              </div>

              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl font-light">
                {supplierDir.description}
              </p>

              {/* Markets pills (clean modern metadata) */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-800">
                {supplierDir.markets.map((market, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-arabic-display font-bold text-slate-800">{market}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: CTA Action Dock */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200/80">
              <div className="text-center lg:text-end mb-4">
                <span className="text-xs text-slate-500 block mb-1 font-medium">
                  {isRtl ? 'متوفر ضمن محتوى الدليل الرقمي' : 'Included with your digital access'}
                </span>
                <span className="text-2xl font-bold font-editorial-serif text-[#09090B]">
                  9 {isRtl ? 'د.ك' : 'KWD'} {isRtl ? 'فقط' : 'only'}
                </span>
              </div>

              <CTAButton
                variant="primary"
                size="lg"
                onClick={handleCtaClick}
                isRtl={isRtl}
                className="w-full sm:w-auto text-sm px-8 py-3.5 glow-aura-warm"
              >
                {content.chaptersShowcase.ctaButtonText}
              </CTAButton>

              <span className="text-[11px] text-slate-500 mt-2 text-center lg:text-end block font-medium">
                {content.chaptersShowcase.ctaSubtext}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
