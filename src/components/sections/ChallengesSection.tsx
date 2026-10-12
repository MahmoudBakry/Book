import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, ArrowDown, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export const ChallengesSection: React.FC = () => {
  const { content, isRtl, language } = useLanguage();
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const circularRingRef = useRef<SVGCircleElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  const challenges = content.challenges.items;
  const currentChallenge = challenges[activeChallengeIndex] || challenges[0];

  // SVG Circular Gauge calculation
  const circleRadius = 26;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - scrollProgress * circumference;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Entrance Reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll('.reveal-elem'),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Scroll-Linked Progress Indicator linked to Challenges Container
      if (scrollTrackRef.current) {
        ScrollTrigger.create({
          trigger: scrollTrackRef.current,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);

            // Determine active challenge index (0, 1, or 2) with smooth thresholds
            let targetIdx = 0;
            if (p >= 0.66) {
              targetIdx = 2;
            } else if (p >= 0.33) {
              targetIdx = 1;
            } else {
              targetIdx = 0;
            }
            setActiveChallengeIndex(targetIdx);

            // Directly animate the linear progress bar for 60fps compositor smoothness
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleY: p, transformOrigin: 'top center' });
            }

            // Animate circular SVG gauge offset
            if (circularRingRef.current) {
              const currentOffset = circumference - p * circumference;
              gsap.set(circularRingRef.current, { strokeDashoffset: currentOffset });
            }
          },
        });
      }

      // 3. Closing Statement Reveal
      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current.querySelectorAll('.closing-reveal'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: closingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [language, circumference]);

  const handleManualSelect = (idx: number) => {
    setActiveChallengeIndex(idx);
    const targetProgress = (idx + 0.5) / challenges.length;
    setScrollProgress(targetProgress);
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, { scaleY: targetProgress, duration: 0.3 });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-guide"
      className="relative w-full bg-gradient-to-b from-[#181311] via-[#201916] to-[#171210] text-[#F7F2EA] py-24 md:py-32 overflow-hidden border-t border-[#B99A61]/15"
    >
      {/* ATELIER BACKGROUND PATTERN & DRAFTING CURVES */}
      <div className="absolute inset-0 pointer-events-none opacity-25 select-none" aria-hidden="true">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="draftLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B99A61" stopOpacity="0" />
              <stop offset="50%" stopColor="#D8BF8A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B99A61" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M -100 200 C 400 350, 700 150, 1500 400"
            stroke="url(#draftLineGrad)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M 100 900 C 500 700, 900 950, 1600 750"
            stroke="url(#draftLineGrad)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: HIGH-IMPACT EDITORIAL TYPOGRAPHY */}
        <div ref={headlineRef} className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          {/* Eyebrow */}
          <div className="reveal-elem inline-flex items-center gap-2 mb-4 text-xs font-editorial-serif tracking-[0.28em] text-[#B99A61] uppercase">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
            <span className="font-arabic-display">{content.challenges.eyebrow}</span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
          </div>

          {/* Monumental Headline */}
          <h2 className="reveal-elem text-3xl sm:text-5xl md:text-6xl font-black font-arabic-display tracking-tight text-[#F7F2EA] leading-[1.18] mb-4 text-depth-arabic-title">
            {content.challenges.mainHeadline}
          </h2>

          {/* Supporting Headline */}
          <p className="reveal-elem text-xl sm:text-2xl md:text-3xl font-arabic-calligraphy text-[#D8BF8A] mb-6 text-depth-arabic-calligraphy">
            {content.challenges.supportingHeadline}
          </p>

          {/* Intro Prose */}
          <p className="reveal-elem text-sm sm:text-base md:text-lg text-[#E5DED1]/85 leading-relaxed max-w-2xl mx-auto">
            {content.challenges.introText}
          </p>
        </div>

        {/* SCROLL-LINKED PROGRESS INDICATOR STRIP (Sticky & Prominent) */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12 flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#241D1A]/80 border border-[#B99A61]/30 backdrop-blur-md shadow-xl">
          
          {/* Left: Interactive Circular Counter with SVG Stroke Progress */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 64 64">
                {/* Background Track */}
                <circle
                  cx="32"
                  cy="32"
                  r={circleRadius}
                  stroke="rgba(185, 154, 97, 0.2)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Animated Scroll Progress Ring */}
                <circle
                  ref={circularRingRef}
                  cx="32"
                  cy="32"
                  r={circleRadius}
                  stroke="#B99A61"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  className="transition-[stroke-dashoffset] duration-75"
                />
              </svg>
              {/* Center Display Number */}
              <span className="absolute font-editorial-serif font-extrabold text-sm sm:text-base text-[#F7F2EA]">
                {currentChallenge.number}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-editorial-serif tracking-widest text-[#B99A61] uppercase block">
                {isRtl ? 'مؤشر التقدم في التحديات' : 'CHALLENGE PROGRESS'}
              </span>
              <span className="text-xs sm:text-sm font-arabic-display font-semibold text-white">
                {currentChallenge.category}
              </span>
            </div>
          </div>

          {/* Right: Quick Segment Markers */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {challenges.map((ch, idx) => {
              const isPastOrCurrent = idx <= activeChallengeIndex;
              const isExactCurrent = idx === activeChallengeIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleManualSelect(idx)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-editorial-serif font-bold transition-all duration-300 flex items-center gap-1.5 ${
                    isExactCurrent
                      ? 'bg-[#B99A61] text-[#140F0D] shadow-md shadow-[#B99A61]/30 scale-105'
                      : isPastOrCurrent
                      ? 'bg-[#B99A61]/20 border border-[#B99A61]/40 text-[#D8BF8A]'
                      : 'bg-[#1D1714]/60 border border-[#B99A61]/15 text-[#8C7243] hover:text-[#D8BF8A]'
                  }`}
                  aria-label={`Jump to challenge ${ch.number}`}
                >
                  <span>{ch.number}</span>
                  {isExactCurrent && <span className="w-1 h-1 rounded-full bg-[#140F0D]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE EDITORIAL CHALLENGES COMPOSITION */}
        <div
          ref={scrollTrackRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
        >
          {/* LEFT COLUMN: ACTIVE NUMBER COUNTER & ATELIER RULER NAVIGATION */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-2xl bg-[#261E1A]/60 border border-[#B99A61]/25 backdrop-blur-md shadow-2xl relative overflow-hidden">
            
            {/* Subtle background watermark */}
            <div
              className="absolute -bottom-10 -right-10 text-[180px] font-editorial-serif font-black text-[#B99A61]/5 select-none pointer-events-none leading-none"
              aria-hidden="true"
            >
              {currentChallenge.number}
            </div>

            <div>
              {/* Dynamic Number Crest */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#B99A61]/20">
                <span className="text-6xl sm:text-7xl font-editorial-serif font-extrabold text-[#D8BF8A] tracking-tighter">
                  {currentChallenge.number}
                </span>
                <span className="text-xl sm:text-2xl font-editorial-serif text-[#B99A61]/40">
                  / 03
                </span>
                <span className="ms-auto text-xs font-arabic-display text-[#B99A61] tracking-wider uppercase font-semibold">
                  {currentChallenge.category}
                </span>
              </div>

              {/* Atelier Progress Segment Buttons */}
              <div className="space-y-3 mb-8" role="tablist" aria-label="Challenge selection">
                {challenges.map((ch, idx) => {
                  const isActive = idx === activeChallengeIndex;
                  return (
                    <button
                      key={ch.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleManualSelect(idx)}
                      className={`w-full text-start p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#B99A61]/15 border border-[#B99A61]/60 text-white shadow-lg'
                          : 'bg-[#1D1714]/40 border border-transparent hover:border-[#B99A61]/30 text-[#D8BF8A]/70 hover:text-[#F7F2EA]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`font-editorial-serif text-sm font-bold ${
                            isActive ? 'text-[#B99A61]' : 'text-[#8C7243]'
                          }`}
                        >
                          {ch.number}
                        </span>
                        <span className="font-arabic-display text-sm sm:text-base font-semibold">
                          {ch.question}
                        </span>
                      </div>
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-[#B99A61] scale-125' : 'bg-transparent border border-[#B99A61]/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Atelier Trust Footnote with Live Scroll Percent */}
            <div className="pt-4 border-t border-[#B99A61]/15 flex items-center justify-between text-xs text-[#D8BF8A]/80">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#B99A61] shrink-0" />
                <span>
                  {isRtl
                    ? 'قرارات استراتيجية تم اختبارها عملياً'
                    : 'Field-tested strategic decisions'}
                </span>
              </div>
              <span className="font-editorial-serif font-bold text-[#B99A61] tabular-nums">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: MAIN EXPANDED CHALLENGE EDITORIAL SHOWCASE */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 md:p-12 rounded-2xl bg-gradient-to-br from-[#29201C] via-[#211A17] to-[#1A1412] border border-[#B99A61]/35 shadow-2xl relative overflow-hidden">
            
            {/* Top Fashion Needle & Thread SVG Graphic */}
            <div className="absolute top-6 end-8 pointer-events-none opacity-40">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="#B99A61" strokeWidth="0.75" strokeDasharray="3 3" />
                <path d="M 20 40 L 40 20" stroke="#D8BF8A" strokeWidth="1.5" />
                <circle cx="40" cy="20" r="2" fill="#B99A61" />
              </svg>
            </div>

            <div>
              {/* Category Kicker */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-[1px] bg-[#B99A61]" />
                <span className="text-xs font-editorial-serif tracking-widest text-[#B99A61] uppercase">
                  {currentChallenge.category}
                </span>
              </div>

              {/* Primary Question (Monumental Display) */}
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold font-arabic-display text-white leading-tight mb-6 text-depth-arabic-title">
                "{currentChallenge.question}"
              </h3>

              {/* Supporting Editorial Paragraph */}
              <p className="text-base sm:text-lg md:text-xl text-[#F7F2EA]/90 leading-relaxed mb-8 font-arabic-display font-light">
                {currentChallenge.supporting}
              </p>

              {/* Deep Actionable Insight Box */}
              {currentChallenge.detailNote && (
                <div className="p-5 sm:p-6 rounded-xl bg-[#1B1513]/70 border-r-2 rtl:border-r-2 ltr:border-l-2 rtl:border-l-0 border-[#B99A61] mb-8">
                  <div className="flex items-center gap-2 mb-2 text-[#D8BF8A]">
                    <Sparkles className="w-4 h-4 text-[#B99A61]" />
                    <span className="text-xs font-semibold font-arabic-display">
                      {isRtl ? 'الواقع الميداني في السوق' : 'Market Reality Insight'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E5DED1]/80 leading-relaxed">
                    {currentChallenge.detailNote}
                  </p>
                </div>
              )}
            </div>

            {/* Stepper Navigation Controls */}
            <div className="pt-6 border-t border-[#B99A61]/20 flex items-center justify-between">
              <span className="text-xs text-[#D8BF8A]/70 font-editorial-serif tracking-wider">
                {isRtl ? `التحدي ${activeChallengeIndex + 1} من 3` : `Challenge ${activeChallengeIndex + 1} of 3`}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleManualSelect(activeChallengeIndex > 0 ? activeChallengeIndex - 1 : challenges.length - 1)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#B99A61]/30 hover:border-[#B99A61] text-xs text-[#D8BF8A] hover:text-white transition-colors"
                  aria-label="Previous challenge"
                >
                  {isRtl ? 'السابق' : 'Previous'}
                </button>
                <button
                  onClick={() => handleManualSelect(activeChallengeIndex < challenges.length - 1 ? activeChallengeIndex + 1 : 0)}
                  className="px-4 py-1.5 rounded-lg bg-[#B99A61] text-[#140F0D] font-bold text-xs hover:bg-[#D8BF8A] transition-colors"
                  aria-label="Next challenge"
                >
                  {isRtl ? 'التالي' : 'Next'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* CLOSING STATEMENT & NATURAL TEASER TO SECTION 3 */}
        <div
          ref={closingRef}
          className="mt-20 md:mt-28 pt-12 border-t border-[#B99A61]/20 text-center max-w-3xl mx-auto"
        >
          {/* Closing Statement */}
          <p className="closing-reveal text-xl sm:text-2xl md:text-3xl font-arabic-calligraphy text-[#F7F2EA] leading-relaxed mb-8 text-depth-arabic-calligraphy">
            "{content.challenges.closingStatement}"
          </p>

          {/* Curiosity Teaser into Future Section 3 */}
          <div className="closing-reveal inline-flex flex-col items-center gap-3 group">
            <span className="text-sm sm:text-base font-semibold font-arabic-display text-[#D8BF8A] group-hover:text-white transition-colors">
              {content.challenges.nextSectionTeaser}
            </span>
            <div className="w-8 h-8 rounded-full border border-[#B99A61]/40 flex items-center justify-center text-[#B99A61] animate-bounce">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
