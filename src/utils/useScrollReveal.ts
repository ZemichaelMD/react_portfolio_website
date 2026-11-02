import { useEffect, useRef } from "react";

/**
 * useScrollReveal — attaches IntersectionObserver to elements with the
 * class names "reveal", "reveal-fade", or "reveal-left".
 * When they cross the viewport threshold, "is-visible" is added and the
 * matching CSS @keyframes animation plays.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal(root?: Element | null) {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // If reduced motion, make everything immediately visible
    if (prefersReduced) {
      const els = (root ?? document).querySelectorAll(
        ".reveal, .reveal-fade, .reveal-left",
      );
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: root ?? null,
        threshold: 0.1,
        rootMargin: "0px 0px -48px 0px",
      },
    );

    const els = (root ?? document).querySelectorAll(
      ".reveal, .reveal-fade, .reveal-left",
    );
    els.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [root]);
}
