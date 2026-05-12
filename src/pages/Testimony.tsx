import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle } from "lucide-react";

const Testimony = () => {
  const navigate = useNavigate();

  const testimonies = [
    {
      name: "Andrea",
      quote: "Dominic은 때로는 진실을 말하는 사람이 아니다."
    },
    {
      name: "Beatrice",
      quote: "나는 거짓말을 하는 집사가 아니다."
    },
    {
      name: "Charles",
      quote: "Andrea는 나를 싫어해서 나에 대한 모든 것을 거짓으로 말한다."
    },
    {
      name: "Dominic",
      quote: "나는 항상 거짓말을 하는 사람이다."
    }
  ];

  return (
    <div className="h-screen bg-background p-4 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-blood/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-5xl mx-auto space-y-4 animate-fade-in relative z-10">
        {/* Title */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="w-10 h-10 md:w-12 md:h-12 text-blood animate-float" />
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground">
              4명의 인물의 증언
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg animate-pulse-slow">
            누가 진실을 말하고 있을까요?
          </p>
        </div>

        {/* Testimonies - Parchment style */}
        <div className="relative bg-gradient-to-br from-parchment via-parchment-dark to-parchment rounded-lg p-4 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-parchment-dark/50">
          {/* Decorative quill */}
          <div className="absolute -right-3 -top-3 text-4xl opacity-50 rotate-12">🪶</div>
          
          <div className="space-y-3 text-secondary-foreground">
            {testimonies.map((testimony, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-parchment-dark/30 hover:bg-parchment-dark/50 transition-all duration-300 border-l-4 border-blood/50"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="text-2xl font-black text-blood min-w-[30px]">•</span>
                <div className="space-y-1">
                  <p className="text-lg md:text-xl font-bold">
                    {testimony.name}:
                  </p>
                  <p className="text-base md:text-lg leading-relaxed italic">
                    "{testimony.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer button */}
        <div className="text-center pt-3">
          <Button
            onClick={() => navigate("/answer")}
            className="group text-lg md:text-xl px-10 py-5 bg-gradient-to-r from-accent via-primary to-accent text-primary-foreground font-bold shadow-[0_0_30px_rgba(139,0,0,0.5)] hover:shadow-[0_0_50px_rgba(139,0,0,0.9)] transition-all duration-500 border-2 border-blood/50"
          >
            <span className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              정답 맞추기
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
