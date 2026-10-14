import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Swords, 
  Trophy, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { MathQuestion, GameSettings } from '../../types';
import { MathRenderer } from '../../utils/mathRenderer';
import { sound } from '../../utils/audio';

interface TeamBattleGameProps {
  questions: MathQuestion[];
  settings: GameSettings;
  onFinish: () => void;
  onGoHome: () => void;
}

export const TeamBattleGame: React.FC<TeamBattleGameProps> = ({
  questions,
  settings,
  onGoHome
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [currentTurn, setCurrentTurn] = useState<1 | 2>(1); // 1 = Team Red, 2 = Team Blue
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const team1Name = settings.team1Name || '🔴 ĐỘI ĐỎ';
  const team2Name = settings.team2Name || '🔵 ĐỘI XANH';

  const currentQ = questions[qIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      if (currentTurn === 1) {
        setTeam1Score(s => s + 10);
      } else {
        setTeam2Score(s => s + 10);
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
      // Alternate team turns
      setCurrentTurn(prev => (prev === 1 ? 2 : 1));
    } else {
      setIsFinished(true);
      sound.playFanfare();
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    sound.playBell();
    setQIndex(0);
    setCurrentTurn(1);
    setTeam1Score(0);
    setTeam2Score(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const isTeam1Winner = team1Score > team2Score;
    const isTie = team1Score === team2Score;
    const winnerName = isTie ? 'Hai Đội Bất Phân Thắng Bại!' : isTeam1Winner ? team1Name : team2Name;

    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-700 text-center shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-xl">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          ⚔️ KẾT THÚC ĐẤU TRƯỜNG ĐỐI KHÁNG
        </span>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
          {winnerName}
        </h2>

        <p className="text-slate-300 text-sm max-w-md mx-auto mb-8">
          Một trận so tài toán học kịch tính và đầy thuyết phục trên bảng tương tác!
        </p>

        {/* Final Scoreboard */}
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8">
          <div className={`p-5 rounded-2xl border-2 ${isTeam1Winner ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/50' : 'bg-slate-800 border-slate-700'}`}>
            <div className="text-xs font-bold text-red-400 mb-1">{team1Name}</div>
            <div className="text-3xl font-black text-white font-mono">{team1Score} đ</div>
            {isTeam1Winner && <span className="inline-block text-[11px] font-black text-amber-400 mt-1">👑 CHIẾN THẮNG</span>}
          </div>

          <div className={`p-5 rounded-2xl border-2 ${!isTeam1Winner && !isTie ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/50' : 'bg-slate-800 border-slate-700'}`}>
            <div className="text-xs font-bold text-blue-400 mb-1">{team2Name}</div>
            <div className="text-3xl font-black text-white font-mono">{team2Score} đ</div>
            {!isTeam1Winner && !isTie && <span className="inline-block text-[11px] font-black text-amber-400 mt-1">👑 CHIẾN THẮNG</span>}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tái Đấu Trận Mới</span>
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

  // Tug of war ratio
  const totalBothScores = team1Score + team2Score;
  const team1Percent = totalBothScores === 0 ? 50 : Math.round((team1Score / totalBothScores) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Smartboard Dual Team Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Team Red Box */}
          <div className={`flex-1 min-w-[140px] p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
            currentTurn === 1 
              ? 'bg-red-950/50 border-red-500 shadow-lg shadow-red-950/40 ring-4 ring-red-500/20 scale-102' 
              : 'bg-slate-800/60 border-slate-700 opacity-60'
          }`}>
            <div className="text-xs font-black text-red-400 tracking-wider mb-0.5">{team1Name}</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{team1Score} đ</div>
            {currentTurn === 1 && (
              <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-red-500 text-white font-black text-[10px] tracking-wide animate-pulse">
                ĐANG LÀM BÀI ⚔️
              </div>
            )}
          </div>

          <div className="text-center px-2">
            <span className="text-xl sm:text-2xl font-black text-amber-400">VS</span>
            <div className="text-[11px] text-slate-400 font-bold mt-1">Câu {qIndex + 1}/{totalQuestions}</div>
          </div>

          {/* Team Blue Box */}
          <div className={`flex-1 min-w-[140px] p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
            currentTurn === 2 
              ? 'bg-blue-950/50 border-blue-500 shadow-lg shadow-blue-950/40 ring-4 ring-blue-500/20 scale-102' 
              : 'bg-slate-800/60 border-slate-700 opacity-60'
          }`}>
            <div className="text-xs font-black text-blue-400 tracking-wider mb-0.5">{team2Name}</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{team2Score} đ</div>
            {currentTurn === 2 && (
              <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-blue-500 text-white font-black text-[10px] tracking-wide animate-pulse">
                ĐANG LÀM BÀI ⚔️
              </div>
            )}
          </div>
        </div>

        {/* Tug-of-war Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span className="text-red-400">{team1Percent}% Thế trận</span>
            <span className="text-blue-400">{100 - team1Percent}% Thế trận</span>
          </div>
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500" 
              style={{ width: `${team1Percent}%` }}
            />
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" 
              style={{ width: `${100 - team1Percent}%` }}
            />
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
              {currentQ.topicTitle}
            </span>
          </div>

          <div className={`px-3 py-1 rounded-lg text-xs font-black border ${
            currentTurn === 1 ? 'bg-red-500/10 border-red-500/40 text-red-300' : 'bg-blue-500/10 border-blue-500/40 text-blue-300'
          }`}>
            LƯỢT THI CỦA: {currentTurn === 1 ? team1Name : team2Name}
          </div>
        </div>

        {/* Math Formula Content */}
        <div className="text-lg sm:text-2xl font-bold text-white leading-relaxed min-h-[4rem] flex items-center">
          <MathRenderer content={currentQ.content} />
        </div>

        {/* Large Touch Friendly Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isCorrect = idx === currentQ.correctAnswer;
            const isSelected = selectedOption === idx;

            let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/60 hover:text-white';
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
                className={`p-5 sm:p-6 rounded-2xl border-2 text-left font-semibold text-lg flex items-center gap-4 transition-all duration-200 select-none ${btnStyle} ${
                  !isAnswered ? 'cursor-pointer active:scale-98 active:bg-slate-700' : 'cursor-default'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black shrink-0 ${letterStyle}`}>
                  {letter}
                </div>
                <div className="flex-1 overflow-x-auto py-1">
                  <MathRenderer content={option} />
                </div>
                {isAnswered && isCorrect && (
                  <CheckCircle className="w-7 h-7 text-emerald-400 shrink-0 animate-scale" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-7 h-7 text-red-400 shrink-0 animate-shake" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase tracking-wide">
              <span>Lời Giải Chi Tiết Cho Lớp Học:</span>
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
              className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base tracking-wide shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{qIndex < totalQuestions - 1 ? 'CHUYỂN LƯỢT ĐỘI KẾ TIẾP ➔' : 'XEM TỔNG KẾT TRANH CÚP 🏆'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
