import { useEffect, useState } from "react";

interface Props {
  name: string;
  onComplete: () => void;
}

const KEYFRAMES = `
@keyframes ec-letter-up {
  0% { transform: translateY(40%); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(-85%); opacity: 1; }
}
@keyframes ec-letter-down {
  0% { transform: translateY(-85%) rotateX(-180deg); opacity: 1; }
  100% { transform: translateY(40%) rotateX(-180deg); opacity: 0; }
}
@keyframes ec-letter-fold {
  0% { transform: translateY(-85%) rotateX(0deg); }
  100% { transform: translateY(-85%) rotateX(-180deg); }
}
@keyframes ec-ink-spread {
  0% { filter: blur(2px); opacity: 0; }
  100% { filter: blur(0); opacity: 1; }
}
@keyframes ec-cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes ec-flap-open {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(-180deg); }
}
@keyframes ec-flap-close {
  0% { transform: rotateX(-180deg); }
  100% { transform: rotateX(0deg); }
}
@keyframes ec-wax-drop {
  0% { transform: translate(-50%, calc(-50% - 60px)) scale(2.5); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}
@keyframes ec-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}
@keyframes ec-seal-glow {
  0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.9; }
  100% { transform: translate(-50%, -50%) scale(3.2); opacity: 0; }
}
@keyframes ec-wax-split-left {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(-110deg); }
}
@keyframes ec-wax-split-right {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(110deg); }
}
@keyframes ec-particle {
  0% { transform: translate(-50%, -50%); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))); opacity: 0; }
}
@keyframes ec-fade-out {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
`;

export const EnvelopeCinematic = ({ name, onComplete }: Props) => {
  const [stage, setStage] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const FONT_HREF = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap";
    let link = document.head.querySelector<HTMLLinkElement>(`link[href="${FONT_HREF}"]`);
    let appended = false;
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONT_HREF;
      document.head.appendChild(link);
      appended = true;
    }

    const typingMs = name.length * 120 + 200;
    const timers = [
      setTimeout(() => setStage(1), 50),
      setTimeout(() => setStage(2), 800),
      setTimeout(() => setTypingDone(true), 800 + typingMs),
      setTimeout(() => setStage(3), 3200),
      setTimeout(() => setStage(4), 4600),
      setTimeout(() => setStage(5), 5600),
      setTimeout(() => setStage(6), 6800),
      setTimeout(() => onComplete(), 7400),
    ];
    return () => {
      timers.forEach(clearTimeout);
      if (appended && link?.parentNode) link.parentNode.removeChild(link);
    };
  }, [name, onComplete]);

  const letters = name.split("");
  const showLetter = stage >= 1 && stage <= 3;
  const showSeal = stage >= 4;

  // Particles
  const particles = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i / 6) * Math.PI * 2 + 0.3;
    const dist = 90 + (i % 3) * 25;
    return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, key: i };
  });

  return (
    <div className="relative" style={{ perspective: "1400px" }}>
      <style>{KEYFRAMES}</style>
      <div
        style={{
          animation:
            stage === 6 ? "ec-fade-out 400ms ease-out forwards" : undefined,
        }}
      >
        <div
          style={{
            animation: stage === 4 ? "ec-shake 300ms ease-in-out 700ms" : undefined,
          }}
        >
          <div
            className="relative w-[500px] h-[340px] md:w-[700px] md:h-[460px] bg-gradient-to-br from-parchment via-parchment-dark to-parchment rounded-sm shadow-[0_0_80px_rgba(0,0,0,1),0_0_120px_rgba(139,0,0,0.5)] border-2 border-parchment-dark/50"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Letter paper */}
            {showLetter && (
              <div
                className="absolute left-1/2 top-[8%] z-10"
                style={{
                  width: "78%",
                  height: "100%",
                  transform: "translateX(-50%)",
                  transformStyle: "preserve-3d",
                  perspective: "1200px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    animation:
                      stage === 1
                        ? "ec-letter-up 800ms ease-out forwards"
                        : stage === 2
                        ? "ec-letter-up 800ms ease-out forwards"
                        : stage === 3
                        ? "ec-letter-fold 600ms ease-in-out forwards, ec-letter-down 600ms ease-in 700ms forwards"
                        : undefined,
                    transform: stage === 2 ? "translateY(-85%)" : undefined,
                  }}
                >
                  <div
                    className="w-full h-full rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    style={{
                      background: "#f5f0e0",
                      borderTop: "6px double #8b1a1a",
                      backgroundImage:
                        "repeating-linear-gradient(transparent, transparent 32px, rgba(139,26,26,0.18) 32px, rgba(139,26,26,0.18) 33px)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex items-center justify-center h-full px-6">
                      <div
                        className="flex items-baseline"
                        style={{
                          fontFamily: '"Dancing Script", cursive',
                          fontSize: "3rem",
                          fontWeight: 700,
                          color: "#8b1a1a",
                          lineHeight: 1,
                        }}
                      >
                        {stage >= 2 &&
                          letters.map((char, i) => (
                            <span
                              key={i}
                              style={{
                                display: "inline-block",
                                opacity: 0,
                                animation: `ec-ink-spread 150ms ease-out ${i * 120}ms forwards`,
                              }}
                            >
                              {char}
                            </span>
                          ))}
                        {stage === 2 && !typingDone && (
                          <span
                            style={{
                              marginLeft: "4px",
                              animation: "ec-cursor-blink 600ms steps(1) infinite",
                            }}
                          >
                            |
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Envelope flap (front) */}
            <div
              className="absolute top-0 left-0 right-0 w-0 h-0 z-20 border-l-[250px] md:border-l-[350px] border-r-[250px] md:border-r-[350px] border-t-[200px] md:border-t-[260px] border-l-transparent border-r-transparent border-t-parchment-dark"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
                animation:
                  stage === 1
                    ? "ec-flap-open 400ms ease-out forwards"
                    : stage === 3
                    ? "ec-flap-close 500ms ease-in-out 900ms forwards"
                    : stage === 5
                    ? "ec-flap-open 400ms ease-out forwards"
                    : undefined,
                transform:
                  stage === 2 || stage === 1
                    ? "rotateX(-180deg)"
                    : stage === 4
                    ? "rotateX(0deg)"
                    : stage >= 5
                    ? "rotateX(-180deg)"
                    : undefined,
              }}
            />

            {/* Wax seal - solid (stage 4) */}
            {showSeal && stage < 5 && (
              <>
                <div
                  className="absolute top-1/2 left-1/2 z-40 rounded-full"
                  style={{
                    width: "90px",
                    height: "90px",
                    background:
                      "radial-gradient(circle at 35% 35%, #b22222, #8b0000 55%, #4a0000)",
                    boxShadow:
                      "0 0 40px rgba(139,0,0,0.9), inset 0 -8px 20px rgba(0,0,0,0.55), inset 0 6px 14px rgba(255,255,255,0.15)",
                    animation:
                      "ec-wax-drop 800ms cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 z-30 rounded-full pointer-events-none"
                  style={{
                    width: "90px",
                    height: "90px",
                    background:
                      "radial-gradient(circle, rgba(139,0,0,0.85), rgba(139,0,0,0))",
                    animation: "ec-seal-glow 900ms ease-out 750ms forwards",
                    opacity: 0,
                  }}
                />
              </>
            )}

            {/* Wax cracking (stage 5+) */}
            {stage >= 5 && (
              <div
                className="absolute top-1/2 left-1/2 z-40 pointer-events-none"
                style={{
                  transform: "translate(-50%, -50%)",
                  width: "90px",
                  height: "90px",
                  transformStyle: "preserve-3d",
                  perspective: "600px",
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full"
                  style={{
                    width: "50%",
                    background:
                      "radial-gradient(circle at right, #b22222, #8b0000 55%, #4a0000)",
                    borderTopLeftRadius: "90px",
                    borderBottomLeftRadius: "90px",
                    transformOrigin: "right center",
                    animation: "ec-wax-split-left 800ms ease-out forwards",
                    boxShadow: "inset 0 -6px 14px rgba(0,0,0,0.5)",
                  }}
                />
                <div
                  className="absolute top-0 right-0 h-full"
                  style={{
                    width: "50%",
                    background:
                      "radial-gradient(circle at left, #b22222, #8b0000 55%, #4a0000)",
                    borderTopRightRadius: "90px",
                    borderBottomRightRadius: "90px",
                    transformOrigin: "left center",
                    animation: "ec-wax-split-right 800ms ease-out forwards",
                    boxShadow: "inset 0 -6px 14px rgba(0,0,0,0.5)",
                  }}
                />
                {particles.map((p) => (
                  <div
                    key={p.key}
                    className="absolute top-1/2 left-1/2 rounded-full"
                    style={{
                      width: "5px",
                      height: "5px",
                      background: "#c0392b",
                      boxShadow: "0 0 6px rgba(192,57,43,0.8)",
                      ["--dx" as never]: `${p.dx}px`,
                      ["--dy" as never]: `${p.dy}px`,
                      animation: `ec-particle 800ms ease-out forwards`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeCinematic;