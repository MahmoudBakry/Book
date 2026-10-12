import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Layers, Scissors, Ruler, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

export const EditorialTransitionScene: React.FC = () => {
  const { content, isRtl } = useLanguage();
  const sceneRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const moodboardRef = useRef<HTMLDivElement>(null);
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const sceneData = content.bookPreview.scene2;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal of moodboard and editorial notes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
        );
      }

      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }

      if (moodboardRef.current) {
        tl.fromTo(
          moodboardRef.current,
          { scale: 0.94, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (notesContainerRef.current) {
        const notes = notesContainerRef.current.querySelectorAll('.sketch-note-item');
        tl.fromTo(
          notes,
          { x: isRtl ? 30 : -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out' },
          '-=0.7'
        );
      }
    }, sceneRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <div
      ref={sceneRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#1B1513] py-24 sm:py-32 select-none"
    >
      {/* Background Subtle Atelier Pattern Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #B99A61 1px, transparent 1px),
            linear-gradient(to bottom, #B99A61 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Glows */}
      <div
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #B99A61 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C28F89 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Editorial Headline Strip */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#241D1A]/90 border border-[#B99A61]/40 backdrop-blur-md mb-5 shadow-lg">
            <Layers className="w-3.5 h-3.5 text-[#B99A61]" />
            <span className="text-[11px] sm:text-xs font-editorial-serif tracking-widest uppercase text-[#D8BF8A]">
              SCENE 02 / FROM INSPIRATION TO KNOWLEDGE
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl font-bold font-arabic-display text-[#F7F2EA] leading-[1.2] mb-4 text-depth-arabic-title"
          >
            {sceneData.headline}
          </h2>

          <p
            ref={copyRef}
            className="text-base sm:text-lg md:text-xl text-[#E5DED1]/85 font-arabic-body leading-relaxed max-w-2xl mx-auto"
          >
            {sceneData.supportingCopy}
          </p>
        </div>

        {/* Layered Composition: Atelier Moodboard + Editorial Margin Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Visual: Atelier Moodboard & Pattern Swatches */}
          <div
            ref={moodboardRef}
            className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-[#B99A61]/35 shadow-2xl bg-[#241D1A]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/src/assets/images/atelier_moodboard_sketch_1791809404123.jpg"
                alt="Haute couture atelier moodboard with sketches and fabric swatches"
                className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(27, 21, 19, 0.1) 0%, rgba(27, 21, 19, 0.6) 100%)',
                }}
              />
            </div>

            {/* Micro Caption overlay */}
            <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-xl bg-[#1B1513]/90 border border-[#B99A61]/30 backdrop-blur-md flex items-center justify-between text-xs text-[#E5DED1]">
              <div className="flex items-center gap-2">
                <Scissors className="w-3.5 h-3.5 text-[#B99A61]" />
                <span className="font-editorial-serif tracking-wide text-[#D8BF8A]">ATELIER DOSSIER • ARCHIVE REF 04</span>
              </div>
              <span className="text-[11px] text-[#B99A61]/90 font-arabic-display">{isRtl ? 'دراسة القماش والباترون' : 'Textile & Pattern Study'}</span>
            </div>
          </div>

          {/* Right/Side Editorial Pillar: Strategic Decision Cards */}
          <div ref={notesContainerRef} className="lg:col-span-5 flex flex-col gap-4">
            {sceneData.sketchNotes.map((note, index) => (
              <div
                key={index}
                className="sketch-note-item p-5 sm:p-6 rounded-2xl bg-[#241D1A]/85 border border-[#B99A61]/30 backdrop-blur-md shadow-xl hover:border-[#B99A61]/60 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#1B1513] border border-[#B99A61]/40 text-[#B99A61] shrink-0 group-hover:text-white group-hover:bg-[#B99A61]/20 transition-colors">
                    {index === 0 ? <Ruler className="w-4 h-4" /> : index === 1 ? <Layers className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-editorial-serif tracking-widest uppercase text-[#B99A61] block mb-1">
                      {isRtl ? `القرار الاستراتيجي 0${index + 1}` : `STRATEGIC PILLAR 0${index + 1}`}
                    </span>
                    <p className="text-sm sm:text-base font-arabic-display font-medium text-[#F7F2EA] leading-relaxed">
                      {note}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Transition Bridge to Scene 03 */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#241D1A] to-[#2E2420] border border-[#B99A61]/30 text-xs text-[#D8BF8A] flex items-center justify-between">
              <span className="font-arabic-calligraphy text-sm">{isRtl ? 'من فكرة الرداء… إلى صفحات الدليل الكامل' : 'From concept silhouette to the complete volume'}</span>
              <span className="font-editorial-serif text-[11px] uppercase tracking-wider text-[#B99A61] font-semibold">NEXT →</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
