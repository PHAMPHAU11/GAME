import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Puzzle, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Eye
} from 'lucide-react';
import { MathQuestion, GameSettings } from '../../types';
import { MathRenderer } from '../../utils/mathRenderer';
import { sound } from '../../utils/audio';

interface MysteryPuzzleGameProps {
  questions: MathQuestion[];
  settings: GameSettings;
  onFinish: () => void;
  onGoHome: () => void;
}

export const MysteryPuzzleGame: React.FC<MysteryPuzzleGameProps> = ({
  questions,
  onGoHome
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [openedTiles, setOpenedTiles] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [hasGuessedSecret, setHasGuessedSecret] = useState(false);

  const totalTiles = 6;
  const currentQ = questions[qIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      setScore(s => s + 15);
      // Unlock next available tile
      if (openedTiles.length < totalTiles) {
        setOpenedTiles(prev => [...prev, prev.length]);
      }
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

  const handleGuessSecret = () => {
    sound.playLifeline();
    const guess = window.prompt('Nhập tên nhà Toán học hoặc bí mật bức tranh (Gợi ý: Người phát minh định lý tam giác vuông lừng danh):');
    if (guess && (guess.toLowerCase().includes('pythagoras') || guess.toLowerCase().includes('pi-ta-go') || guess.toLowerCase().includes('pitago'))) {
      sound.playFanfare();
      setHasGuessedSecret(true);
      setScore(s => s + 50);
      setOpenedTiles([0, 1, 2, 3, 4, 5]); // Reveal all
      confetti({ particleCount: 100, spread: 70 });
      window.alert('🎉 CHÍNH XÁC! Đó chính là Nhà Toán học Pythagoras (Pi-ta-go) vĩ đại! (+50 điểm thưởng)');
    } else if (guess) {
      sound.playWrong();
      window.alert('Chưa chính xác! Hãy mở thêm các mảnh ghép để quan sát rõ hơn.');
    }
  };

  const handleRestart = () => {
    sound.playBell();
    setQIndex(0);
    setOpenedTiles([]);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
    setScore(0);
    setHasGuessedSecret(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 rounded-3xl bg-slate-900 border border-purple-500/30 text-center shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-purple-400 shadow-xl shadow-purple-500/20">
          <Puzzle className="w-10 h-10 animate-bounce" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          🧩 KHÁM PHÁ BÍ MẬT THÀNH CÔNG!
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
          Bức Tranh Đã Được Giải Mã
        </h2>

        <div className="max-w-sm mx-auto my-6 rounded-2xl overflow-hidden border-2 border-purple-500 shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80" 
            alt="Pythagoras & Mathematics" 
            className="w-full h-48 object-cover"
          />
          <div className="p-3 bg-slate-800 text-xs text-slate-300">
            <strong>Bí Mật:</strong> Pythagoras & Nền Tảng Hình Học Toán Học Cổ Đại
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">TỔNG ĐIỂM</div>
            <div className="text-2xl font-black text-amber-400">{score}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">MẢNH GHÉP MỞ</div>
            <div className="text-2xl font-black text-purple-400">{openedTiles.length}/{totalTiles}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black shadow-lg shadow-purple-950/40 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại Trận Mới</span>
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header & Puzzle Board */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Puzzle className="w-4 h-4 text-purple-400" />
              <span>CÂU HỎI {qIndex + 1} / {totalQuestions} • ĐIỂM: {score}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Bức Tranh Mảnh Ghép Bí Ẩn
            </h2>
          </div>

          <button
            onClick={handleGuessSecret}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Đoán Tên Bức Tranh (+50đ)</span>
          </button>
        </div>

        {/* 6-piece Mystery Grid */}
        <div className="relative max-w-lg mx-auto aspect-video rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-slate-950">
          {/* Background image behind tiles */}
          <img 
            src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80" 
            alt="Secret Math" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Grid overlays */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-1">
            {Array.from({ length: totalTiles }).map((_, i) => {
              const isRevealed = openedTiles.includes(i) || hasGuessedSecret;
              return (
                <div 
                  key={i}
                  className={`flex flex-col items-center justify-center rounded-lg border border-purple-400/20 transition-all duration-700 ${
                    isRevealed 
                      ? 'opacity-0 pointer-events-none scale-95' 
                      : 'bg-slate-900/95 backdrop-blur-sm shadow-inner opacity-100'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-black text-sm">
                    {i + 1}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold mt-1">MẢNH {i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          Đã mở <strong className="text-purple-400">{openedTiles.length}</strong> / {totalTiles} mảnh ghép. Hãy giải toán để tiếp tục lật mở!
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
              LỚP {currentQ.grade}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {currentQ.topicTitle}
            </span>
          </div>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            +15đ & Mở 1 mảnh ghép
          </span>
        </div>

        <div className="text-lg sm:text-2xl font-bold text-white leading-relaxed min-h-[4rem] flex items-center">
          <MathRenderer content={currentQ.content} />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isCorrect = idx === currentQ.correctAnswer;
            const isSelected = selectedOption === idx;

            let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-purple-500/60 hover:text-white';
            let letterStyle = 'bg-slate-700/80 text-slate-300';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg';
                letterStyle = 'bg-emerald-500 text-slate-950 font-black';
              } else if (isSelected) {
                btnStyle = 'bg-red-950/70 border-red-500 text-red-200 shadow-lg';
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

        {/* Explanation */}
        {isAnswered && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-purple-400 font-extrabold text-sm uppercase tracking-wide">
              <span>Hướng Dẫn Lời Giải:</span>
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
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-sm tracking-wide shadow-xl shadow-purple-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{qIndex < totalQuestions - 1 ? 'MỞ MẢNH TIẾP THEO' : 'XEM BỨC TRANH HOÀN CHỈNH'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
