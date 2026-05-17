import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function SmileyAvatar({ gradientStart = "#f8f3f3", gradientEnd = "#f8f3f3" }) {
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    // Guard: ensure refs are mounted before animating
    if (!leftPupil.current || !rightPupil.current) return;

    /* ---------- BLINKING ---------- */
    const blink = gsap.timeline({
      repeat: -1,
      repeatDelay: 3 + Math.random() * 2,
    });

    blink.to([leftPupil.current, rightPupil.current], {
      scaleY: 0.1,
      duration: 0.08,
      transformOrigin: "center",
    });

    blink.to([leftPupil.current, rightPupil.current], {
      scaleY: 1,
      duration: 0.12,
    });

    /* ---------- EYE FOLLOW CURSOR ---------- */
    const pupils = [leftPupil.current, rightPupil.current];

    const onMouseMove = (e) => {
      pupils.forEach((pupil) => {
        if (!pupil) return;

        const bounds = pupil.getBoundingClientRect();

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const maxMove = 4;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) return;

        gsap.to(pupil, {
          x: (dx / distance) * maxMove,
          y: (dy / distance) * maxMove,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      blink.kill(); 
    };
  }, []); 

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 200 200"
      style={{ borderRadius: "24px" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientStart} />
          <stop offset="100%" stopColor={gradientEnd} />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="#fff" stroke={`url(#${gradientId})`} strokeWidth="10" />
      <circle ref={leftPupil} cx="70" cy="80" r="16" fill="#111" />
      <circle ref={rightPupil} cx="130" cy="80" r="16" fill="#111" />

      <path
        d="M62 132 Q100 170 138 132"
        stroke="#111"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
