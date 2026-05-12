import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, ChevronRight } from "lucide-react";

const Mansion = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-blood/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-[100px] animate-pulse-slow" />
      
      <div className="max-w-4xl w-full space-y-6 animate-fade-in relative z-10">
        {/* Main title with locks */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Lock className="w-12 h-12 md:w-14 md:h-14 text-chain animate-float" />
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground animate-flicker">
              잠겨버린 대저택
            </h1>
            <Lock className="w-12 h-12 md:w-14 md:h-14 text-chain animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Epilogue description */}
        <div className="bg-card/30 backdrop-blur-sm border-2 border-blood/30 rounded-lg p-6 md:p-8 shadow-[0_0_50px_rgba(139,0,0,0.3)]">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic">
              백작의 초대를 받고 간 저택... 들어온건 기억이 나는데 왜 기절했지?...
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
              일어나보니 들어왔던 출구는 보이지 않고 어둠이 나를 감싼다...
            </p>
            <p className="text-base md:text-lg text-blood leading-relaxed font-bold mt-4">
              저택에서 발견한 네 명의 집사의 증언을 통해 탈출구를 찾을 수 있을까?
            </p>
          </div>
        </div>

        {/* Story button */}
        <div className="text-center space-y-4">
          <Button
            onClick={() => navigate("/story")}
            className="group text-lg md:text-xl px-10 py-5 bg-gradient-to-r from-parchment-dark via-parchment to-parchment-dark text-secondary-foreground font-bold shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(139,0,0,0.4)] transition-all duration-500 transform hover:scale-105 border-2 border-parchment-dark/50"
          >
            <span className="flex items-center gap-3">
              문제 확인하기
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
          
          {/* Warning message */}
          <p className="text-center text-sm md:text-base text-blood font-bold italic animate-pulse-slow drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] bg-blood/10 py-3 px-4 rounded-lg border border-blood/30">
            ⚠️ 경고: 진실을 밝히지 못하면 영원히 갇히게 됩니다 ⚠️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mansion;
