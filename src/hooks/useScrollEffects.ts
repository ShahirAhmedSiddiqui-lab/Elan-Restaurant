import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useScrollEffects(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 0.14 : 0.055,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoRaf: false,
      anchors: {
        duration: 1.35,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      },
    });
    const scrollWindow = window as Window & { __elanLenis?: Lenis };
    scrollWindow.__elanLenis = lenis;

    const offLenisScroll = lenis.on('scroll', ScrollTrigger.update);
    const resizeLenis = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', resizeLenis);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener('refresh', resizeLenis);
        offLenisScroll();
        gsap.ticker.remove(tick);
        if (scrollWindow.__elanLenis === lenis) delete scrollWindow.__elanLenis;
        lenis.destroy();
      };
    }

    const ctx = gsap.context(() => {
      const contents = gsap.utils.toArray<HTMLElement>('[data-section-content]');
      const cards = gsap.utils.toArray<HTMLElement>('[data-depth-card]');
      const mediaLayers = gsap.utils.toArray<HTMLElement>('[data-parallax-media]:not([data-ambient-parallax])');
      const veil = '#section-transition-veil';

      gsap.set(contents, {
        autoAlpha: 1,
        transformPerspective: 1500,
        transformOrigin: 'center center',
      });
      gsap.set(cards, {
        transformPerspective: 1100,
        transformOrigin: 'center center',
      });
      gsap.set(veil, { autoAlpha: 0, scaleX: 0, transformOrigin: 'left center' });

      const sweepSection = () => {
        gsap.killTweensOf(veil);
        gsap.timeline()
          .set(veil, { autoAlpha: 1, scaleX: 0, transformOrigin: 'left center' })
          .to(veil, { scaleX: 1, duration: 0.55, ease: 'power3.out' })
          .to(veil, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, '-=0.18');
      };

      contents.forEach((content, index) => {
        const section = content.closest('section, footer') as HTMLElement | null;
        if (!section) return;

        const revealItems = Array.from(
          content.querySelectorAll<HTMLElement>('span, h1, h2, h3, p, a, button, label, form > *'),
        );

        gsap.fromTo(
          revealItems,
          { autoAlpha: 0, y: 42, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            stagger: 0.045,
            clearProps: 'filter',
            scrollTrigger: {
              trigger: section,
              start: index === 0 ? 'top 68%' : 'top 76%',
              once: true,
            },
          },
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.75,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(
            content,
            { autoAlpha: 0.42, y: 150, z: -160, rotateX: 9, scale: 0.94 },
            { autoAlpha: 1, y: 0, z: 0, rotateX: 0, scale: 1, duration: 0.44, ease: 'none' },
          )
          .to(content, { autoAlpha: 0.62, y: -120, z: -120, rotateX: -7, scale: 0.96, duration: 0.56, ease: 'none' });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 52%',
          end: 'bottom 48%',
          onEnter: sweepSection,
          onEnterBack: sweepSection,
        });
      });

      mediaLayers.forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -14, scale: 1.08 },
          {
            yPercent: 14,
            scale: 1.16,
            ease: 'none',
            scrollTrigger: {
              trigger: layer.closest('section') || layer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 86, rotateX: 14, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.25,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });

      gsap.to('[data-ambient-parallax]', {
        yPercent: -26,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.site-depth-haze', {
        yPercent: 20,
        autoAlpha: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: 'main',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      const setHazeScale = gsap.quickTo('.site-depth-haze', 'scale', { duration: 0.55, ease: 'power3.out' });
      const setHazeOpacity = gsap.quickTo('.site-depth-haze', 'autoAlpha', { duration: 0.55, ease: 'power3.out' });

      ScrollTrigger.create({
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const pressure = Math.min(Math.abs(self.getVelocity()) / 4200, 1);
          setHazeScale(1 + pressure * 0.08);
          setHazeOpacity(0.45 + pressure * 0.42);
        },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('load', refresh);
      ScrollTrigger.removeEventListener('refresh', resizeLenis);
      offLenisScroll();
      ctx.revert();
      gsap.ticker.remove(tick);
      if (scrollWindow.__elanLenis === lenis) delete scrollWindow.__elanLenis;
      lenis.destroy();
    };
  }, [enabled]);
}
