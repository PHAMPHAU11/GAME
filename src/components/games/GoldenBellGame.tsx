import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bell, 
  HelpCircle, 
  Lightbulb, 
  SkipForward, 
  Clock, 
  Award, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { MathQuestion, GameSettings } from '../../types';
import { MathRenderer } from '../../utils/mathRenderer';
import { sound } from '../../utils/audio';

interface GoldenBellGameProps {
  questions: MathQuestion[];
  settings: GameSettings;
  onFinish: () => void;
  onGoHome: () => void;
}

export const GoldenBellGame: React.FC<GoldenBellGameProps> = ({
  questions,
  settings,
  onGoHome
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.timePerQuestion || 25);
  const [isFinished, setIsFinished] = useState(false);

  // Lifelines state
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    hint: true,
    skip: true
  });
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = questions[qIndex];
  const totalQuestions = questions.length;

  // Initialize/Reset Timer for current question
  useEffect(() => {
    if (isFinished || isAnswered || !settings.hasTimer) return;

    setTimeLeft(settings.timePerQuestion || 25);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        if (prev <= 6 && prev > 1) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [qIndex, isAnswered, isFinished, settings.hasTimer, settings.timePerQuestion]);

  const handleTimeOut = () => {
    sound.playWrong();
    setIsAnswered(true);
    setSelectedOption(-1); // Timed out
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      setScore(s => s + 10);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (qIndex < totalQuestions - 1) {
      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setHiddenOptions([]);
      setActiveHint(null);
    } else {
      setIsFinished(true);
      sound.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // 50:50 Lifeline
  const handleFiftyFifty = () => {
    if (!lifelines.fiftyFifty || isAnswered) return;
    sound.playLifeline();
    const wrongOptions = [0, 1, 2, 3].filter(idx => idx !== currentQ.correctAnswer);
    // Shuffle and pick 2 wrong options to hide
    const toHide = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setHiddenOptions(toHide);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  // Hint Lifeline
  const handleHint = () => {
    if (!lifelines.hint || isAnswered) return;
    sound.playLifeline();
    setActiveHint(currentQ.hint || 'Hãy chú ý phân tích kỹ dạng đồ thị và các công thức liên quan.');
    setLifelines(prev => ({ ...prev, hint: false }));
  };

  // Skip Lifeline
  const handleSkip = () => {
    if (!lifelines.skip || isAnswered) return;
    sound.playLifeline();
    setLifelines(prev => ({ ...prev, skip: false }));
    if (qIndex < totalQuestions - 1) {
      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setHiddenOptions([]);
      setActiveHint(null);
    }
  };

  const handleRestart = () => {
    sound.playBell();
    setQIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
    setHiddenOptions([]);
    setActiveHint(null);
    setLifelines({ fiftyFifty: true, hint: true, skip: true });
  };

  // Finish screen
  if (isFinished) {
    const isMaster = score >= totalQuestions * 8;
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-amber-500/30 text-center shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/20">
          <Award className="w-10 h-10 animate-bounce" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          {isMaster ? 'ĐẠT ĐỈNH VINH QUANG 🔔' : 'KẾT THÚC VÒNG THI'}
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
          {isMaster ? 'RUNG CHUÔNG VÀNG THÀNH CÔNG!' : 'Chúc Mừng Bạn Đã Hoàn Thành!'}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8">
          Bạn đã trải qua {totalQuestions} câu hỏi đầy thử thách của chương trình GDPT 2018 môn Toán THPT.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">TỔNG ĐIỂM</div>
            <div className="text-3xl font-black text-amber-400">{score}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">TỈ LỆ ĐÚNG</div>
            <div className="text-3xl font-black text-emerald-400">
              {Math.round((score / (totalQuestions * 10)) * 100)}%
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-950/40 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử Thách Lại</span>
          </button>
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 transition-all"
          >
            <span>Về Menu Chính</span>
          </button>
        </div>
      </div>
    );
  }

  const timerPercentage = settings.hasTimer 
    ? (timeLeft / (settings.timePerQuestion || 25)) * 100 
    : 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Status & Lifelines */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-lg">
        {/* Stage counter */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              CÂU HỎI {qIndex + 1} / {totalQuestions}
            </div>
            <div className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>Điểm:</span>
              <span className="text-amber-400 font-mono text-base">{score}</span>
            </div>
          </div>
        </div>

        {/* Lifelines */}
        <div className="flex items-center gap-2">
          {/* 50:50 */}
          <button
            onClick={handleFiftyFifty}
            disabled={!lifelines.fiftyFifty || isAnswered}
            title="Quyền trợ giúp loại bỏ 2 phương án sai"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
              lifelines.fiftyFifty && !isAnswered
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 hover:scale-105 cursor-pointer shadow-md'
                : 'bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed line-through'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>50:50</span>
          </button>

          {/* Hint */}
          <button
            onClick={handleHint}
            disabled={!lifelines.hint || isAnswered}
            title="Xem gợi ý tư duy giải toán"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
              lifelines.hint && !isAnswered
                ? 'bg-blue-500/10 border-blue-500/40 text-blue-300 hover:bg-blue-500/20 hover:scale-105 cursor-pointer shadow-md'
                : 'bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed line-through'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Gợi Ý</span>
          </button>

          {/* Skip */}
          <button
            onClick={handleSkip}
            disabled={!lifelines.skip || isAnswered}
            title="Đổi sang câu hỏi khác"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
              lifelines.skip && !isAnswered
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:scale-105 cursor-pointer shadow-md'
                : 'bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed line-through'
            }`}
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Đổi Câu</span>
          </button>
        </div>
      </div>

      {/* Timer Bar */}
      {settings.hasTimer && (
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Thời gian trả lời:
            </span>
            <span className={`font-mono text-sm ${timeLeft <= 5 ? 'text-red-400 animate-pulse font-extrabold' : 'text-amber-400'}`}>
              {timeLeft} giây
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
            <div 
              className={`h-full transition-all duration-1000 ${
                timeLeft <= 5 
                  ? 'bg-red-500' 
                  : timeLeft <= 10 
                  ? 'bg-amber-500' 
                  : 'bg-gradient-to-r from-blue-500 to-emerald-400'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Hint Bubble if active */}
      {activeHint && (
        <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-start gap-3 animate-fade-in text-blue-200 text-xs sm:text-sm">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Gợi Ý Tư Duy:</span>
            <MathRenderer content={activeHint} />
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
              LỚP {currentQ.grade}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {currentQ.topicTitle}
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {currentQ.difficulty === 'nhan_biet' ? 'Nhận biết' : currentQ.difficulty === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng'}
          </span>
        </div>

        {/* Content with MathRenderer */}
        <div className="text-lg sm:text-2xl font-bold text-white leading-relaxed tracking-wide min-h-[4rem] flex items-center">
          <MathRenderer content={currentQ.content} />
        </div>

        {/* Options Grid (A, B, C, D) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isHidden = hiddenOptions.includes(idx);
            const isCorrect = idx === currentQ.correctAnswer;
            const isSelected = selectedOption === idx;

            if (isHidden) {
              return (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/40 opacity-20 flex items-center justify-center text-xs text-slate-600 font-bold"
                >
                  [Phương án đã loại trừ]
                </div>
              );
            }

            let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-blue-500/60 hover:text-white';
            let letterStyle = 'bg-slate-700/80 text-slate-300';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/40';
                letterStyle = 'bg-emerald-500 text-slate-950 font-black';
              } else if (isSelected) {
                btnStyle = 'bg-red-950/70 border-red-500 text-red-200 shadow-lg shadow-red-950/50';
                letterStyle = 'bg-red-500 text-white font-black';
              } else {
                btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 sm:p-5 rounded-2xl border-2 text-left font-semibold text-base sm:text-lg flex items-center gap-4 transition-all duration-200 select-none ${btnStyle} ${
                  !isAnswered ? 'cursor-pointer active:scale-98' : 'cursor-default'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-black shrink-0 ${letterStyle}`}>
                  {letter}
                </div>
                <div className="flex-1 overflow-x-auto py-0.5">
                  <MathRenderer content={option} />
                </div>
                {isAnswered && isCorrect && (
                  <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 animate-scale" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-red-400 shrink-0 animate-shake" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation */}
        {isAnswered && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-blue-400 font-extrabold text-sm uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Lời Giải & Hướng Dẫn Tư Duy Chuẩn GDPT 2018:</span>
            </div>
            <div className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <MathRenderer content={currentQ.explanation} />
            </div>
          </div>
        )}

        {/* Next Question Control */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-xl shadow-blue-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{qIndex < totalQuestions - 1 ? 'CÂU TIẾP THEO' : 'XEM KẾT QUẢ CUỐI CÙNG'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
