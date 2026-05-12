import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Skull } from "lucide-react";

const Story = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background p-4 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-blood/10 rounded-full blur-[120px] animate-pulse-slow" />
      
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in relative z-10">
        {/* Title */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Skull className="w-8 h-8 text-blood animate-flicker" />
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground">
              Story
            </h2>
            <Skull className="w-8 h-8 text-blood animate-flicker" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>

        {/* Story content - Parchment style */}
        <div className="relative bg-gradient-to-br from-parchment via-parchment-dark to-parchment rounded-lg p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-parchment-dark/50">
          {/* Decorative quill */}
          <div className="absolute -right-3 -top-3 text-4xl opacity-50 rotate-12">🪶</div>
          
          <div className="space-y-4 text-secondary-foreground">
            <p className="text-xl md:text-2xl leading-relaxed text-center font-medium">
              백작의 대저택에 갇힌 당신, 탈출구는 단 하나!
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-center font-medium">
              4명의 인물 중 '진실만을 말하는 자'를 찾아야 합니다.
            </p>
            
            <div className="pt-2 pb-2">
              <p className="text-lg md:text-xl leading-relaxed text-center">
                나머지 셋 중 두 명은 항상 거짓말을 하고,
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-center">
                다른 한 명은 <span className="underline font-bold">때로는 진실을, 때로는 거짓말을 합니다.</span>
              </p>
            </div>
            
            <div className="pt-2">
              <p className="text-xl md:text-2xl leading-relaxed text-center font-black text-blood">
                탈출방법은 알아도 진실만을 말하는 자는 오직 한 명이고
              </p>
              <p className="text-xl md:text-2xl leading-relaxed text-center font-black text-blood">
                그가 '탈출에 필요한 열쇠'를 가지고 있습니다.
              </p>
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed text-center mt-6 italic">
              주어진 증언들을 분석하여 진실을 밝히고 이 방을 탈출하세요!"
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center space-y-4 pt-4">
          <p className="text-sm md:text-base text-muted-foreground">
            이제 4명의 인물들이 남긴 <span className="text-blood font-bold">증언</span>을 확인해보세요.
          </p>
          <Button
            onClick={() => navigate("/testimony")}
            className="group relative text-lg md:text-xl px-12 py-5 bg-gradient-to-r from-parchment-dark via-parchment to-parchment-dark text-secondary-foreground font-bold shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(139,0,0,0.4)] transition-all duration-500 transform hover:scale-105 border-2 border-parchment-dark/50"
          >
            <span className="flex items-center gap-3">
              증언 확인하기
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Story;
