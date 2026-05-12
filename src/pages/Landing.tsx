import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-blood/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Fog effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 to-transparent animate-pulse-slow" />
      
      {/* Multiple floating candles - larger and more spread out */}
      <div className="absolute top-20 left-[15%] text-6xl opacity-60 animate-float">🕯️</div>
      <div className="absolute top-32 right-[12%] text-7xl opacity-50 animate-float" style={{ animationDelay: '1s' }}>🕯️</div>
      <div className="absolute bottom-40 left-[20%] text-6xl opacity-55 animate-float" style={{ animationDelay: '2s' }}>🕯️</div>
      <div className="absolute bottom-32 right-[18%] text-7xl opacity-60 animate-float" style={{ animationDelay: '1.5s' }}>🕯️</div>
      <div className="absolute top-1/2 left-[8%] text-5xl opacity-45 animate-float" style={{ animationDelay: '0.5s' }}>🕯️</div>
      <div className="absolute top-1/2 right-[10%] text-6xl opacity-50 animate-float" style={{ animationDelay: '2.5s' }}>🕯️</div>
      <div className="absolute top-[30%] left-[25%] text-5xl opacity-40 animate-float" style={{ animationDelay: '3s' }}>🕯️</div>
      <div className="absolute bottom-[25%] right-[25%] text-6xl opacity-55 animate-float" style={{ animationDelay: '1.8s' }}>🕯️</div>
      
      {/* Chains and locks scattered around */}
      <div className="absolute top-16 left-[30%] text-4xl opacity-30 animate-shake text-chain">⛓️</div>
      <div className="absolute top-24 right-[35%] text-5xl opacity-35 animate-shake text-chain" style={{ animationDelay: '1s' }}>⛓️</div>
      <div className="absolute bottom-20 left-[35%] text-4xl opacity-25 rotate-45 animate-float text-chain" style={{ animationDelay: '2s' }}>🔒</div>
      <div className="absolute bottom-28 right-[30%] text-5xl opacity-30 -rotate-12 animate-float text-chain" style={{ animationDelay: '1.5s' }}>🔒</div>
      <div className="absolute top-1/3 left-[5%] text-3xl opacity-20 animate-shake text-chain" style={{ animationDelay: '0.8s' }}>⛓️</div>
      <div className="absolute bottom-1/3 right-[5%] text-4xl opacity-25 animate-shake text-chain" style={{ animationDelay: '2.2s' }}>⛓️</div>
      
      <div className="max-w-2xl w-full space-y-8 animate-fade-in relative z-10">
        {/* Main title */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground via-muted-foreground to-foreground/50 animate-flicker drop-shadow-[0_0_30px_rgba(139,0,0,0.5)]">
            잠겨버린 대저택
          </h1>
          <p className="text-base md:text-lg text-muted-foreground italic animate-pulse-slow">
            A Mystery Horror Escape Room
          </p>
        </div>

        {/* Updated story description */}
        <div className="text-center space-y-4 px-4 bg-card/20 backdrop-blur-sm border-2 border-blood/20 rounded-lg p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
            백작의 대저택에 갇힌 당신,
          </p>
          <p className="text-xl md:text-2xl text-blood leading-relaxed font-bold">
            탈출구는 단 하나!
          </p>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            <span className="text-blood font-bold">'진실만을 말하는 자'</span>를 찾아야 합니다.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic pt-2">
            주어진 증언들을 분석하여 진실을 밝히고 이 방을 탈출하세요!
          </p>
          <p className="text-base md:text-lg text-blood/80 leading-relaxed italic pt-3 animate-pulse-slow">
            탈출의 열쇠는... 진실을 말하는 단 한 명의 손에...
          </p>
        </div>

        {/* Enter button with horror theme */}
        <div className="text-center space-y-6">
          <Button
            onClick={() => navigate("/mansion")}
            className="group relative text-xl md:text-2xl px-12 py-6 bg-gradient-to-r from-blood via-primary to-blood text-primary-foreground font-black shadow-[0_0_50px_rgba(139,0,0,0.8)] hover:shadow-[0_0_80px_rgba(139,0,0,1)] transition-all duration-700 transform hover:scale-105 border-4 border-blood/50 animate-pulse-slow"
          >
            입장하기
            <ChevronRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
