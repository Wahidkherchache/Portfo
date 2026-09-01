import { useState, useRef, useEffect, useCallback } from 'react';
import { ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  certId: string;
  verifyUrl: string;
  imageUrl: string;
  status: string;
  skills: string[];
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'cisco-cybersecurity',
    title: 'INTRODUCTION TO CYBERSECURITY',
    issuer: 'CISCO NETWORKING ACADEMY',
    date: 'July 24, 2026',
    certId: '24a9f198-6ff7-41ce-b369-811a712fc3a1',
    verifyUrl: 'https://www.credly.com/badges/4f98438f-35fe-4efc-adc8-9d2efbde2834/public_url',
    imageUrl: `${import.meta.env.BASE_URL}certificates/cisco-cybersecurity.png`,
    status: 'VERIFIED',
    skills: [
      'CYBER HYGIENE',
      'THREAT DEFENSE',
      'NETWORK SECURITY',
      'DATA CONFIDENTIALITY',
    ],
  },
  {
    id: 'cisco-networking-basics',
    title: 'NETWORKING BASICS',
    issuer: 'CISCO NETWORKING ACADEMY',
    date: 'July 31, 2026',
    certId: '6e4cd09d-d7f2-46da-842b-dd4047e2c910',
    verifyUrl: 'https://www.credly.com/badges/9ff63a5f-6bba-4c14-a789-57a61c9e7f19/public_url',
    imageUrl: `${import.meta.env.BASE_URL}certificates/Networking-Basic.png`,
    status: 'VERIFIED',
    skills: [
      'NETWORKING FUNDAMENTALS',
      'IP ADDRESSING & SUBNETTING',
      'ROUTING & SWITCHING',
      'NETWORK PROTOCOLS',
      'LAN/WAN INFRASTRUCTURE',
    ],
  },
  {
    id: 'cisco-networking-devices',
    title: 'NETWORKING DEVICES AND INITIAL CONFIGURATION',
    issuer: 'CISCO NETWORKING ACADEMY',
    date: 'September 1, 2026',
    certId: '76c61921-e862-4c98-b83d-e5c257679e39',
    verifyUrl: 'https://www.credly.com/badges/982246d7-2c8e-40b5-8ff8-a26fc76f7935/public_url',
    imageUrl: `${import.meta.env.BASE_URL}certificates/Networking_Devices_and_Initial_Configuration_certificate_wahidkherchache-gmail-com_76c61921-e862-4c98-b83d-e5c257679e39_page-0001.jpg`,
    status: 'VERIFIED',
    skills: [
      'NETWORK CONFIGURATION',
      'ROUTER SETUP',
      'SWITCH CONFIGURATION',
      'DEVICE MANAGEMENT',
      'CISCO IOS',
    ],
  },
];



/**
 * Certificate Card Component
 * - Displays the full certificate image with rounded corners
 * - Inside at the bottom: "Issued: [date]" box with the "VERIFY" button next to it
 * - Top corner: Issuer badge and Verified status badge
 */
function CertCard({ cert }: { cert: Certification; index: number }) {
  return (
    <article
      className="cert-card snap-center group relative rounded-2xl overflow-hidden transition-[border-color,transform,box-shadow] duration-300 ease-out border border-white/10 hover:border-ferrari-red/50 shadow-none flex flex-col bg-black/20 select-none"
      data-cursor="hover"
    >
      {/* 1. CERTIFICATE FULL PREVIEW IMAGE */}
      <div className="relative w-full overflow-hidden flex items-center justify-center select-none">
        <img
          src={cert.imageUrl}
          alt={`${cert.title} Certificate`}
          loading="lazy"
          draggable={false}
          className="w-full h-auto object-cover object-center block group-hover:scale-[1.015] transition-transform duration-500 ease-out select-none pointer-events-none"
        />

        {/* Top Header: Issuer & Verified Status Badges */}
        <div className="absolute top-3 inset-x-3 sm:top-3.5 sm:inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="cert-issuer-badge inline-flex items-center px-3 py-1 rounded-full font-mono text-[0.65rem] font-bold tracking-widest uppercase bg-black/80 backdrop-blur-md text-ferrari-gold border border-ferrari-gold/30 shadow-lg">
            {cert.issuer}
          </span>

          <span className="cert-status-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[0.65rem] font-bold tracking-widest uppercase border border-ferrari-red/50 bg-black/80 backdrop-blur-md text-ferrari-red shadow-lg">
            <CheckCircle2 size={12} />
            {cert.status}
          </span>
        </div>

        {/* Bottom Overlay: "Issued: [date]" Box + VERIFY Button (NO GRADIENT / NO SHADOW) */}
        <div className="absolute bottom-3 inset-x-3 sm:bottom-3.5 sm:inset-x-3.5 flex items-center justify-between gap-2.5 sm:gap-4 z-10">
          {/* Issued: Date Box */}
          <div className="cert-issued-box p-2 sm:p-2.5 px-3 sm:px-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 font-mono text-xs flex items-center gap-2 shadow-lg select-none">
            <span className="cert-issued-label text-ferrari-smoke/60 uppercase tracking-wider text-[0.65rem]">Issued:</span>
            <span className="cert-date font-semibold text-ferrari-smoke text-xs">{cert.date}</span>
          </div>

          {/* VERIFY Button */}
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-mono text-xs tracking-[0.2em] font-semibold uppercase text-white bg-ferrari-red hover:bg-ferrari-red-bright transition-all duration-300 shadow-red-glow group/btn shrink-0 cursor-pointer pointer-events-auto"
          >
            <span>VERIFY</span>
            <ExternalLink size={13} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef<boolean>(false);

  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < CERTIFICATIONS.length - 1;

  const goToNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, CERTIFICATIONS.length - 1));
  };

  const goToPrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToIndex = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, CERTIFICATIONS.length - 1)));
  };

  // Hand Swipe Gesture Handlers (Smooth finger swipe on phone & drag on desktop)
  const handleTouchStart = (e: React.TouchEvent) => {
    startPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startPos.current || !isDragging.current) return;
    isDragging.current = false;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startPos.current.x - endX;
    const diffY = startPos.current.y - endY;

    // Detect intentional horizontal swipe (> 35px) and ensure horizontal > vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        // Swiped Left -> go to Next
        goToNext();
      } else {
        // Swiped Right -> go to Prev
        goToPrev();
      }
    }
    startPos.current = null;
  };

  return (
    <section id="certifications" className="relative py-16 md:py-24 carbon-bg overflow-hidden">
      {/* Background ambient red glow matching Ferrari theme */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(220,0,0,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        {/* Section Heading with Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeading
            index="04"
            title="CERTIFICATIONS"
            subtitle="Official technical accreditations & security qualifications."
          />

          {/* Navigation Controls (Prev / Next Buttons) */}
          <div className="flex items-center gap-3 self-end md:self-auto mb-2">
            <button
              type="button"
              onClick={goToPrev}
              disabled={!canScrollLeft}
              aria-label="Previous Certificate"
              className={`cert-nav-btn p-3 rounded-full border transition-all duration-200 flex items-center justify-center ${
                canScrollLeft
                  ? 'cert-nav-btn-enabled border-ferrari-red/50 bg-ferrari-red/10 text-ferrari-red hover:bg-ferrari-red hover:text-white shadow-[0_0_15px_rgba(232,0,45,0.3)] cursor-pointer'
                  : 'cert-nav-btn-disabled border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              disabled={!canScrollRight}
              aria-label="Next Certificate"
              className={`cert-nav-btn p-3 rounded-full border transition-all duration-200 flex items-center justify-center ${
                canScrollRight
                  ? 'cert-nav-btn-enabled border-ferrari-red/50 bg-ferrari-red/10 text-ferrari-red hover:bg-ferrari-red hover:text-white shadow-[0_0_15px_rgba(232,0,45,0.3)] cursor-pointer'
                  : 'cert-nav-btn-disabled border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            FULL-WIDTH 1-BY-1 SLIDING CAROUSEL (DESKTOP & HAND-SWIPE ON PHONE)
        ═══════════════════════════════════════════════════════════════════════ */}
        <div
          className="relative w-full overflow-hidden rounded-2xl select-none touch-pan-y cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="certs-slider-track flex w-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
            }}
          >
            {CERTIFICATIONS.map((cert, i) => (
              <div key={cert.id} className="cert-card-wrapper w-full min-w-full shrink-0">
                <CertCard cert={cert} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators & Status Bar */}
        <div className="cert-status-divider mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5 font-mono text-xs text-ferrari-smoke/60">
          {/* Shown ONLY on Phone */}
          <div className="flex sm:hidden items-center gap-2">
            <Award size={14} className="cert-award-icon text-ferrari-gold" />
            <span className="cert-status-text tracking-wider uppercase">
              // CREDENTIAL [{activeIndex + 1} / {CERTIFICATIONS.length}]
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {CERTIFICATIONS.map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => goToIndex(pageIndex)}
                aria-label={`Go to certificate ${pageIndex + 1}`}
                className={`cert-dot transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === pageIndex
                    ? 'w-8 h-2 bg-ferrari-red shadow-[0_0_12px_rgba(232,0,45,0.8)] cert-dot-active'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40 cert-dot-inactive'
                }`}
              />
            ))}
          </div>

          <span className="cert-academy-text uppercase tracking-[0.2em] text-ferrari-gold text-[0.7rem] hidden sm:inline-block">
            Cisco Networking Academy Verified
          </span>
        </div>
      </div>
    </section>
  );
}


