"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Film grain overlay */
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  /* SCRO gold circuit grid */
  .bg-grid-theme {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(255,213,30,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,213,30,0.06) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Outside card: white headline */
  .text-3d-matte {
    color: #ffffff;
    text-shadow:
      0 10px 30px rgba(255,213,30,0.18),
      0 2px 4px rgba(255,213,30,0.08);
  }

  /* Outside card: gold gradient tagline */
  .text-silver-matte {
    background: linear-gradient(180deg, #FFD51E 0%, rgba(255,213,30,0.5) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 10px 20px rgba(255,213,30,0.22))
      drop-shadow(0px 2px 4px rgba(255,213,30,0.12));
  }

  /* Inside card: SCRO gold brand text */
  .text-card-silver-matte {
    background: linear-gradient(180deg, #FFD51E 0%, #A07A00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 12px 28px rgba(0,0,0,0.95))
      drop-shadow(0px 4px 8px rgba(0,0,0,0.8));
  }

  /* Deep physical card — SCRO dark gold tint */
  .premium-depth-card {
    background: linear-gradient(145deg, #120d00 0%, #060606 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.98),
      0 20px 40px -20px rgba(0,0,0,0.9),
      inset 0 1px 2px rgba(255,213,30,0.14),
      inset 0 -2px 4px rgba(0,0,0,0.9);
    border: 1px solid rgba(255,213,30,0.07);
    position: relative;
  }

  /* Mouse-tracked gold sheen */
  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,213,30,0.05) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* iPhone bezel */
  .iphone-bezel {
    background-color: #0d0d0d;
    box-shadow:
      inset 0 0 0 2px #2a2a2a,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.95),
      0 15px 25px -5px rgba(0,0,0,0.8),
      0 0 60px rgba(255,213,30,0.04);
    transform-style: preserve-3d;
  }

  .hardware-btn {
    background: linear-gradient(90deg, #2a2a2a 0%, #111 100%);
    box-shadow:
      -2px 0 5px rgba(0,0,0,0.9),
      inset -1px 0 1px rgba(255,255,255,0.08),
      inset 1px 0 2px rgba(0,0,0,0.9);
    border-left: 1px solid rgba(255,255,255,0.03);
  }

  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow:
      0 10px 20px rgba(0,0,0,0.4),
      inset 0 1px 1px rgba(255,213,30,0.06),
      inset 0 -1px 1px rgba(0,0,0,0.6);
    border: 1px solid rgba(255,213,30,0.07);
  }

  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255,213,30,0.08) 0%, rgba(255,213,30,0.02) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(255,213,30,0.12),
      0 25px 50px -12px rgba(0,0,0,0.85),
      inset 0 1px 1px rgba(255,213,30,0.15),
      inset 0 -1px 1px rgba(0,0,0,0.6);
  }

  /* CTA buttons */
  .btn-scro-gold {
    background: linear-gradient(180deg, #FFD51E 0%, #CCAA18 100%);
    color: #000000;
    transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 0 0 1px rgba(255,213,30,0.3), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(255,213,30,0.25), inset 0 1px 1px rgba(255,255,255,0.5);
  }
  .btn-scro-gold:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px rgba(255,213,30,0.5), 0 6px 12px -2px rgba(0,0,0,0.3), 0 20px 32px -6px rgba(255,213,30,0.35), inset 0 1px 1px rgba(255,255,255,0.5);
  }
  .btn-scro-gold:active { transform: translateY(1px); }

  .btn-scro-dark {
    background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
    color: #FFD51E;
    border: 1px solid rgba(255,213,30,0.35);
    transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.7), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,213,30,0.08);
  }
  .btn-scro-dark:hover {
    transform: translateY(-3px);
    border-color: rgba(255,213,30,0.7);
    box-shadow: 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), 0 0 30px rgba(255,213,30,0.12), inset 0 1px 1px rgba(255,213,30,0.1);
  }
  .btn-scro-dark:active { transform: translateY(1px); }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }
`;

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
  cardHeading = "Jumpstart your career.",
  cardDescription = (
    <>
      <span className="font-semibold" style={{ color: "#FFD51E" }}>SCRO @ UCF</span> is the place to learn about the semiconductor industry. We do hands-on workshops, host guest speakers, and help you land internships. No experience needed!
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
  const mockupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mouse parallax tilt on mockup
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cinematic scroll timeline — useLayoutEffect prevents React Strict Mode double-mount crash
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Intro: text appears on load
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll-pinned cinematic sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

      ScrollTrigger.refresh();
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-transparent text-white font-sans antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      {/* ── Tagline layer ── */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* ── CTA layer (revealed after card pullback) ── */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-[rgba(255,255,255,0.65)] text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Join Discord */}
          <a
            href="https://discord.gg/F9PTT3FJFS"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-scro-gold flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] font-bold text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join Discord
          </a>
          {/* View Events */}
          <a
            href="#events"
            className="btn-scro-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] font-bold text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            View Events
          </a>
        </div>
      </div>

      {/* ── Physical deep card ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Right col / top mobile: SCRO brand name */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte">
                SCRO
              </h2>
            </div>

            {/* Center: phone mockup */}
            <div
              className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] bg-[#030303] rounded-[2.5rem] overflow-hidden text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD51E] shadow-[0_0_8px_rgba(255,213,30,0.9)] animate-pulse" />
                    </div>

                    {/* App UI */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      {/* Header */}
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[rgba(255,213,30,0.5)] uppercase tracking-widest font-bold mb-1">Dashboard</span>
                          <span className="text-xl font-bold tracking-tight text-white">Career Hub</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[rgba(255,213,30,0.08)] text-[#FFD51E] flex items-center justify-center font-bold text-sm border border-[rgba(255,213,30,0.2)] shadow-lg">SC</div>
                      </div>

                      {/* Progress ring */}
                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,213,30,0.06)" strokeWidth="12" />
                          <circle
                            className="progress-ring"
                            cx="88" cy="88" r="64"
                            fill="none"
                            stroke="#FFD51E"
                            strokeWidth="12"
                          />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-[rgba(255,213,30,0.45)] uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      {/* Widgets */}
                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(255,213,30,0.15)] to-[rgba(255,213,30,0.03)] flex items-center justify-center mr-3 border border-[rgba(255,213,30,0.15)]">
                            {/* Chip icon */}
                            <svg className="w-4 h-4 text-[#FFD51E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="7" y="7" width="10" height="10" rx="1" strokeWidth="2" />
                              <path strokeWidth="2" d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-24 bg-[rgba(255,213,30,0.2)] rounded-full mb-2" />
                            <div className="h-1.5 w-14 bg-[rgba(255,255,255,0.08)] rounded-full" />
                          </div>
                          <div className="w-4 h-4 rounded-full bg-[#FFD51E] flex items-center justify-center ml-2">
                            <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(255,213,30,0.15)] to-[rgba(255,213,30,0.03)] flex items-center justify-center mr-3 border border-[rgba(255,213,30,0.15)]">
                            {/* Network/people icon */}
                            <svg className="w-4 h-4 text-[#FFD51E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-[rgba(255,213,30,0.2)] rounded-full mb-2" />
                            <div className="h-1.5 w-28 bg-[rgba(255,255,255,0.08)] rounded-full" />
                          </div>
                          <div className="w-4 h-4 rounded-full bg-[#FFD51E] flex items-center justify-center ml-2">
                            <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </div>
                      </div>

                      {/* Home bar */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-[rgba(255,213,30,0.15)] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[rgba(255,213,30,0.08)] flex items-center justify-center border border-[rgba(255,213,30,0.2)]">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🔬</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Industry Ready</p>
                    <p className="text-[rgba(255,213,30,0.45)] text-[10px] lg:text-xs font-medium">Milestone unlocked</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[rgba(255,213,30,0.08)] flex items-center justify-center border border-[rgba(255,213,30,0.2)]">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">⚡</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">UCF Chapter</p>
                    <p className="text-[rgba(255,213,30,0.45)] text-[10px] lg:text-xs font-medium">Spring 2025 active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left col / bottom mobile: description */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-[rgba(255,255,255,0.6)] text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
