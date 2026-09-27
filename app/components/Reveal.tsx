"use client";

import { useEffect } from "react";

/* Fades [data-reveal] elements up as they scroll into view. The attribute's
   value staggers siblings (in steps of 80ms). Anything already on screen at
   load is left alone, so nothing visible ever blinks out, and the page is
   fully visible without JavaScript or with reduced motion. */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const show = (el: HTMLElement) => {
      el.dataset.shown = "true";
      // Drop the reveal styles once done so hover transitions work as authored.
      const done = () => {
        el.removeEventListener("transitionend", onEnd);
        delete el.dataset.shown;
        el.style.removeProperty("--reveal-delay");
      };
      const onEnd = (e: TransitionEvent) => {
        if (e.target === el) done();
      };
      el.addEventListener("transitionend", onEnd);
      setTimeout(done, 1600);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          show(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.style.setProperty("--reveal-delay", `${Number(el.dataset.reveal || 0) * 80}ms`);
      el.dataset.shown = "false";
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return null;
}
