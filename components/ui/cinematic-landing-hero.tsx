"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Optimized Film grain overlay */
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 5; opacity: 0.02; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
    will-change: transform;
  }

  /* Semiconductor Chip Styling */
  .chip-body {
    background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%);
    box-shadow: 
      inset 0 0 20px rgba(255, 201, 4, 0.05),
      0 30px 60px -12px rgba(0,0,0,0.95),
      0 0 40px rgba(255, 201, 4, 0.02);
    border: 1px solid rgba(255, 201, 4, 0.1);
    position: relative;
    will-change: transform;
  }

  .chip-pin {
    background: linear-gradient(180deg, #FFC904 0%, #C9A003 100%);
    box-shadow: 0 0 10px rgba(255, 201, 4, 0.3);
  }

  .chip-core {
    background: radial-gradient(circle at center, #222 0%, #000 100%);
    border: 1px solid rgba(255, 201, 4, 0.2);
    box-shadow: inset 0 0 15px rgba(255, 201, 4, 0.1);
  }

  .glow-line {
    position: absolute;
    background: #FFC904;
    filter: blur(1px);
    opacity: 0;
  }

  /* Text Effects */
  .text-3d-matte {
    color: #ffffff;
    text-shadow: 0 10px 30px rgba(255, 201, 4,0.15);
  }

  .text-silver-matte {
    background: linear-gradient(180deg, #FFC904 0%, rgba(255, 201, 4,0.6) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0px 10px 20px rgba(255, 201, 4,0.15));
    will-change: transform, opacity;
  }

  .premium-depth-card {
    background: linear-gradient(145deg, #0d0d0d 0%, #050505 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.95),
      inset 0 1px 1px rgba(255, 201, 4,0.1);
    border: 1px solid rgba(255, 201, 4,0.05);
    position: relative;
    will-change: transform, width, height, border-radius;
  }

  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255, 201, 4,0.1) 0%, rgba(255, 201, 4,0.02) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      0 0 0 1px rgba(255, 201, 4,0.1),
      0 20px 40px -10px rgba(0,0,0,0.8);
    will-change: transform, opacity;
  }

  .btn-scro-gold {
    background: linear-gradient(180deg, #FFC904 0%, #C9A003 100%);
    color: #000000;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 10px 20px -5px rgba(255, 201, 4,0.2);
  }
  .btn-scro-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(255, 201, 4,0.3);
  }
`;

function SemiconductorChip({ className }: { className?: string }) {
  const pins = Array.from({ length: 8 });

  return (
    <div className={cn("relative w-[300px] h-[300px] flex items-center justify-center", className)}>
      {/* Pins - Top */}
      <div className="absolute top-[-10px] w-full flex justify-around px-10">
        {pins.map((_, i) => <div key={i} className="w-2 h-[20px] chip-pin rounded-full" />)}
      </div>
      {/* Pins - Bottom */}
      <div className="absolute bottom-[-10px] w-full flex justify-around px-10">
        {pins.map((_, i) => <div key={i} className="w-2 h-[20px] chip-pin rounded-full" />)}
      </div>
      {/* Pins - Left */}
      <div className="absolute left-[-10px] h-full flex flex-col justify-around py-10">
        {pins.map((_, i) => <div key={i} className="h-2 w-[20px] chip-pin rounded-full" />)}
      </div>
      {/* Pins - Right */}
      <div className="absolute right-[-10px] h-full flex flex-col justify-around py-10">
        {pins.map((_, i) => <div key={i} className="h-2 w-[20px] chip-pin rounded-full" />)}
      </div>

      {/* Main Body */}
      <div className="w-full h-full chip-body rounded-3xl p-10 flex items-center justify-center overflow-hidden">
        {/* Heat Spreader / Core */}
        <div className="w-full h-full chip-core rounded-2xl flex flex-col items-center justify-center p-6 text-center">
          <div className="text-scro-gold font-black text-4xl mb-1 tracking-tighter">SCRO</div>
          <div className="text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">Semiconductor</div>
          <div className="mt-4 w-12 h-1 bg-scro-gold/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export interface SCROCinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function SCROCinematicHero({
  tagline1 = "Build the future of",
  tagline2 = "semiconductors.",
  cardHeading = "Precision Engineering.",
  cardDescription = (
    <>
      <span className="font-semibold" style={{ color: "#FFC904" }}>SCRO @ UCF</span> is the place to learn about the semiconductor industry. We do hands-on workshops, host guest speakers, and help you land internships. No experience needed!
    </>
  ),
  metricValue = 24,
  metricLabel = "Events Hosted",
  ctaHeading = "Join SCRO @ UCF.",
  ctaDescription = "Get involved with the semiconductor industry, pick up some new skills, and hang out with people who want to build cool hardware.",
  className,
  ...props
}: SCROCinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  // Cinematic scroll timeline
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 40, scale: 0.95, rotationX: -10 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 100, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".chip-wrapper", ".floating-badge"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.9 });

      // Intro
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .to(".text-track", { duration: 1.2, autoAlpha: 1, y: 0, scale: 1, rotationX: 0, ease: "power4.out" })
        .to(".text-days", { duration: 1, clipPath: "inset(0 0% 0 0)", ease: "power3.inOut" }, "-=0.6");

      // Scroll timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".lottie-bg"], { scale: 1.2, opacity: 0.1, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power2.inOut", duration: 1.5 })
        .fromTo(".chip-wrapper",
          { y: 200, z: -300, rotationX: 30, rotationY: -20, autoAlpha: 0, scale: 0.8 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "power3.out", duration: 2.2 }, "-=0.6"
        )
        .fromTo(".floating-badge", { y: 60, autoAlpha: 0, scale: 0.8 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.2)", duration: 1.2, stagger: 0.15 }, "-=1.5")
        .fromTo(".card-left-text", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 1.2 }, "-=1.2")
        .fromTo(".card-right-text", { x: 30, autoAlpha: 0, scale: 0.9 }, { x: 0, autoAlpha: 1, scale: 1, ease: "power3.out", duration: 1.2 }, "<")
        .to({}, { duration: 2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1 })
        .to([".chip-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.95, y: -20, autoAlpha: 0, ease: "power2.in", duration: 1, stagger: 0.04,
        })
        .to(".main-card", {
          width: isMobile ? "94vw" : "88vw",
          height: isMobile ? "94vh" : "88vh",
          borderRadius: isMobile ? "24px" : "32px",
          ease: "expo.inOut",
          duration: 1.6,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, autoAlpha: 1, ease: "expo.inOut", duration: 1.6 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 200, ease: "power2.in", duration: 1.2 });

      ScrollTrigger.refresh();
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a] text-white font-sans antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      
      {/* ── Lottie Background ── */}
      <div className="lottie-bg absolute inset-0 z-0 opacity-40 pointer-events-none">
        <DotLottieReact
          src="https://lottie.host/8e20e501-8736-4c4d-9654-8a4e8d3b844e/EsbiOdlbYg.lottie"
          loop
          autoplay
        />
      </div>

      {/* ── Tagline layer ── */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-2 uppercase">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase italic">
          {tagline2}
        </h1>
      </div>

      {/* ── CTA layer ── */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte uppercase italic">
          {ctaHeading}
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <a
            href="https://discord.gg/F9PTT3FJFS"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-scro-gold flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base uppercase tracking-widest"
          >
            Join Discord
          </a>
          <a
            href="#events"
            className="btn-scro-gold flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base uppercase tracking-widest bg-transparent border border-scro-gold/30 hover:bg-scro-gold/10"
          >
            View Events
          </a>
        </div>
      </div>

      {/* ── Main Display Card ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-silver-matte italic">
                CHIP
              </h2>
            </div>

            <div className="chip-wrapper order-2 lg:order-2 relative w-full flex items-center justify-center z-10">
              <div ref={chipRef} className="transform scale-[0.8] md:scale-110 lg:scale-125">
                <SemiconductorChip />
              </div>

              {/* Floating badges around the chip */}
              <div className="floating-badge absolute top-0 left-[-40px] floating-ui-badge rounded-2xl p-4 items-center gap-3 z-30">
                <div className="w-10 h-10 rounded-full bg-scro-gold/10 flex items-center justify-center border border-scro-gold/20">
                  <span className="text-xl">🔬</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Fabrication</p>
                  <p className="text-scro-gold/50 text-[10px] font-medium">Lab Access</p>
                </div>
              </div>

              <div className="floating-badge absolute bottom-0 right-[-40px] floating-ui-badge rounded-2xl p-4 items-center gap-3 z-30">
                <div className="w-10 h-10 rounded-full bg-scro-gold/10 flex items-center justify-center border border-scro-gold/20">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">VLSI Design</p>
                  <p className="text-scro-gold/50 text-[10px] font-medium">Active Research</p>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-tight uppercase">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-zinc-400 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-sm">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
