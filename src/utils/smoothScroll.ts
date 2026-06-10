type LenisHandle = {
  scrollTo: (
    target: HTMLElement | string | number,
    options?: {
      duration?: number;
      easing?: (time: number) => number;
    },
  ) => void;
};

export function scrollToSectionId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = (window as Window & { __elanLenis?: LenisHandle }).__elanLenis;
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
