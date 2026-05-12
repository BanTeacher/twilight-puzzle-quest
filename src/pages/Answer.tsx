import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Home, PartyPopper } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ALLOWED_NAMES = ["andrea", "beatrice", "charles", "dominic"];

const Answer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showChains, setShowChains] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpening && isCorrect) {
      // Wait for envelope animation to complete before showing empty letter
      const timer1 = setTimeout(() => {
        setShowContent(true);
      }, 1200);
      
      // Then gradually show content
      const timer2 = setTimeout(() => {
        setShowTitle(true);
      }, 2000);
      
      const timer3 = setTimeout(() => {
        setShowSubtitle(true);
      }, 2800);
      
      const timer4 = setTimeout(() => {
        setShowName(true);
      }, 3600);
      
      const timer5 = setTimeout(() => {
        setShowDescription(true);
      }, 4400);

      const timer6 = setTimeout(() => {
        setShowButtons(true);
      }, 6000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
      };
    } else if (isOpening && isCorrect === false) {
      // Show failure content
      const timer1 = setTimeout(() => {
        setShowContent(true);
      }, 1200);
      
      const timer2 = setTimeout(() => {
        setShowChains(true);
      }, 1500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpening, isCorrect]);

  const handleEnvelopeClick = () => {
    const trimmed = userAnswer.trim();
    if (!trimmed) return;

    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(trimmed)) {
      setWarning("이름은 영어로만 입력해주세요.");
      return;
    }
    if (!/^[A-Za-z]+$/.test(trimmed)) {
      setWarning("이름은 영어로만 입력해주세요.");
      return;
    }
    if (!ALLOWED_NAMES.includes(trimmed.toLowerCase())) {
      setWarning("명단에 없는 인물입니다.");
      return;
    }

    const correct = trimmed.toLowerCase() === "charles";
    // Capitalize properly (e.g., "charles" -> "Charles")
    const displayName = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    setSubmittedName(displayName);
    setIsSubmitting(true);

    // After name flies into envelope, transition to opened letter
    setTimeout(() => {
      setIsCorrect(correct);
      setIsOpening(true);
      setIsOpen(true);
      setIsSubmitting(false);
    }, 1800);
  };

  const handleWarningClose = () => {
    setWarning(null);
    setUserAnswer("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dark atmospheric background with fog */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-background/50 to-black" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blood/10 via-transparent to-accent/10" />
      
      {/* Multiple spooky glows */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blood/20 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-destructive/20 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      
      {/* Floating particles effect */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-blood/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-blood/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blood/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Chains overlay for wrong answer */}
      {showChains && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {/* Top chains */}
          <div className="absolute top-0 left-0 w-full h-32 opacity-80 animate-chain-drop" style={{ animationDelay: '0s' }}>
            <div className="text-8xl text-chain/80 flex justify-around">
              ⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️
            </div>
          </div>
          {/* Bottom chains */}
          <div className="absolute bottom-0 left-0 w-full h-32 opacity-80 animate-chain-drop" style={{ animationDelay: '0.2s' }}>
            <div className="text-8xl text-chain/80 flex justify-around">
              ⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️
            </div>
          </div>
          {/* Left chains */}
          <div className="absolute left-0 top-0 h-full w-32 opacity-80 animate-chain-drop-horizontal" style={{ animationDelay: '0.4s' }}>
            <div className="text-8xl text-chain/80 flex flex-col justify-around h-full">
              <span>⛓️</span>
              <span>⛓️</span>
              <span>⛓️</span>
              <span>⛓️</span>
              <span>⛓️</span>
            </div>
          </div>
          {/* Right chains */}
          <div className="absolute right-0 top-0 h-full w-32 opacity-80 animate-chain-drop-horizontal" style={{ animationDelay: '0.6s' }}>
            <div className="text-8xl text-chain/80 flex flex-col justify-around h-full">
              <span>⛓️</span>
              <span>⛓️</span>
              <span>⛓️</span>
              <span>⛓️</span>
              <span>⛓️</span>
            </div>
          </div>
          {/* Diagonal chains */}
          <div className="absolute top-0 left-0 w-full h-full opacity-60">
            <div className="text-6xl text-chain/60 absolute top-10 left-10 animate-float">⛓️</div>
            <div className="text-6xl text-chain/60 absolute top-10 right-10 animate-float" style={{ animationDelay: '0.5s' }}>⛓️</div>
            <div className="text-6xl text-chain/60 absolute bottom-10 left-10 animate-float" style={{ animationDelay: '1s' }}>⛓️</div>
            <div className="text-6xl text-chain/60 absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1.5s' }}>⛓️</div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl w-full space-y-8 animate-fade-in relative z-10">
        {/* Envelope container */}
        <div className="flex flex-col items-center justify-center space-y-8">
          {!isOpen ? (
            <>
              {/* Instruction text */}
              <div className="text-center space-y-3 animate-fade-in">
                <p className="text-xl md:text-3xl text-muted-foreground animate-flicker">
                  정답을 입력 후 편지를 클릭해주세요.
                </p>
              </div>

              {/* Input field */}
              <div className="w-full max-w-md">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="정답을 입력하세요"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEnvelopeClick();
                    }
                  }}
                  className="text-center text-xl md:text-2xl h-14 bg-parchment/20 border-2 border-blood/50 text-foreground placeholder:text-muted-foreground focus:border-blood focus:ring-blood"
                />
              </div>

              {/* Sealed envelope */}
              <div 
                onClick={isSubmitting ? undefined : handleEnvelopeClick}
                className={`relative transition-all duration-500 ${isSubmitting ? 'cursor-default animate-pulse-slow' : userAnswer.trim() ? 'cursor-pointer hover:scale-105 animate-shake' : 'cursor-not-allowed opacity-50'}`}
                style={{ perspective: "1000px" }}
              >
                {/* Flying name overlay */}
                {isSubmitting && (
                  <div
                    className="absolute left-1/2 top-1/2 z-30 pointer-events-none animate-name-into-envelope"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <span className="text-5xl md:text-7xl font-black text-blood drop-shadow-[0_0_30px_rgba(139,0,0,1)] whitespace-nowrap">
                      {submittedName}
                    </span>
                  </div>
                )}
                {/* Envelope back */}
                <div className={`relative w-[500px] h-[340px] md:w-[700px] md:h-[460px] bg-gradient-to-br from-parchment via-parchment-dark to-parchment rounded-sm shadow-[0_0_80px_rgba(0,0,0,1),0_0_120px_rgba(139,0,0,0.5)] border-2 border-parchment-dark/50 ${isOpening ? "animate-envelope-open" : ""}`}>
                  {/* Envelope flap closed - triangle */}
                  <div className={`absolute top-0 left-0 right-0 w-0 h-0 border-l-[250px] md:border-l-[350px] border-r-[250px] md:border-r-[350px] border-t-[200px] md:border-t-[260px] border-l-transparent border-r-transparent border-t-parchment-dark ${isOpening ? "animate-envelope-open" : ""}`}
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
                    }}
                  />
                  
                  {/* Wax seal */}
                  <div className={`absolute top-[150px] md:top-[200px] left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-radial from-blood via-destructive to-blood shadow-[0_0_50px_rgba(139,0,0,1),0_0_100px_rgba(139,0,0,0.6),inset_0_-10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center border-8 border-blood/40 group-hover:shadow-[0_0_80px_rgba(139,0,0,1),0_0_150px_rgba(139,0,0,0.8)] transition-all duration-500 animate-pulse-slow ${isOpening ? "animate-wax-break" : ""}`}>
                    {/* Wax seal design */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Inner circle pattern */}
                      <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-blood/60" />
                      <div className="text-5xl md:text-6xl font-black text-parchment/90 opacity-80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🔒</div>
                    </div>
                  </div>
                  
                  {/* Envelope texture details */}
                  <div className="absolute bottom-4 right-4 text-sm text-secondary-foreground/30 font-serif italic">To: You</div>
                </div>
              </div>
            </>
          ) : (
            <>
              {isCorrect ? (
                <>
                  {/* Correct answer - Opened letter */}
                  <div className={`relative w-[400px] md:w-[600px] ${showContent ? "animate-slide-up" : "opacity-0 translate-y-full"}`}>
                    {/* Letter paper */}
                    <div className="bg-gradient-to-br from-parchment via-parchment-dark to-parchment rounded-lg p-10 md:p-12 shadow-[0_0_100px_rgba(139,0,0,1),0_0_150px_rgba(0,0,0,0.9)] border-8 border-blood/60 min-h-[400px] md:min-h-[500px] flex flex-col justify-center">
                      {/* Decorative corners */}
                      <div className={`absolute top-4 left-4 text-3xl md:text-4xl opacity-60 transition-opacity duration-1000 ${showContent ? "animate-flicker" : "opacity-0"}`}>🕯️</div>
                      <div className={`absolute top-4 right-4 text-3xl md:text-4xl opacity-60 transition-opacity duration-1000 ${showContent ? "animate-flicker" : "opacity-0"}`} style={{ animationDelay: '1s' }}>🕯️</div>
                      
                      <div className="space-y-6 md:space-y-8 text-center">
                        {/* Title appears first */}
                        <h3 className={`text-4xl md:text-6xl font-black text-blood flex items-center justify-center gap-3 drop-shadow-[0_0_20px_rgba(139,0,0,1)] transition-all duration-1000 ${showTitle ? "opacity-100" : "opacity-0"}`}>
                          <span className={showTitle ? "animate-pulse-slow" : ""}>🎯</span>
                          <span>정답</span>
                          <span className={showTitle ? "animate-pulse-slow" : ""} style={{ animationDelay: '1s' }}>🎯</span>
                        </h3>
                        
                        <div className="py-4 md:py-6">
                          {/* Subtitle appears second */}
                          <p className={`text-2xl md:text-3xl font-bold text-secondary-foreground mb-4 md:mb-6 transition-all duration-1000 ${showSubtitle ? "opacity-100" : "opacity-0"}`}>
                            진실을 말하는 자는
                          </p>
                          
                          {/* Name appears third */}
                          <p className={`text-6xl md:text-8xl font-black text-blood drop-shadow-[0_0_30px_rgba(139,0,0,1)] my-6 md:my-8 py-4 transition-all duration-1000 ${showName ? "opacity-100 animate-pulse-slow" : "opacity-0"}`}>
                            Charles
                          </p>
                          
                          {/* Description appears last */}
                          <p className={`text-xl md:text-3xl text-secondary-foreground/90 italic mt-4 md:mt-6 leading-relaxed transition-all duration-1000 ${showDescription ? "opacity-100" : "opacity-0"}`}>
                            Charles가 탈출의 열쇠를<br/>가지고 있습니다!
                          </p>
                        </div>
                      </div>
                      
                      {/* Bottom decoration */}
                      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl md:text-4xl opacity-60 transition-opacity duration-1000 ${showContent ? "animate-float" : "opacity-0"}`}>🗝️</div>
                      
                      {/* Decorative bottom corners */}
                      <div className={`absolute bottom-4 left-4 text-2xl transition-opacity duration-1000 ${showContent ? "opacity-40" : "opacity-0"}`}>📜</div>
                      <div className={`absolute bottom-4 right-4 text-2xl transition-opacity duration-1000 ${showContent ? "opacity-40" : "opacity-0"}`}>📜</div>
                    </div>
                    
                    {/* Broken wax seal pieces */}
                    <div className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-blood/60 blur-md transition-opacity duration-1000 ${showContent ? "opacity-70 animate-float" : "opacity-0"}`} />
                    <div className={`absolute -top-4 -right-16 w-16 h-16 rounded-full bg-destructive/60 blur-md transition-opacity duration-1000 ${showContent ? "opacity-60 animate-float" : "opacity-0"}`} style={{ animationDelay: '0.5s' }} />
                    <div className={`absolute -top-12 -right-4 w-12 h-12 rounded-full bg-blood/50 blur-sm transition-opacity duration-1000 ${showContent ? "opacity-50 animate-float" : "opacity-0"}`} style={{ animationDelay: '1s' }} />
                  </div>

                  {/* Navigation buttons - only after answer fully revealed */}
                  <div className={`flex flex-col sm:flex-row gap-4 justify-center pt-8 transition-opacity duration-700 ${showButtons ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <Button
                      onClick={() => navigate("/testimony")}
                      variant="outline"
                      className="group text-lg md:text-xl px-8 py-5 border-2 border-muted hover:bg-muted/20 hover:border-blood/50 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        증언으로 돌아가기
                      </span>
                    </Button>
                    <Button
                      onClick={() => navigate("/ending")}
                      className="group text-lg md:text-xl px-8 py-5 bg-gradient-to-r from-blood via-primary to-blood text-primary-foreground font-bold shadow-[0_0_30px_rgba(139,0,0,0.5)] hover:shadow-[0_0_50px_rgba(139,0,0,0.9)] transition-all duration-500 border-2 border-blood/50 animate-pulse-slow"
                    >
                      <span className="flex items-center gap-3">
                        <PartyPopper className="w-5 h-5" />
                        탈출하기
                      </span>
                    </Button>
                    <Button
                      onClick={() => navigate("/")}
                      className="group text-lg md:text-xl px-8 py-5 bg-gradient-to-r from-accent via-primary to-black text-primary-foreground font-bold shadow-[0_0_30px_rgba(139,0,0,0.5)] hover:shadow-[0_0_50px_rgba(139,0,0,0.9)] transition-all duration-500 border-2 border-blood/50"
                    >
                      <span className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        처음으로
                      </span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Wrong answer - Failure letter */}
                  <div className={`relative w-[400px] md:w-[600px] ${showContent ? "animate-slide-up" : "opacity-0 translate-y-full"}`}>
                    {/* Failure letter paper */}
                    <div className="bg-gradient-to-br from-parchment via-parchment-dark to-parchment rounded-lg p-10 md:p-12 shadow-[0_0_100px_rgba(139,0,0,1),0_0_150px_rgba(0,0,0,0.9)] border-8 border-blood min-h-[400px] md:min-h-[500px] flex flex-col justify-center relative overflow-hidden">
                      {/* Blood drips effect */}
                      <div className="absolute top-0 left-1/4 w-4 h-20 bg-gradient-to-b from-blood to-transparent opacity-60 animate-fade-in" />
                      <div className="absolute top-0 right-1/4 w-4 h-20 bg-gradient-to-b from-blood to-transparent opacity-60 animate-fade-in" style={{ animationDelay: '0.3s' }} />
                      
                      <div className="space-y-6 md:space-y-8 text-center relative z-10">
                        <h3 className="text-4xl md:text-6xl font-black text-blood drop-shadow-[0_0_30px_rgba(139,0,0,1)] animate-glitch leading-tight">
                          당신은<br/>정답을<br/>맞추지 못했습니다
                        </h3>
                        
                        <div className="text-5xl md:text-7xl animate-pulse-slow">
                          🔒
                        </div>
                        
                        <p className="text-xl md:text-2xl text-destructive font-bold animate-flicker">
                          영원히 갇히게 되었습니다...
                        </p>
                      </div>
                      
                      {/* Dark corners */}
                      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-blood/40 to-transparent" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-blood/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-radial from-blood/40 to-transparent" />
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-radial from-blood/40 to-transparent" />
                    </div>
                  </div>

                  {/* Retry button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        setIsOpening(false);
                        setShowContent(false);
                        setShowChains(false);
                        setIsCorrect(null);
                        setUserAnswer("");
                        setSubmittedName("");
                        setShowButtons(false);
                        setShowTitle(false);
                        setShowSubtitle(false);
                        setShowName(false);
                        setShowDescription(false);
                      }}
                      variant="outline"
                      className="group text-lg md:text-xl px-8 py-5 border-2 border-blood hover:bg-blood/20 hover:border-blood transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        다시 시도하기
                      </span>
                    </Button>
                    <Button
                      onClick={() => navigate("/testimony")}
                      className="group text-lg md:text-xl px-8 py-5 bg-gradient-to-r from-accent via-primary to-black text-primary-foreground font-bold shadow-[0_0_30px_rgba(139,0,0,0.5)] hover:shadow-[0_0_50px_rgba(139,0,0,0.9)] transition-all duration-500 border-2 border-blood/50"
                    >
                      <span className="flex items-center gap-2">
                        증언 다시 보기
                      </span>
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <AlertDialog open={warning !== null} onOpenChange={(open) => { if (!open) handleWarningClose(); }}>
        <AlertDialogContent className="bg-background border-2 border-blood/60">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blood text-2xl">⚠️ 입력 오류</AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-foreground">
              {warning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleWarningClose}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Answer;
