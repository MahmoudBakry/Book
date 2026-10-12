import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  isRtl?: boolean;
  icon?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  isRtl = true,
  icon = true,
}) => {
  const sizeClasses = {
    sm: 'py-2 px-4 text-xs',
    md: 'py-3 px-6 text-sm',
    lg: 'py-3.5 px-8 text-base font-semibold',
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        className={`relative group inline-flex items-center justify-center gap-2.5 font-medium tracking-wide rounded-lg overflow-hidden transition-all duration-300 transform active:scale-95 shadow-lg shadow-[#B99A61]/15 hover:shadow-xl hover:shadow-[#B99A61]/25 hover:-translate-y-0.5 whitespace-nowrap shrink-0 ${sizeClasses[size]} ${className}`}
        style={{
          background: 'linear-gradient(135deg, #E5C992 0%, #B99A61 50%, #8C7243 100%)',
          color: '#140F0D',
        }}
      >
        {/* Shimmer highlight line */}
        <span
          className="absolute inset-0 w-full h-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
        <span className="relative z-10 font-bold">{children}</span>
        {icon && (
          <ArrowIcon
            className={`w-4 h-4 relative z-10 transition-transform duration-300 ${
              isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
            }`}
          />
        )}
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        className={`relative inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-lg border border-[#B99A61]/40 hover:border-[#B99A61] bg-[#241D1A]/50 hover:bg-[#241D1A]/80 text-[#F7F2EA] hover:text-[#D8BF8A] transition-all duration-300 transform active:scale-95 backdrop-blur-sm whitespace-nowrap shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <span>{children}</span>
        {icon && (
          <Sparkles className="w-3.5 h-3.5 text-[#B99A61] transition-transform duration-300 group-hover:rotate-12" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 text-[#D8BF8A] hover:text-[#F7F2EA] transition-colors duration-200 whitespace-nowrap shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <span>{children}</span>
    </button>
  );
};
