/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ChallengesSection } from './components/sections/ChallengesSection';
import { BookPreviewSection } from './components/sections/BookPreviewSection';
import { PreorderDrawer } from './components/ui/PreorderDrawer';
import { captureAttribution, trackEvent } from './lib/analytics';

function MainLayout() {
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);
  const { isRtl } = useLanguage();

  useEffect(() => {
    // Capture any incoming ad attribution (UTMs, gclid, fbclid, sc_click_id)
    captureAttribution();
    // Dispatch page view analytics
    trackEvent('page_view', {
      page: 'chapters_phase_3',
      edition: 'Special Edition Fashion Guide',
      dir: isRtl ? 'rtl' : 'ltr',
    });
  }, [isRtl]);

  return (
    <div className="relative min-h-screen bg-[#1B1513] text-[#F7F2EA] flex flex-col selection:bg-[#B99A61]/30 selection:text-[#F7F2EA]">
      {/* Premium Top Navbar */}
      <Navbar onOpenPreorder={() => setIsPreorderOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Cinematic Flagship Hero */}
        <HeroSection onOpenPreorder={() => setIsPreorderOpen(true)} />

        {/* Section 2: Interactive Challenges / Pain Points */}
        <ChallengesSection />

        {/* Section 4: Cinematic Interactive Book Preview */}
        <BookPreviewSection onOpenPreorder={() => setIsPreorderOpen(true)} />
      </main>

      {/* Conversion-Focused Checkout & Priority Reservation Drawer */}
      <PreorderDrawer
        isOpen={isPreorderOpen}
        onClose={() => setIsPreorderOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}
