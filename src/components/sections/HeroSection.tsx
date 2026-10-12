import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useMouseParallax } from '../../animations/useMouseParallax';
import { AnimatedBook } from '../ui/AnimatedBook';
import { KineticTypography } from '../ui/KineticTypography';
import { FashionSVGAnimation } from '../ui/FashionSVGAnimation';
import { CTAButton } from '../ui/CTAButton';
import { trackEvent } from '../../lib/analytics';
import { ChaptersPreviewModal } from '../ui/ChaptersPreviewModal';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenPreorder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPreorder }) => {
  const { content, isRtl, language } = useLanguage();
  const mouse = useMouseParallax();
  const [isChaptersModalOpen, setIsChaptersModalOpen] = useState(false);
  
  const heroRootRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const emotionalHeadlineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const leftAnnotationRef = useRef<HTMLDivElement>(null);
  const rightAnnotationRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Stagger Reveal Animation Sequence via mounting hook
  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Eyebrow Badge Reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          0.1
        );
      }

      // 2. Main Title Words Stagger (3D Pop Up)
      if (titleContainerRef.current) {
        const words = titleContainerRef.current.querySelectorAll('.stagger-word');
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 40,
            rotateX: -30,
            transformOrigin: '50% 100%',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.06,
          },
          '-=0.45'
        );
      }

      // 3. Emotional Headline Reveal
      if (emotionalHeadlineRef.current) {
        tl.fromTo(
          emotionalHeadlineRef.current,
          { opacity: 0, y: 20, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 },
          '-=0.45'
        );
      }

      // 4. Asymmetric Floating Editorial Cards
      if (leftAnnotationRef.current && rightAnnotationRef.current) {
        tl.fromTo(
          [leftAnnotationRef.current, rightAnnotationRef.current],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          '-=0.4'
        );
      }

      // 5. Descriptive Text Reveal
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // 6. Action CTA Buttons Reveal
      if (ctaButtonsRef.current) {
        tl.fromTo(
          ctaButtonsRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          '-=0.45'
        );
      }

      // 7. Supporting Highlights Strip
      if (highlightsRef.current) {
        const highlightItems = highlightsRef.current.querySelectorAll('.highlight-item');
        tl.fromTo(
          highlightItems,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.4'
        );
      }
    }, heroRootRef);

    return () => ctx.revert();
  }, [language]);

  const handlePrimaryCta = () => {
    trackEvent('select_buy_cta', { source: 'hero_primary' });
    onOpenPreorder();
  };

  // Split title into words for individual staggered reveal
  const titleWords = content.hero.mainTitle.split(' ');

  return (
    <section
      ref={heroRootRef}
      id="hero"
      className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between overflow-hidden bg-[#1C1614] pt-20 sm:pt-24 lg:pt-20 pb-6 sm:pb-8 lg:pb-6 select-none"
      style={{
        backgroundImage: `
          radial-gradient(circle 900px at 50% 20%, rgba(245, 223, 181, 0.28) 0%, rgba(185, 154, 97, 0.2) 28%, rgba(85, 62, 55, 0.45) 55%, #1C1614 100%),
          radial-gradient(ellipse 700px 500px at 85% 60%, rgba(194, 143, 137, 0.18) 0%, transparent 60%),
          radial-gradient(ellipse 700px 500px at 15% 70%, rgba(216, 191, 138, 0.16) 0%, transparent 60%)
        `,
      }}
    >
      {/* WARM OVERHEAD STUDIO SPOTLIGHT SPILL */}
      <div
        className="absolute top-0 inset-x-0 h-[380px] pointer-events-none opacity-80 select-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(245, 223, 181, 0.24) 0%, rgba(185, 154, 97, 0.1) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* 1. LAYER: FASHION ATELIER SVG SKETCHES & THREADS */}
      <FashionSVGAnimation />

      {/* 2. LAYER: KINETIC TYPOGRAPHY BEHIND THE BOOK WITH SMOOTH PARALLAX */}
      <KineticTypography
        isRtl={isRtl}
        mouseX={mouse.x}
        mouseY={mouse.y}
      />

      {/* 3. LAYER: MAIN HERO EDITORIAL CONTENT & 3D BOOK STAGE */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        
        {/* TOP EDITORIAL CREST & MONUMENTAL HEADLINES */}
        <div className="text-center pt-1 sm:pt-2 max-w-4xl mx-auto">
          {/* Eyebrow with Luxury Gold Diamond Accents */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 px-3 sm:px-3.5 py-1 rounded-full bg-[#241D1A]/70 border border-[#B99A61]/35 backdrop-blur-md shadow-sm"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
            <span className="text-[11px] sm:text-xs font-arabic-display tracking-wider text-[#D8BF8A] text-depth-arabic-eyebrow">
              {content.hero.eyebrow}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
          </div>

          {/* Main Book Title: Monumental Editorial Display with Depth Text Shadows */}
          <h1
            ref={titleContainerRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-arabic-display tracking-tight text-[#F7F2EA] leading-[1.18] mb-1.5 sm:mb-2 text-depth-arabic-title"
          >
            {titleWords.map((word, idx) => (
              <span
                key={idx}
                className="stagger-word inline-block px-1 preserve-3d"
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Emotional Headline with Rich Calligraphic Shadow */}
          <p
            ref={emotionalHeadlineRef}
            className="text-base sm:text-xl md:text-2xl font-arabic-calligraphy text-[#D8BF8A] tracking-normal text-depth-arabic-calligraphy"
          >
            "{content.hero.emotionalHeadline}"
          </p>
        </div>

        {/* CENTER STAGE: IMMERSIVE 3D BOOK WITH ASYMMETRIC EDITORIAL LAYERING */}
        <div className="relative my-3 sm:my-4 lg:my-2 flex items-center justify-center">
          
          {/* Left Editorial Floating Annotation (Desktop) */}
          <div
            ref={leftAnnotationRef}
            className="hidden lg:flex flex-col gap-3 absolute left-0 xl:left-6 top-1/2 -translate-y-1/2 max-w-[210px] xl:max-w-[230px] text-start z-20 pointer-events-auto"
            style={{
              transform: `translate(${mouse.x * -10}px, calc(-50% + ${mouse.y * -6}px))`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            <div className="p-3 xl:p-3.5 rounded-xl bg-[#241D1A]/85 border border-[#B99A61]/35 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-1.5 text-[#B99A61] mb-1">
                <Award className="w-3.5 h-3.5" />
                <span className="text-[10px] font-editorial-serif tracking-widest uppercase font-semibold text-depth-gold-shimmer">
                  {content.hero.editionBadge}
                </span>
              </div>
              <p className="text-[11px] text-[#E5DED1] leading-relaxed">
                {isRtl
                  ? 'رؤية عملية متكاملة من المصممة منيرة الحربي لبناء علامة كويتية وخليجية منافسة.'
                  : 'An authoritative strategic blueprint crafted to launch coveted luxury fashion houses.'}
              </p>
            </div>

            <div className="p-2.5 xl:p-3 rounded-xl bg-[#241D1A]/60 border border-[#B99A61]/25 backdrop-blur-sm">
              <span className="text-[9px] text-[#B99A61] block mb-0.5 font-medium">
                {content.hero.authorLabel}
              </span>
              <span className="text-xs xl:text-sm font-arabic-display font-semibold text-[#F7F2EA]">
                {content.hero.authorName}
              </span>
            </div>
          </div>

          {/* THE 3D BOOK HERO OBJECT */}
          <div className="relative z-10 w-full max-w-[420px] flex justify-center items-center">
            <AnimatedBook
              isInteractive={true}
              mouseX={mouse.x}
              mouseY={mouse.y}
            />
          </div>

          {/* Right Editorial Floating Annotation: Launch Special Price (Desktop) */}
          <div
            ref={rightAnnotationRef}
            className="hidden lg:flex flex-col gap-3 absolute right-0 xl:right-6 top-1/2 -translate-y-1/2 max-w-[210px] xl:max-w-[230px] text-end z-20 pointer-events-auto"
            style={{
              transform: `translate(${mouse.x * 10}px, calc(-50% + ${mouse.y * 6}px))`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            {/* Price Box */}
            <div className="p-3 xl:p-3.5 rounded-xl bg-[#241D1A]/85 border border-[#B99A61]/40 backdrop-blur-md shadow-xl text-end">
              <span className="text-[9px] tracking-widest uppercase font-semibold text-[#B99A61] block mb-0.5">
                {isRtl ? 'عرض الإطلاق الخاص' : 'LAUNCH SPECIAL'}
              </span>
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-2xl xl:text-3xl font-bold text-white font-editorial-serif text-depth-arabic-title">
                  {content.hero.priceFormatted}
                </span>
                <span className="text-xs xl:text-sm line-through text-[#8C7243] font-editorial-serif">
                  {content.hero.originalPriceFormatted}
                </span>
              </div>
              <span className="text-[11px] text-[#D8BF8A] mt-1 block">
                {content.hero.savingsNote}
              </span>
            </div>

            {/* Quick Author Signature Trust */}
            <div className="p-2.5 xl:p-3 rounded-xl bg-[#241D1A]/60 border border-[#B99A61]/25 backdrop-blur-sm text-end">
              <span className="text-[10px] text-[#D8BF8A] block font-editorial-serif">
                {isRtl ? 'إصدار رقمي كامل ومباشر' : 'Instant Digital Access'}
              </span>
              <span className="text-[11px] text-[#E5DED1]/80 font-arabic-display">
                {isRtl ? 'قراءة على جميع الأجهزة' : 'Cross-Platform Compatibility'}
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: EDITORIAL COPY + SINGLE CTA DOCK + METADATA STRIP */}
        <div className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center">
          
          {/* Mobile Pricing Badge */}
          <div className="lg:hidden flex items-center gap-2.5 mb-2.5 p-1.5 px-3.5 rounded-lg bg-[#241D1A]/90 border border-[#B99A61]/35 backdrop-blur-md">
            <span className="text-[11px] text-[#B99A61]">{content.hero.savingsNote}</span>
            <span className="w-1 h-1 rounded-full bg-[#B99A61]" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-white font-editorial-serif text-depth-arabic-title">
                {content.hero.priceFormatted}
              </span>
              <span className="text-[11px] line-through text-[#8C7243] font-editorial-serif">
                {content.hero.originalPriceFormatted}
              </span>
            </div>
          </div>

          {/* Description Prose - Fully visible without truncation */}
          <p
            ref={descriptionRef}
            className="text-xs sm:text-sm md:text-[15px] text-[#E5DED1]/90 leading-relaxed max-w-2xl mx-auto mb-3.5 sm:mb-4"
          >
            {content.hero.description}
          </p>

          {/* Action CTA: Single Ultra-Clear & Attractive Button */}
          <div
            ref={ctaButtonsRef}
            className="flex items-center justify-center w-full sm:w-auto mb-3.5 sm:mb-4"
          >
            <CTAButton
              size="md"
              variant="primary"
              onClick={handlePrimaryCta}
              isRtl={isRtl}
              className="w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-2.5 sm:py-3 shadow-xl shadow-[#B99A61]/25 hover:shadow-[#B99A61]/40"
            >
              {content.hero.primaryCTA}
            </CTAButton>
          </div>

          {/* Supporting Highlights Strip */}
          <div
            ref={highlightsRef}
            className="w-full max-w-2xl mx-auto pt-3 border-t border-[#B99A61]/25 flex items-center justify-center gap-4 sm:gap-8 md:gap-10 text-[11px] sm:text-xs md:text-sm text-[#D8BF8A]"
          >
            {content.hero.highlights.map((highlight, index) => (
              <div key={index} className="highlight-item flex items-center gap-1.5 sm:gap-2">
                <span className="font-editorial-serif font-bold text-xs sm:text-sm md:text-base text-white tracking-wide">
                  {highlight.number}
                </span>
                <span className="text-[#E5DED1]/90 font-arabic-display font-normal text-[11px] sm:text-xs md:text-sm">
                  {highlight.label}
                </span>
                {index < content.hero.highlights.length - 1 && (
                  <span className="text-[#B99A61]/40 select-none mx-1.5 sm:mx-2 font-serif">·</span>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Chapters Preview Modal fallback if opened */}
      <ChaptersPreviewModal
        isOpen={isChaptersModalOpen}
        onClose={() => setIsChaptersModalOpen(false)}
        onSelectBuy={() => {
          setIsChaptersModalOpen(false);
          onOpenPreorder();
        }}
      />
    </section>
  );
};
