import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { BookOpen, CheckCircle2, Sparkles, Lock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { PreviewPageControls } from './PreviewPageControls';
import { CTAButton } from '../../ui/CTAButton';
import { trackEvent } from '../../../lib/analytics';

interface InteractiveBookPreviewProps {
  onOpenPreorder: () => void;
}

export const InteractiveBookPreview: React.FC<InteractiveBookPreviewProps> = ({ onOpenPreorder }) => {
  const { content, isRtl } = useLanguage();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const readerStageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const sceneData = content.bookPreview.scene3;
  const samplePages = content.bookPreview.samplePages;
  const activePage = samplePages[currentPageIndex] || samplePages[0];

  // Animate page transitions
  const changePage = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= samplePages.length || newIndex === currentPageIndex) return;

    if (pageContainerRef.current) {
      gsap.to(pageContainerRef.current, {
        opacity: 0,
        scale: 0.97,
        x: newIndex > currentPageIndex ? (isRtl ? 20 : -20) : (isRtl ? -20 : 20),
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentPageIndex(newIndex);
          trackEvent('preview_page_viewed', {
            page_index: newIndex,
            page_label: samplePages[newIndex]?.label,
            chapter: samplePages[newIndex]?.chapterTitle,
          });
          gsap.fromTo(
            pageContainerRef.current,
            {
              opacity: 0,
              scale: 0.98,
              x: newIndex > currentPageIndex ? (isRtl ? -20 : 20) : (isRtl ? 20 : -20),
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.35,
              ease: 'power2.out',
            }
          );
        },
      });
    } else {
      setCurrentPageIndex(newIndex);
    }
  };

  // Touch Swipe Handlers for Mobile Experience
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe threshold of 45px
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped Left
        if (isRtl) {
          changePage(currentPageIndex - 1);
        } else {
          changePage(currentPageIndex + 1);
        }
      } else {
        // Swiped Right
        if (isRtl) {
          changePage(currentPageIndex + 1);
        } else {
          changePage(currentPageIndex - 1);
        }
      }
    }
    touchStartX.current = null;
  };

  const handleCtaClick = () => {
    trackEvent('select_buy_cta', { source: 'cinematic_preview_scene3' });
    onOpenPreorder();
  };

  return (
    <div
      ref={readerStageRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#1B1513] py-20 sm:py-28 select-none"
    >
      {/* Background Soft Studio Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[550px] pointer-events-none opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(185, 154, 97, 0.4) 0%, rgba(194, 143, 137, 0.2) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#241D1A]/90 border border-[#B99A61]/40 backdrop-blur-md mb-4 shadow-lg">
            <BookOpen className="w-3.5 h-3.5 text-[#B99A61]" />
            <span className="text-[11px] sm:text-xs font-editorial-serif tracking-widest uppercase text-[#D8BF8A]">
              SCENE 03 / INSIDE THE BOOK
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-arabic-display text-[#F7F2EA] leading-[1.2] mb-4 text-depth-arabic-title">
            {sceneData.headline}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#E5DED1]/85 font-arabic-body leading-relaxed max-w-2xl mx-auto">
            {sceneData.supportingCopy}
          </p>
        </div>

        {/* Central Reader Layout: Book Surface + Curated Analysis */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-10">
          
          {/* Main Book Surface Container (7 Cols on desktop) */}
          <div
            className="lg:col-span-7 flex flex-col justify-between"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Interactive Physical Book Surface */}
            <div
              ref={pageContainerRef}
              className={`relative rounded-2xl overflow-hidden bg-[#241D1A] border border-[#B99A61]/40 shadow-2xl transition-all duration-300 ${
                isZoomed ? 'scale-105 z-30' : ''
              }`}
            >
              {/* Studio Book Shadow & Perspective Base */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#1E1715]">
                <img
                  src={activePage.image}
                  alt={`Preview of ${activePage.chapterTitle}`}
                  className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
                  loading="lazy"
                />

                {/* Subtle Paper Texture & Spine Shadow Gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(90deg, rgba(15, 12, 11, 0.45) 0%, transparent 15%, transparent 85%, rgba(15, 12, 11, 0.45) 100%),
                      linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 30%, rgba(0, 0, 0, 0.3) 100%)
                    `,
                  }}
                />

                {/* Sample Page Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B1513]/90 border border-[#B99A61]/40 backdrop-blur-md text-xs text-[#D8BF8A]">
                  <span className="w-2 h-2 rounded-full bg-[#B99A61]" />
                  <span className="font-editorial-serif font-bold text-white">{activePage.label}</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Navigation Controls */}
            <div className="mt-4">
              <PreviewPageControls
                currentPageIndex={currentPageIndex}
                totalPages={samplePages.length}
                onNext={() => changePage(currentPageIndex + 1)}
                onPrev={() => changePage(currentPageIndex - 1)}
                onSelectIndex={changePage}
                isZoomed={isZoomed}
                onToggleZoom={() => setIsZoomed(!isZoomed)}
              />
            </div>
          </div>

          {/* Side Editorial Synthesis & Page Breakdown (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#241D1A]/85 border border-[#B99A61]/35 backdrop-blur-md shadow-2xl">
            <div>
              {/* Chapter Tag */}
              <div className="flex items-center gap-2 text-xs font-editorial-serif tracking-wider text-[#B99A61] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRtl ? 'محور الفصل التنفيذي' : 'EXECUTIVE CURRICULUM'}</span>
              </div>

              {/* Chapter Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-arabic-display text-white mb-4 leading-snug">
                {activePage.chapterTitle}
              </h3>

              {/* Author Golden Quote from Page */}
              <div className="p-4 rounded-xl bg-[#1B1513]/90 border-r-4 border-[#B99A61] mb-6">
                <p className="text-sm sm:text-base font-arabic-calligraphy text-[#D8BF8A] leading-relaxed">
                  "{activePage.summaryQuote}"
                </p>
              </div>

              {/* Bulleted Page Highlights */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-editorial-serif tracking-widest text-[#B99A61]/90 uppercase block">
                  {isRtl ? 'ما ستتعلمينه في هذه الصفحة:' : 'KEY LEARNING OUTCOMES:'}
                </span>
                {activePage.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E5DED1]">
                    <CheckCircle2 className="w-4 h-4 text-[#B99A61] shrink-0 mt-0.5" />
                    <span className="font-arabic-display">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Notice & Reassurance */}
            <div className="pt-4 border-t border-[#B99A61]/25 flex items-center gap-2.5 text-xs text-[#D8BF8A]/80">
              <Lock className="w-4 h-4 text-[#B99A61] shrink-0" />
              <span className="font-arabic-display">{sceneData.readerNotice}</span>
            </div>
          </div>

        </div>

        {/* Global Conversion CTA Dock (High-Conversion Footer for Ad Visitors) */}
        <div className="w-full max-w-3xl p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#281F1B] to-[#1C1614] border border-[#B99A61]/45 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          
          {/* Price & Savings Pill */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="inline-block px-3 py-1 rounded-full bg-[#B99A61]/20 border border-[#B99A61]/40 text-[11px] font-semibold text-[#D8BF8A] uppercase tracking-wider mb-2">
              {sceneData.savingsBadge}
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold font-editorial-serif text-white text-depth-arabic-title">
                {sceneData.priceFormatted}
              </span>
              <span className="text-base sm:text-lg line-through text-[#8C7243] font-editorial-serif">
                {sceneData.originalPriceFormatted}
              </span>
            </div>
            <span className="text-xs text-[#E5DED1]/70 font-arabic-display mt-0.5">
              {isRtl ? 'وصول رقمي كامل ومباشر' : 'Instant Complete Digital Access'}
            </span>
          </div>

          {/* Direct Buy CTA Button */}
          <div className="w-full sm:w-auto">
            <CTAButton
              variant="primary"
              size="lg"
              onClick={handleCtaClick}
              isRtl={isRtl}
              className="w-full sm:w-auto text-base px-10 py-4 shadow-xl shadow-[#B99A61]/25 hover:shadow-[#B99A61]/45"
            >
              <span>{sceneData.ctaButton}</span>
              <ArrowUpRight className="w-4 h-4 ms-2" />
            </CTAButton>
          </div>

        </div>

      </div>
    </div>
  );
};
