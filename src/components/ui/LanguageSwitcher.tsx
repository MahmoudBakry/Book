import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/25 backdrop-blur-md select-none ${className}`}
      aria-label={language === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
      title={language === 'ar' ? 'English' : 'العربية'}
    >
      <span
        className={`transition-colors duration-200 ${
          language === 'ar'
            ? 'text-[#F5DFB5] font-bold font-arabic-display text-[12px]'
            : 'text-neutral-400 hover:text-neutral-200 text-[11px]'
        }`}
      >
        عربي
      </span>
      <span className="text-white/20 text-[10px] select-none font-light">|</span>
      <span
        className={`font-editorial-serif tracking-widest text-[11px] transition-colors duration-200 ${
          language === 'en'
            ? 'text-[#F5DFB5] font-bold'
            : 'text-neutral-400 hover:text-neutral-200'
        }`}
      >
        EN
      </span>
    </button>
  );
};
