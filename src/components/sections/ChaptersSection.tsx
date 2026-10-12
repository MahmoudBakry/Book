import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, MapPin, Globe, CheckCircle } from 'lucide-react';
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

      // 2. Slow-Speed Editorial Image Parallax (Image moves at subtle distinct velocity inside frame)
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
              scrub: 1.2, // Smooth slow-speed parallax lag
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
        { opacity: 0.6, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' }
      );
      gsap.fromTo(
        textPanelRef.current.querySelectorAll('.chapter-text-anim'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
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
      className="relative w-full bg-[#181311] text-[#F7F2EA] py-24 md:py-36 overflow-hidden border-t border-[#B99A61]/20"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 20%, rgba(75, 55, 50, 0.25) 0%, rgba(24, 19, 17, 0.95) 60%, #140F0D 100%)',
      }}
    >
      {/* Decorative Atelier Haute Couture Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="400" r="300" stroke="#B99A61" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="1200" cy="600" r="400" stroke="#B99A61" strokeWidth="0.5" strokeDasharray="3 6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: HIGH-FASHION EDITORIAL CREST */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <div className="header-reveal inline-flex items-center gap-2 mb-4 text-xs font-editorial-serif tracking-[0.28em] text-[#B99A61] uppercase">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
            <span className="font-arabic-display">{content.chaptersShowcase.eyebrow}</span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
          </div>

          <h2 className="header-reveal text-3xl sm:text-5xl md:text-6xl font-black font-arabic-display tracking-tight text-[#F7F2EA] leading-[1.18] mb-4 text-depth-arabic-title">
            {content.chaptersShowcase.mainHeadline}
          </h2>

          <p className="header-reveal text-sm sm:text-base md:text-lg text-[#E5DED1]/85 leading-relaxed max-w-2xl mx-auto">
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
                  className={`group px-3.5 sm:px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2.5 text-xs sm:text-sm font-medium ${
                    isActive
                      ? 'bg-[#B99A61] text-[#140F0D] font-bold shadow-lg shadow-[#B99A61]/25 scale-105'
                      : 'bg-[#241D1A]/70 text-[#D8BF8A]/80 hover:text-white border border-[#B99A61]/20 hover:border-[#B99A61]/50'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className={`font-editorial-serif font-bold ${isActive ? 'text-[#140F0D]' : 'text-[#B99A61]'}`}>
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

        {/* MAIN EDITORIAL CHAPTER SHOWCASE (MAGAZINE SPREAD COMPOSITION) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-gradient-to-br from-[#241D1A]/90 via-[#1C1614]/95 to-[#15100E] border border-[#B99A61]/35 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* GIGANTIC WATERMARK CHAPTER NUMBER */}
          <div
            className="absolute -top-12 -start-10 text-[180px] sm:text-[240px] md:text-[320px] font-editorial-serif font-black text-[#B99A61]/[0.04] pointer-events-none select-none leading-none z-0"
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
                <span className="px-3 py-1 rounded-full bg-[#B99A61]/15 border border-[#B99A61]/40 text-[#D8BF8A] text-xs font-editorial-serif font-bold tracking-widest uppercase">
                  {isRtl ? `الفصل ${currentChapter.number}` : `CHAPTER ${currentChapter.number}`}
                </span>
                <span className="text-xs text-[#B99A61] font-arabic-display font-medium">
                  {currentChapter.tag}
                </span>
              </div>

              {/* Main Chapter Title */}
              <h3 className="chapter-text-anim text-2xl sm:text-4xl md:text-5xl font-bold font-arabic-display text-white leading-tight mb-3 text-depth-arabic-title">
                {currentChapter.title}
              </h3>

              {/* Subtitle / Provocative Core Question */}
              <p className="chapter-text-anim text-base sm:text-xl font-arabic-calligraphy text-[#D8BF8A] mb-6 leading-relaxed text-depth-arabic-calligraphy">
                "{currentChapter.subtitle}"
              </p>

              {/* Detailed Chapter Blueprint Description */}
              <p className="chapter-text-anim text-sm sm:text-base md:text-lg text-[#E5DED1]/90 leading-relaxed font-light mb-6">
                {currentChapter.description}
              </p>

              {/* Atelier Key Takeaways Box */}
              <div className="chapter-text-anim p-4 sm:p-5 rounded-2xl bg-[#171210]/80 border border-[#B99A61]/25 flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-[#B99A61] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#F7F2EA]/90 leading-relaxed font-arabic-display">
                  <span className="text-[#D8BF8A] font-semibold block mb-0.5">
                    {isRtl ? 'الأثر العملي لمشروعك:' : 'Practical Venture Impact:'}
                  </span>
                  {isRtl
                    ? 'خطوات منهجية عملية ومجربة تمنع الهدر المالي وتختصر سنوات من التجربة والخطأ في السوق الكويتي والخليجي.'
                    : 'Systematic frameworks preventing capital misallocation, shaving years off trial-and-error in regional fashion business.'}
                </div>
              </div>
            </div>

            {/* Pagination Controls & Chapter Progress Bar */}
            <div className="pt-6 border-t border-[#B99A61]/20 flex items-center justify-between">
              {/* Stepper info */}
              <div className="flex items-center gap-3">
                <span className="font-editorial-serif text-lg font-bold text-[#F7F2EA]">
                  {currentChapter.number}
                </span>
                <div className="w-24 sm:w-36 h-1 bg-[#2E2420] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D8BF8A] to-[#B99A61] transition-all duration-300"
                    style={{ width: `${((activeChapterIndex + 1) / chaptersData.length) * 100}%` }}
                  />
                </div>
                <span className="font-editorial-serif text-xs text-[#8C7243]">
                  07
                </span>
              </div>

              {/* Interactive Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-[#1F1815] border border-[#B99A61]/30 text-[#D8BF8A] hover:text-white hover:border-[#B99A61] transition-all duration-200"
                  aria-label="Previous Chapter"
                >
                  <ArrowRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-[#B99A61] text-[#140F0D] hover:bg-[#D8BF8A] transition-all duration-200 shadow-md"
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
            className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[520px] lg:max-h-none border border-[#B99A61]/40 shadow-2xl z-10 order-1 lg:order-2 group"
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
              /* Resilient CSS Fallback Container */
              <div
                className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                style={{
                  background: 'linear-gradient(135deg, #2D231F 0%, #1A1412 100%)',
                }}
              >
                <BookOpen className="w-12 h-12 text-[#B99A61] mb-4" />
                <span className="font-editorial-serif text-3xl font-bold text-[#F7F2EA] mb-2">
                  {currentChapter.number}
                </span>
                <span className="font-arabic-display text-lg text-[#D8BF8A]">
                  {currentChapter.title}
                </span>
              </div>
            )}

            {/* Gradient Scrim for Legibility & Fashion Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(20, 15, 13, 0.85) 0%, rgba(20, 15, 13, 0.2) 40%, transparent 80%)',
              }}
            />

            {/* Corner Editorial Stamp */}
            <div className="absolute top-4 end-4 px-3 py-1.5 rounded-full bg-[#181311]/80 backdrop-blur-md border border-[#B99A61]/50 text-[10px] font-editorial-serif tracking-widest text-[#D8BF8A] uppercase">
              Munira Alharbi Atelier
            </div>

            {/* Bottom Floating Visual Caption */}
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#1C1614]/90 backdrop-blur-md border border-[#B99A61]/30">
              <span className="text-[10px] font-editorial-serif tracking-widest uppercase text-[#B99A61] block mb-0.5">
                {isRtl ? 'محور تطبيقي معتمد' : 'CURATED PRACTICAL PILLAR'}
              </span>
              <span className="text-xs sm:text-sm font-arabic-display font-medium text-white truncate block">
                {currentChapter.title} — {currentChapter.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* 4. BONUS CONTENT: SUPPLIER DIRECTORY CONCLUDING HIGHLIGHT */}
        <div
          ref={directoryRef}
          className="mt-14 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#291F1A] via-[#221915] to-[#1A1412] border border-[#B99A61]/50 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gold shimmer top line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B99A61] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 8 Cols: Directory Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B99A61]/20 border border-[#B99A61]/60 text-[#F5DFB5] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#B99A61]" />
                <span className="font-arabic-display">{supplierDir.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold font-arabic-display text-white text-depth-arabic-title">
                {supplierDir.title}
              </h3>

              <div className="flex items-center gap-2 text-sm sm:text-base font-editorial-serif tracking-widest text-[#D8BF8A]">
                <Globe className="w-4 h-4 text-[#B99A61]" />
                <span>{supplierDir.subtitle}</span>
              </div>

              <p className="text-sm sm:text-base text-[#E5DED1]/90 leading-relaxed max-w-2xl font-light">
                {supplierDir.description}
              </p>

              {/* Markets pills (clean unboxed metadata) */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#D8BF8A]">
                {supplierDir.markets.map((market, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A61]" />
                    <span className="font-arabic-display font-semibold">{market}</span>
                    {idx < supplierDir.markets.length - 1 && (
                      <span className="text-[#B99A61]/40 ms-3 select-none">·</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: CTA Action Dock */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-[#B99A61]/20">
              <div className="text-center lg:text-end mb-4">
                <span className="text-xs text-[#B99A61] block mb-1">
                  {isRtl ? 'متوفر ضمن محتوى الدليل الرقمي' : 'Included with your digital access'}
                </span>
                <span className="text-xl font-bold font-editorial-serif text-white">
                  9 {isRtl ? 'د.ك' : 'KWD'} {isRtl ? 'فقط' : 'only'}
                </span>
              </div>

              <CTAButton
                variant="primary"
                size="lg"
                onClick={handleCtaClick}
                isRtl={isRtl}
                className="w-full sm:w-auto text-sm px-8 py-3.5"
              >
                {content.chaptersShowcase.ctaButtonText}
              </CTAButton>

              <span className="text-[11px] text-[#D8BF8A]/70 mt-2 text-center lg:text-end block">
                {content.chaptersShowcase.ctaSubtext}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
