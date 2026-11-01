import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";

const Ending = () => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-background via-accent/20 to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Celebratory background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blood/5 to-accent/10" />
      
      {/* Multiple glowing orbs */}
      <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blood/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Confetti particles */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 animate-confetti-fall"
          style={{
            left: `${particle.left}%`,
            top: '-10%',
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
      
      {/* Floating sparkles */}
      <div className="absolute top-1/4 left-1/4 text-yellow-400 text-4xl animate-float opacity-70">✨</div>
      <div className="absolute top-1/3 right-1/4 text-yellow-400 text-5xl animate-float opacity-70" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute bottom-1/4 left-1/3 text-yellow-400 text-3xl animate-float opacity-70" style={{ animationDelay: '2s' }}>✨</div>
      <div className="absolute bottom-1/3 right-1/3 text-yellow-400 text-4xl animate-float opacity-70" style={{ animationDelay: '1.5s' }}>💫</div>
      
      <div className="max-w-4xl w-full space-y-8 md:space-y-12 animate-fade-in relative z-10 text-center">
        {/* Success message */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-parchment via-parchment-dark to-parchment rounded-lg p-8 md:p-12 shadow-[0_0_80px_rgba(139,0,0,0.5)] border-4 border-primary/30">
            <div className="space-y-6">
              <p className="text-2xl md:text-4xl font-bold text-secondary-foreground">
                당신은 성공적으로
              </p>
              <p className="text-3xl md:text-5xl font-black text-blood drop-shadow-[0_0_20px_rgba(139,0,0,0.8)]">
                저택에서 탈출했습니다!
              </p>
              <div className="pt-4 space-y-3">
                <p className="text-xl md:text-2xl text-secondary-foreground/90">
                  진실을 밝혀낸 당신의 추리력은 훌륭했습니다.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground italic">
                  Chris가 가진 열쇠로 무사히 탈출에 성공했습니다!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats or achievement section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 shadow-[0_0_30px_rgba(139,0,0,0.3)]">
            <div className="text-4xl md:text-5xl mb-2">🔍</div>
            <p className="text-lg font-bold text-foreground">추리 완료</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border-2 border-blood/30 rounded-lg p-6 shadow-[0_0_30px_rgba(139,0,0,0.3)]">
            <div className="text-4xl md:text-5xl mb-2">🗝️</div>
            <p className="text-lg font-bold text-foreground">문제해결력 획득</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border-2 border-accent/30 rounded-lg p-6 shadow-[0_0_30px_rgba(139,0,0,0.3)]">
            <div className="text-4xl md:text-5xl mb-2">🏆</div>
            <p className="text-lg font-bold text-foreground">탈출 성공</p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center pt-6">
          <Button
            onClick={() => navigate("/")}
            className="group text-lg md:text-xl px-10 py-6 bg-gradient-to-r from-primary via-blood to-primary text-primary-foreground font-bold shadow-[0_0_30px_rgba(139,0,0,0.5)] hover:shadow-[0_0_50px_rgba(139,0,0,0.9)] transition-all duration-500 border-2 border-blood/50"
          >
            <span className="flex items-center gap-3">
              <Home className="w-5 h-5" />
              처음으로 돌아가기
            </span>
          </Button>
        </div>

        {/* Decorative party elements */}
        <div className="flex justify-center gap-8 text-5xl opacity-70 pt-4">
          <span className="animate-float">🎊</span>
          <span className="animate-celebrate">🎉</span>
          <span className="animate-float" style={{ animationDelay: '1s' }}>🎊</span>
        </div>
      </div>
    </div>
  );
};

export default Ending;
