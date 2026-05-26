import { useEffect, useRef, useState } from "react";
import waxSealImg from "@/assets/wax-seal.png";

interface Props {
  name: string;
  onComplete: () => void;
}

const KEYFRAMES = `
@keyframes ec-paper-in {
  0% { transform: translate(-50%, 30px) scale(0.9); opacity: 0; }
  100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
}
@keyframes ec-paper-into-envelope {
  0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(-50%, 200px) scale(0.95); opacity: 0; }
}
@keyframes ec-flap-close {
  0% { transform: rotateX(-160deg); }
  100% { transform: rotateX(0deg); }
}
@keyframes ec-ink-spread {
  0% { filter: blur(2px); opacity: 0; }
  100% { filter: blur(0); opacity: 1; }
}
@keyframes ec-cursor-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes ec-wax-drop {
  0%   { transform: translate(-50%, -140px) scale(2.4) rotate(-8deg); opacity: 0; }
  40%  { opacity: 1; }
  75%  { transform: translate(-50%, 8px) scale(0.9) rotate(2deg); opacity: 1; }
  88%  { transform: translate(-50%, -3px) scale(1.05) rotate(-1deg); opacity: 1; }
  100% { transform: translate(-50%, 0) scale(1) rotate(0deg); opacity: 1; }
}
@keyframes ec-wax-pulse {
  0%, 100% { filter: drop-shadow(0 6px 12px rgba(139,0,0,0.55)); }
  50%      { filter: drop-shadow(0 0 28px rgba(220,30,30,0.95)); }
}
@keyframes ec-envelope-thump {
  0%   { transform: translateX(-50%) translateY(0) scale(1); }
  30%  { transform: translateX(-50%) translateY(6px) scale(0.985); }
  60%  { transform: translateX(-50%) translateY(-2px) scale(1.005); }
  100% { transform: translateX(-50%) translateY(0) scale(1); }
}
@keyframes ec-envelope-fly {
  0%   { transform: translateX(-50%) translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
  15%  { transform: translateX(-50%) translate(18px, -22px) rotate(5deg) scale(1.03); opacity: 1; }
  55%  { transform: translateX(-50%) translate(260px, -260px) rotate(20deg) scale(0.7); opacity: 0.9; }
  100% { transform: translateX(-50%) translate(640px, -640px) rotate(38deg) scale(0.2); opacity: 0; }
}
@keyframes ec-scene-out {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
`;

export const EnvelopeCinematic = ({ name, onComplete }: Props) => {
  const [stage, setStage] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const paperRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const FONT_HREF =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap";
    let link = document.head.querySelector<HTMLLinkElement>(
      `link[href="${FONT_HREF}"]`
    );
    let appended = false;
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONT_HREF;
      document.head.appendChild(link);
      appended = true;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStage(1), 50)); // paper in
    timers.push(setTimeout(() => setStage(2), 600)); // typing
    const typingMs = name.length * 120 + 200;
    timers.push(setTimeout(() => setTypingDone(true), 600 + typingMs));
    timers.push(
      setTimeout(() => {
        // Stage 3: lower paper z-index then fold-into-envelope
        if (paperRef.current) paperRef.current.style.zIndex = "5";
        setStage(3);
      }, 3000)
    );
    timers.push(setTimeout(() => setStage(4), 4400)); // wax drop
    timers.push(
      setTimeout(() => {
        setStage(5); // envelope flies away
        if (envelopeRef.current) {
          envelopeRef.current.style.animation =
            "ec-envelope-fly 1200ms cubic-bezier(0.5, 0, 0.75, 0) forwards";
        }
      }, 6200)
    );
    timers.push(setTimeout(() => setStage(6), 7200)); // scene out
    timers.push(setTimeout(() => onComplete(), 7800));

    return () => {
      timers.forEach(clearTimeout);
      if (appended && link?.parentNode) link.parentNode.removeChild(link);
    };
  }, [name, onComplete]);

  const letters = name.split("");

  // Flap state
  // Stage 1-2: open. Stage 3: closing. Stage 4+: closed.
  let flapStyle: React.CSSProperties = {
    transform: "rotateX(-160deg)",
  };
  if (stage >= 4) {
    flapStyle = { transform: "rotateX(0deg)" };
  } else if (stage === 3) {
    flapStyle = {
      animation: "ec-flap-close 600ms ease-in-out 700ms forwards",
      transform: "rotateX(-160deg)",
    };
  }

  // Paper animation
  let paperAnim: string | undefined;
  if (stage === 1 || stage === 2) {
    paperAnim = "ec-paper-in 600ms ease-out forwards";
  } else if (stage === 3) {
    paperAnim = "ec-paper-into-envelope 1100ms ease-in forwards";
  }

  const showPaper = stage >= 1 && stage <= 3;
  const showSeal = stage >= 4;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        id="scene"
        className="relative"
        style={{
          width: "480px",
          height: "440px",
          margin: "0 auto",
          animation:
            stage === 6 ? "ec-scene-out 400ms ease-out forwards" : undefined,
        }}
      >
        <style>{KEYFRAMES}</style>

      {/* letter paper - in front of envelope initially */}
      {showPaper && (
        <div
          id="letter-paper"
          ref={paperRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "-80px",
            transform: "translate(-50%, 30px) scale(0.9)",
            opacity: 0,
            zIndex: 20,
            width: "380px",
            height: "300px",
            background: "#f5f0e0",
            borderTop: "6px double #8b1a1a",
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 32px, rgba(139,26,26,0.18) 32px, rgba(139,26,26,0.18) 33px)",
            boxShadow: "0 14px 30px rgba(0,0,0,0.5)",
            borderRadius: "4px",
            padding: "32px 28px",
            animation: paperAnim,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: '"Noto Serif KR", serif',
              color: "#5b1414",
              fontSize: "1.25rem",
              margin: 0,
              opacity: 0.85,
            }}
          >
            진실을 말하는 자는
          </p>
          <p
            id="typed-name"
            style={{
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 700,
              color: "#8b1a1a",
              fontSize: "3.5rem",
              margin: 0,
              lineHeight: 1,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {stage >= 2 &&
              letters.map((c, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    animation: `ec-ink-spread 150ms ease-out ${i * 120}ms forwards`,
                  }}
                >
                  {c}
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
          </p>
        </div>
      )}

      {/* envelope */}
      <div
        id="envelope"
        ref={envelopeRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "80px",
          transform: "translateX(-50%)",
          width: "480px",
          height: "320px",
          zIndex: 10,
          perspective: "1200px",
        }}
      >
        {/* envelope body */}
        <div
          id="envelope-body"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #c4a882, #b59770 60%, #c4a882)",
            borderRadius: "4px",
            zIndex: 10,
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.7), inset 0 -10px 20px rgba(0,0,0,0.15)",
            border: "1px solid rgba(80,55,30,0.4)",
          }}
        >
          {/* central seal placeholder ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              border: "1px dashed rgba(80,40,20,0.25)",
            }}
          />
        </div>

        {/* envelope flap */}
        <div
          id="envelope-flap"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "180px",
            background:
              "linear-gradient(180deg, #b59770 0%, #a4855c 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
            transformOrigin: "top center",
            zIndex: 15,
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))",
            ...flapStyle,
          }}
        />

        {/* wax seal image - lives inside envelope so it flies away together */}
        {showSeal && (
          <img
            src={waxSealImg}
            alt=""
            id="wax-seal"
            style={{
              position: "absolute",
              top: "160px",
              left: "50%",
              transform: "translate(-50%, 0) scale(1)",
              width: "140px",
              height: "140px",
              zIndex: 30,
              pointerEvents: "none",
              userSelect: "none",
              animation:
                "ec-wax-drop 1000ms cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards, ec-stamp-shake 250ms ease-in-out 1000ms, ec-wax-pulse 900ms ease-in-out 1250ms",
            }}
          />
        )}
      </div>
      </div>
    </div>
  );
};

export default EnvelopeCinematic;