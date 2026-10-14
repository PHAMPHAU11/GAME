import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Zap, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Gauge
} from 'lucide-react';
import { MathQuestion, GameSettings } from '../../types';
import { MathRenderer } from '../../utils/mathRenderer';
import { sound } from '../../utils/audio';

interface SpeedRacerGameProps {
  questions: MathQuestion[];
  settings: GameSettings;
  onFinish: () => void;
  onGoHome: () => void;
}

export const SpeedRacerGame: React.FC<SpeedRacerGameProps> = ({
  questions,
  onGoHome
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [speed, setSpeed] = useState(80); // km/h
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const currentQ = questions[qIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round((qIndex / totalQuestions) * 100);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);

      let speedBoost = 25;
      if (newStreak >= 3) {
        speedBoost = 45;
        sound.playTurbo();
      } else {
        sound.playCorrect();
      }

      setSpeed(s => Math.min(320, s + speedBoost));
      setTotalScore(sc => sc + 10 * newStreak);
    } else {
      sound.playWrong();
      setStreak(0);
      setSpeed(s => Math.max(60, s - 30));
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
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    sound.playBell();
    setQIndex(0);
    setStreak(0);
    setSpeed(80);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
    setTotalScore(0);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 rounded-3xl bg-slate-900 border border-blue-500/30 text-center shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/20">
          <Trophy className="w-10 h-10 animate-bounce text-amber-400" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
          🏁 CÁN ĐÍCH ĐƯỜNG ĐUA THÀNH CÔNG!
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
          Kỷ Lục Tốc Độ Của Bạn
        </h2>

        <p className="text-slate-300 text-sm max-w-md mx-auto mb-8">
          Chúc mừng tay đua đã vượt qua tất cả các chướng ngại vật giải tích & hình học không gian!
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">TỔNG ĐIỂM</div>
            <div className="text-2xl font-black text-amber-400">{totalScore}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">TỐC ĐỘ ĐỈNH</div>
            <div className="text-2xl font-black text-blue-400">{speed} km/h</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
            <div className="text-xs text-slate-400 font-semibold mb-1">CHUỖI COMBO</div>
            <div className="text-2xl font-black text-emerald-400">{streak}x</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black shadow-lg shadow-blue-950/40 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Đua Lại Chặng Mới</span>
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
      {/* Race Track Header with moving racer */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>CHẶNG ĐUA {qIndex + 1} / {totalQuestions}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Đường Đua Toán Học Tốc Độ Cao
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Speedometer */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <Gauge className="w-4 h-4 text-blue-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold leading-none">TỐC ĐỘ</span>
                <span className="text-base font-black text-blue-300 font-mono">{speed} km/h</span>
              </div>
            </div>

            {/* Streak Turbo */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-black text-xs transition-all ${
              streak >= 2 
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}>
              <Zap className="w-4 h-4 text-amber-400" />
              <span>COMBO {streak > 0 ? `x${streak}` : '0'}</span>
            </div>
          </div>
        </div>

        {/* Visual Race Track Progress */}
        <div className="relative pt-4 pb-2">
          {/* Track line */}
          <div className="relative h-6 bg-slate-950 rounded-full border border-slate-800 overflow-hidden shadow-inner flex items-center px-1">
            <div 
              className="h-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Car indicator */}
          <div 
            className="absolute top-1 text-2xl transition-all duration-500 select-none pointer-events-none drop-shadow-[0_4px_8px_rgba(59,130,246,0.6)]"
            style={{ left: `calc(${progressPercent}% - 14px)` }}
          >
            🏎️
          </div>

          {/* Finish flag */}
          <div className="absolute right-0 top-1 text-xl select-none pointer-events-none">
            🏁
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
              LỚP {currentQ.grade}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Chướng ngại vật: {currentQ.topicTitle}
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            +{(streak + 1) * 10} điểm nếu giải đúng
          </span>
        </div>

        {/* Math Question Content */}
        <div className="text-lg sm:text-2xl font-bold text-white leading-relaxed min-h-[4rem] flex items-center">
          <MathRenderer content={currentQ.content} />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isCorrect = idx === currentQ.correctAnswer;
            const isSelected = selectedOption === idx;

            let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-blue-500/60 hover:text-white';
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
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-blue-400 font-extrabold text-sm uppercase tracking-wide">
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
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-xl shadow-blue-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{qIndex < totalQuestions - 1 ? 'TĂNG TỐC TIẾP ➔' : 'VỀ ĐÍCH NHẬN CÚP 🏁'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
