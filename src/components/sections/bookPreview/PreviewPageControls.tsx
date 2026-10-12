import React from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, BookOpen, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

interface PreviewPageControlsProps {
  currentPageIndex: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (index: number) => void;
  isZoomed: boolean;
  onToggleZoom: () => void;
}

export const PreviewPageControls: React.FC<PreviewPageControlsProps> = ({
  currentPageIndex,
  totalPages,
  onNext,
  onPrev,
  onSelectIndex,
  isZoomed,
  onToggleZoom,
}) => {
  const { isRtl } = useLanguage();

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#241D1A]/90 border border-[#B99A61]/35 backdrop-blur-md shadow-2xl">
      
      {/* 1. Page Indicator & Verified Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1B1513] border border-[#B99A61]/30 text-xs text-[#D8BF8A]">
          <BookOpen className="w-3.5 h-3.5 text-[#B99A61]" />
          <span className="font-editorial-serif font-bold text-white">
            0{currentPageIndex + 1}
          </span>
          <span className="text-zinc-500">/</span>
          <span className="font-editorial-serif text-zinc-400">0{totalPages}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#E5DED1]/80">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B99A61]" />
          <span className="font-arabic-display">{isRtl ? 'صفحات نموذجية معتمدة' : 'Official Sample Preview'}</span>
        </div>
      </div>

      {/* 2. Page Dots (Quick jumping) */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentPageIndex
                ? 'w-7 bg-[#B99A61]'
                : 'w-2 bg-[#B99A61]/25 hover:bg-[#B99A61]/50'
            }`}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>

      {/* 3. Action Controls: Zoom & Nav Buttons */}
      <div className="flex items-center gap-2">
        {/* Zoom Toggle button */}
        <button
          onClick={onToggleZoom}
          className="p-2 rounded-xl bg-[#1B1513] border border-[#B99A61]/30 text-[#D8BF8A] hover:text-white hover:bg-[#B99A61]/20 transition-colors"
          title={isZoomed ? (isRtl ? 'تصغير' : 'Zoom Out') : (isRtl ? 'تكبير للقراءة' : 'Enlarge')}
          aria-label="Toggle Page Zoom"
        >
          {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
        </button>

        {/* Previous Page Button */}
        <button
          onClick={isRtl ? onNext : onPrev}
          disabled={isRtl ? currentPageIndex === totalPages - 1 : currentPageIndex === 0}
          className="p-2 rounded-xl bg-[#1B1513] border border-[#B99A61]/30 text-[#D8BF8A] hover:text-white hover:bg-[#B99A61]/20 disabled:opacity-30 disabled:hover:bg-[#1B1513] transition-colors"
          aria-label="Previous Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Next Page Button */}
        <button
          onClick={isRtl ? onPrev : onNext}
          disabled={isRtl ? currentPageIndex === 0 : currentPageIndex === totalPages - 1}
          className="p-2 rounded-xl bg-[#1B1513] border border-[#B99A61]/30 text-[#D8BF8A] hover:text-white hover:bg-[#B99A61]/20 disabled:opacity-30 disabled:hover:bg-[#1B1513] transition-colors"
          aria-label="Next Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
