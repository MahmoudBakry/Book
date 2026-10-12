import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../hooks/useLanguage';
import { FashionOpeningScene } from './bookPreview/FashionOpeningScene';
import { EditorialTransitionScene } from './bookPreview/EditorialTransitionScene';
import { InteractiveBookPreview } from './bookPreview/InteractiveBookPreview';

gsap.registerPlugin(ScrollTrigger);

interface BookPreviewSectionProps {
  onOpenPreorder: () => void;
}

export const BookPreviewSection: React.FC<BookPreviewSectionProps> = ({ onOpenPreorder }) => {
  const { content, isRtl } = useLanguage();
  const sectionRootRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Continuous Storytelling Gold Silk Thread Timeline connecting Scene 1 -> 2 -> 3
      if (progressLineRef.current && sectionRootRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRootRef.current,
              start: 'top 50%',
              end: 'bottom 85%',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRootRef}
      id="book-preview"
      className="relative w-full bg-[#1B1513] text-[#F7F2EA] overflow-hidden"
      aria-label={isRtl ? 'معاينة سينمائية تفاعلية للدليل' : 'Cinematic Interactive Book Preview'}
    >
      {/* 
        ========================================================================
        CONNECTING GOLDEN SILK THREAD TIMELINE (SHARED STORYTELLING AXIS)
        Connects Scene 01 -> Scene 02 -> Scene 03 continuously
        ========================================================================
      */}
      <div className="absolute top-0 bottom-0 left-4 sm:left-8 lg:left-12 w-[1.5px] pointer-events-none z-20 opacity-30 sm:opacity-50 hidden md:block">
        <div className="w-full h-full bg-[#B99A61]/15 relative">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-gradient-to-b from-[#B99A61] via-[#E6CA85] to-[#B99A61]"
          />
        </div>
      </div>

      {/* 
        ========================================================================
        SCENE 01 — THE WORLD OF FASHION
        Full-bleed opening fashion film feel, macro fabric texture, gold thread
        ========================================================================
      */}
      <FashionOpeningScene />

      {/* 
        ========================================================================
        SCENE 02 — FROM INSPIRATION TO KNOWLEDGE
        Atelier moodboard, pattern notes, decisions that define the brand
        ========================================================================
      */}
      <EditorialTransitionScene />

      {/* 
        ========================================================================
        SCENE 03 — INSIDE THE BOOK
        Approved sample pages, interactive page turning, verified outcomes & CTA
        ========================================================================
      */}
      <InteractiveBookPreview onOpenPreorder={onOpenPreorder} />

      {/* Section Bottom Aesthetic Boundary Bleed */}
      <div
        className="w-full h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #1B1513 0%, #15100E 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
};
