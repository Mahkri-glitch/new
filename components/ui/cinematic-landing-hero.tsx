"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Optimized Film grain overlay - using a simpler noise pattern */
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 5; opacity: 0.03; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
    will-change: transform;
  }

  /* SCRO gold circuit grid */
  .bg-grid-theme {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(255, 201, 4,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 201, 4,0.06) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
    will-change: opacity, transform;
  }

  /* Outside card: white headline */
  .text-3d-matte {
    color: #ffffff;
    text-shadow: 0 10px 30px rgba(255, 201, 4,0.15);
  }

  /* Outside card: gold gradient tagline */
  .text-silver-matte {
    background: linear-gradient(180deg, #FFC904 0%, rgba(255, 201, 4,0.6) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0px 10px 20px rgba(255, 201, 4,0.15));
    will-change: transform, opacity;
  }

  /* Inside card: SCRO gold brand text */
  .text-card-silver-matte {
    background: linear-gradient(180deg, #FFC904 0%, #A07A00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0px 12px 28px rgba(0,0,0,0.8));
    will-change: transform, opacity;
  }

  /* Deep physical card */
  .premium-depth-card {
    background: linear-gradient(145deg, #0d0d0d 0%, #050505 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.95),
      inset 0 1px 1px rgba(255, 201, 4,0.1);
    border: 1px solid rgba(255, 201, 4,0.05);
    position: relative;
    will-change: transform, width, height, border-radius;
  }

  /* Mouse-tracked gold sheen */
  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 201, 4,0.05) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* iPhone bezel */
  .iphone-bezel {
    background-color: #0d0d0d;
    box-shadow:
      inset 0 0 0 2px #222,
      inset 0 0 0 7px #000,
      0 30px 60px -10px rgba(0,0,0,0.9),
      0 0 40px rgba(255, 201, 4,0.03);
    transform-style: preserve-3d;
    will-change: transform;
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

  /* CTA buttons */
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

  .btn-scro-dark {
    background: #111;
    color: #FFC904;
    border: 1px solid rgba(255, 201, 4,0.3);
    transition: all 0.3s ease;
  }
  .btn-scro-dark:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 201, 4,0.6);
    background: #1a1a1a;
  }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
    will-change: stroke-dashoffset;
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
  const mockupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mouse parallax tilt on mockup
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.5) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 8,
            rotationX: -yVal * 8,
            ease: "power2.out",
            duration: 0.8,
            overwrite: "auto",
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

  // Cinematic scroll timeline
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Use simpler initial states for performance
      gsap.set(".text-track", { autoAlpha: 0, y: 40, scale: 0.95, rotationX: -10 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 100, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.9 });

      // Intro: faster text appearance
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .to(".text-track", { duration: 1.2, autoAlpha: 1, y: 0, scale: 1, rotationX: 0, ease: "power4.out" })
        .to(".text-days", { duration: 1, clipPath: "inset(0 0% 0 0)", ease: "power3.inOut" }, "-=0.6");

      // Optimized scroll-pinned cinematic sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000", // Reduced from 7000 for snappier feel
          pin: true,
          scrub: 0.8, // Slightly more responsive scrub
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.1, opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power2.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 200, z: -300, rotationX: 30, rotationY: -20, autoAlpha: 0, scale: 0.8 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "power3.out", duration: 2.2 }, "-=0.6"
        )
        .fromTo(".phone-widget", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out", duration: 1.2 }, "-=1.2")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 1.8, ease: "power2.inOut" }, "-=1")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1.8, ease: "power2.out" }, "-=1.8")
        .fromTo(".floating-badge", { y: 60, autoAlpha: 0, scale: 0.8 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.2)", duration: 1.2, stagger: 0.15 }, "-=1.5")
        .fromTo(".card-left-text", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: 1.2 }, "-=1.2")
        .fromTo(".card-right-text", { x: 30, autoAlpha: 0, scale: 0.9 }, { x: 0, autoAlpha: 1, scale: 1, ease: "power3.out", duration: 1.2 }, "<")
        .to({}, { duration: 2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
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

      {/* ── CTA layer ── */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
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
            className="btn-scro-gold flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base"
          >
            Join Discord
          </a>
          <a
            href="#events"
            className="btn-scro-dark flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base"
          >
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
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte">
                SCRO
              </h2>
            </div>

            <div
              className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  <div className="absolute inset-[7px] bg-[#030303] rounded-[2.5rem] overflow-hidden text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3" />

                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-scro-gold/50 uppercase tracking-widest font-bold mb-1">Dashboard</span>
                          <span className="text-xl font-bold tracking-tight text-white">Career Hub</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-scro-gold/10 text-scro-gold flex items-center justify-center font-bold text-sm border border-scro-gold/20 shadow-lg">SC</div>
                      </div>

                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255, 201, 4,0.06)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#FFC904" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-scro-gold/50 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-scro-gold/10 flex items-center justify-center mr-3 border border-scro-gold/15">
                            <svg className="w-4 h-4 text-[#FFC904]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="7" y="7" width="10" height="10" rx="1" strokeWidth="2" />
                              <path strokeWidth="2" d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-24 bg-scro-gold/20 rounded-full mb-2" />
                            <div className="h-1.5 w-14 bg-white/5 rounded-full" />
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-scro-gold/10 flex items-center justify-center mr-3 border border-scro-gold/15">
                            <svg className="w-4 h-4 text-[#FFC904]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-scro-gold/20 rounded-full mb-2" />
                            <div className="h-1.5 w-28 bg-white/5 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[3px] bg-scro-gold/20 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-scro-gold/10 flex items-center justify-center border border-scro-gold/20">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🔬</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Industry Ready</p>
                    <p className="text-scro-gold/50 text-[10px] lg:text-xs font-medium">Milestone unlocked</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-scro-gold/10 flex items-center justify-center border border-scro-gold/20">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">⚡</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">UCF Chapter</p>
                    <p className="text-scro-gold/50 text-[10px] lg:text-xs font-medium">Spring 2025 active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-zinc-400 text-sm md:text-base lg:text-lg font-medium leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
