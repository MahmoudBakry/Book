import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-md bg-[#241D1A]/60 border border-[#B99A61]/25 backdrop-blur-md ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 text-[#B99A61] ml-1 mr-0.5 shrink-0" aria-hidden="true" />
      <button
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 text-xs font-medium rounded transition-all duration-200 ${
          language === 'ar'
            ? 'bg-[#B99A61] text-[#161210] font-semibold shadow-sm'
            : 'text-[#D8BF8A] hover:text-[#F7F2EA]'
        }`}
        aria-pressed={language === 'ar'}
      >
        العربية
      </button>
      <span className="text-[#B99A61]/30 text-xs">/</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-editorial-serif tracking-wider uppercase transition-all duration-200 rounded ${
          language === 'en'
            ? 'bg-[#B99A61] text-[#161210] font-semibold shadow-sm'
            : 'text-[#D8BF8A] hover:text-[#F7F2EA]'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
};
