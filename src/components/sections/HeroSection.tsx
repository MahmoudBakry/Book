import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ArrowUpRight } from 'lucide-react';
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

  // GSAP Entrance & Stagger Reveal Animation Sequence via mounting hook & ScrollTrigger
  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRootRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      // 1. Eyebrow Badge Reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -20, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75 }
        );
      }

      // 2. Main Title Words Stagger Reveal (Fade in and shift upwards smoothly)
      const titleWords = titleContainerRef.current?.querySelectorAll('.stagger-word');
      if (titleWords && titleWords.length > 0) {
        tl.fromTo(
          titleWords,
          {
            opacity: 0,
            y: 40,
            rotateX: 25,
            transformOrigin: '50% 100%',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.08,
          },
          '-=0.45'
        );
      }

      // 3. Emotional Headline Reveal (Fade in and shift upwards smoothly)
      if (emotionalHeadlineRef.current) {
        tl.fromTo(
          emotionalHeadlineRef.current,
          { opacity: 0, y: 25, filter: 'blur(5px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
          '-=0.45'
        );
      }

      // 4. Asymmetric Floating Editorial Cards
      if (leftAnnotationRef.current && rightAnnotationRef.current) {
        tl.fromTo(
          [leftAnnotationRef.current, rightAnnotationRef.current],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.4'
        );
      }

      // 5. Descriptive Text Reveal (Fade in and shift upwards smoothly)
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // 6. Action CTA Buttons Reveal
      if (ctaButtonsRef.current) {
        tl.fromTo(
          ctaButtonsRef.current,
          { opacity: 0, y: 22, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75 },
          '-=0.45'
        );
      }

      // 7. Supporting Highlights Strip
      if (highlightsRef.current) {
        const highlightItems = highlightsRef.current.querySelectorAll('.highlight-item');
        tl.fromTo(
          highlightItems,
          { opacity: 0, y: 16 },
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

  const handleSecondaryCta = () => {
    trackEvent('explore_chapters_cta', { source: 'hero_secondary' });
    setIsChaptersModalOpen(true);
  };

  // Split title into words for individual staggered reveal
  const titleWords = content.hero.mainTitle.split(' ');

  return (
    <section
      ref={heroRootRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#181311] pt-24 pb-12 sm:pb-16"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 35%, rgba(65, 47, 42, 0.45) 0%, rgba(36, 29, 26, 0.75) 45%, #161210 100%)',
      }}
    >
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
        <div className="text-center pt-2 sm:pt-4 md:pt-6 max-w-4xl mx-auto">
          {/* Eyebrow with Luxury Gold Diamond Accents */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-[#241D1A]/60 border border-[#B99A61]/30 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
            <span className="text-xs sm:text-sm font-arabic-display tracking-wider text-[#D8BF8A] text-depth-arabic-eyebrow">
              {content.hero.eyebrow}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B99A61]" />
          </div>

          {/* Main Book Title: Monumental Editorial Display with Depth Text Shadows */}
          <h1
            ref={titleContainerRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-arabic-display tracking-tight text-[#F7F2EA] leading-[1.15] mb-2 text-depth-arabic-title"
          >
            {titleWords.map((word, idx) => (
              <span
                key={idx}
                className="stagger-word inline-block px-1 md:px-2 preserve-3d"
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Emotional Headline with Rich Calligraphic Shadow */}
          <p
            ref={emotionalHeadlineRef}
            className="text-lg sm:text-2xl md:text-3xl font-arabic-calligraphy text-[#D8BF8A] tracking-normal mb-1 text-depth-arabic-calligraphy"
          >
            "{content.hero.emotionalHeadline}"
          </p>
        </div>

        {/* CENTER STAGE: IMMERSIVE 3D BOOK WITH ASYMMETRIC EDITORIAL LAYERING */}
        <div className="relative my-4 sm:my-6 md:my-8 flex items-center justify-center">
          
          {/* Left Editorial Floating Annotation (Desktop) */}
          <div
            ref={leftAnnotationRef}
            className="hidden lg:flex flex-col gap-4 absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 max-w-[240px] text-start z-20 pointer-events-auto"
            style={{
              transform: `translate(${mouse.x * -12}px, calc(-50% + ${mouse.y * -8}px))`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            <div className="p-4 rounded-xl bg-[#241D1A]/80 border border-[#B99A61]/30 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2 text-[#B99A61] mb-1.5">
                <Award className="w-4 h-4" />
                <span className="text-[11px] font-editorial-serif tracking-widest uppercase font-semibold text-depth-gold-shimmer">
                  {content.hero.editionBadge}
                </span>
              </div>
              <p className="text-xs text-[#E5DED1] leading-relaxed">
                {isRtl
                  ? 'رؤية عملية متكاملة من المصممة منيرة الحربي لبناء علامة كويتية وخليجية منافسة.'
                  : 'An authoritative strategic blueprint crafted to launch coveted luxury fashion houses.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#241D1A]/50 border border-[#B99A61]/20 backdrop-blur-sm">
              <span className="text-[11px] text-[#B99A61] block mb-0.5 font-medium">
                {content.hero.authorLabel}
              </span>
              <span className="text-xs sm:text-sm font-arabic-display font-semibold text-[#F7F2EA]">
                {content.hero.authorName}
              </span>
            </div>
          </div>

          {/* THE 3D BOOK HERO OBJECT */}
          <div className="relative z-10 w-full max-w-[480px] flex justify-center">
            <AnimatedBook
              isInteractive={true}
              mouseX={mouse.x}
              mouseY={mouse.y}
            />
          </div>

          {/* Right Editorial Floating Annotation: Launch Price & Pillars (Desktop) */}
          <div
            ref={rightAnnotationRef}
            className="hidden lg:flex flex-col gap-4 absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 max-w-[240px] text-end z-20 pointer-events-auto"
            style={{
              transform: `translate(${mouse.x * 12}px, calc(-50% + ${mouse.y * 8}px))`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#241D1A]/80 border border-[#B99A61]/40 backdrop-blur-md shadow-xl text-end">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B99A61] block mb-1">
                {isRtl ? 'عرض الإطلاق الخاص' : 'LAUNCH SPECIAL'}
              </span>
              <div className="flex items-baseline justify-end gap-2.5">
                <span className="text-3xl font-bold text-white font-editorial-serif text-depth-arabic-title">
                  {content.hero.priceFormatted}
                </span>
                <span className="text-sm line-through text-[#8C7243] font-editorial-serif">
                  {content.hero.originalPriceFormatted}
                </span>
              </div>
              <span className="text-[11px] text-[#D8BF8A] mt-1 block">
                {content.hero.savingsNote}
              </span>
            </div>

            {/* Quick Curriculum Highlight */}
            <div className="p-3.5 rounded-xl bg-[#241D1A]/50 border border-[#B99A61]/20 backdrop-blur-sm">
              <button
                onClick={handleSecondaryCta}
                className="w-full text-end text-xs text-[#E5DED1] hover:text-[#B99A61] transition-colors flex items-center justify-end gap-1.5 group"
              >
                <span>{isRtl ? 'استعراض الـ 7 فصول' : 'Explore All 7 Pillars'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B99A61] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: EDITORIAL COPY + CTA DOCK + HIGHLIGHTS */}
        <div className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center">
          
          {/* Mobile Pricing Badge (Shown on smaller screens where side boxes are hidden) */}
          <div className="lg:hidden flex items-center gap-3 mb-3 p-2 px-4 rounded-xl bg-[#241D1A]/90 border border-[#B99A61]/35 backdrop-blur-md">
            <span className="text-xs text-[#B99A61]">{content.hero.savingsNote}</span>
            <span className="w-1 h-1 rounded-full bg-[#B99A61]" />
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white font-editorial-serif text-depth-arabic-title">
                {content.hero.priceFormatted}
              </span>
              <span className="text-xs line-through text-[#8C7243] font-editorial-serif">
                {content.hero.originalPriceFormatted}
              </span>
            </div>
          </div>

          {/* Description Prose (Smooth upward reveal & fade) */}
          <p
            ref={descriptionRef}
            className="text-xs sm:text-sm md:text-base text-[#E5DED1]/90 leading-relaxed max-w-2xl mx-auto mb-6"
          >
            {content.hero.description}
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaButtonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-6"
          >
            <CTAButton
              size="lg"
              variant="primary"
              onClick={handlePrimaryCta}
              isRtl={isRtl}
              className="w-full sm:w-auto text-sm sm:text-base px-8 py-3.5"
            >
              {content.hero.primaryCTA}
            </CTAButton>

            <CTAButton
              size="lg"
              variant="secondary"
              onClick={handleSecondaryCta}
              isRtl={isRtl}
              className="w-full sm:w-auto text-xs sm:text-sm px-6 py-3.5"
            >
              {content.hero.secondaryCTA}
            </CTAButton>
          </div>

          {/* Supporting Highlights Strip (Anti-slop zero-pill typographic metadata) */}
          <div
            ref={highlightsRef}
            className="w-full pt-4 border-t border-[#B99A61]/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#D8BF8A]"
          >
            {content.hero.highlights.map((highlight, index) => (
              <div key={index} className="highlight-item flex items-center gap-2">
                <span className="font-editorial-serif font-bold text-sm sm:text-base text-white">
                  {highlight.number}
                </span>
                <span className="text-[#E5DED1]/80">{highlight.label}</span>
                {index < content.hero.highlights.length - 1 && (
                  <span className="hidden sm:inline text-[#B99A61]/40 select-none mr-2">·</span>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Chapters Preview Modal when Secondary CTA is clicked */}
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

