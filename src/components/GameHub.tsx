import React from 'react';
import { 
  Bell, 
  Flame, 
  Puzzle, 
  Swords, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { GameMode, GradeLevel, MathTopic, MathQuestion } from '../types';
import { TOPIC_NAMES } from '../data/questionBank';
import { sound } from '../utils/audio';

interface GameHubProps {
  onSelectGame: (mode: GameMode) => void;
  grade: GradeLevel;
  selectedTopic: MathTopic;
  onTopicChange: (topic: MathTopic) => void;
  questions: MathQuestion[];
}

export const GameHub: React.FC<GameHubProps> = ({
  onSelectGame,
  grade,
  selectedTopic,
  onTopicChange,
  questions
}) => {
  const filteredQuestions = questions.filter(q => {
    const matchGrade = grade === 'all' || q.grade === grade;
    const matchTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    return matchGrade && matchTopic;
  });

  const availableTopics = Array.from(new Set(questions.map(q => q.topic)));

  const handleLaunch = (mode: GameMode) => {
    sound.playBell();
    onSelectGame(mode);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            CHƯƠNG TRÌNH GDPT 2018 • BỘ SÁCH KẾT NỐI TRI THỨC / CHÂN TRỜI / CÁNH DIỀU
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Kho Trò Chơi Tương Tác <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              Toán Học THPT (10 - 11 - 12)
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Nền tảng trò chơi hóa lớp học dành cho Giáo viên môn Toán. Đầy đủ công thức LaTeX/MathType, âm thanh Web Audio 100% Offline, sẵn sàng trình chiếu lên Tivi thông minh, Máy chiếu và Bảng tương tác.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Ngân hàng: <strong className="text-white">{filteredQuestions.length} câu</strong> chuẩn hóa</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hỗ trợ 4 mức độ: Nhận biết, Thông hiểu, Vận dụng, VDC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Filter Pill List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Lọc theo chủ đề bài học:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onTopicChange('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedTopic === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                : 'bg-slate-800/90 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            Tất cả chủ đề ({questions.length})
          </button>
          {availableTopics.map(topic => {
            const count = questions.filter(q => (grade === 'all' || q.grade === grade) && q.topic === topic).length;
            if (count === 0) return null;
            return (
              <button
                key={topic}
                onClick={() => {
                  sound.playClick();
                  onTopicChange(topic);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTopic === topic
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                    : 'bg-slate-800/90 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80 border border-slate-700/60'
                }`}
              >
                {TOPIC_NAMES[topic] || topic} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Interactive Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game 1: Rung Chuông Vàng */}
        <div 
          onClick={() => handleLaunch('golden_bell')}
          className="group relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 hover:border-amber-500/60 p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all text-amber-400">
            <Bell className="w-32 h-32" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
              <Bell className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Gameshow Kinh Điển</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">Cá nhân / Toàn lớp</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                Rung Chuông Vàng
              </h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Vượt qua từng mốc câu hỏi kịch tính với 3 quyền trợ giúp (50:50, Gợi ý công thức, Đổi câu hỏi). Âm thanh tiếng chuông đồng hồ hồi hộp chuẩn Gameshow truyền hình.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-950/40 group-hover:translate-x-0.5 transition-all flex items-center justify-center gap-2">
              <span>BẮT ĐẦU CHƠI RUNG CHUÔNG VÀNG</span>
              <span>🔔</span>
            </button>
          </div>
        </div>

        {/* Game 2: Đường Đua Toán Học */}
        <div 
          onClick={() => handleLaunch('speed_racer')}
          className="group relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 hover:border-blue-500/60 p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all text-blue-400">
            <Flame className="w-32 h-32" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg">
              <Flame className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Tốc Độ & Phản Xạ</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">Vượt chướng ngại vật</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-blue-300 transition-colors">
                Đường Đua Toán Học (Speed Grand Prix)
              </h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Xe đua tăng tốc theo chuỗi câu trả lời đúng! Kích hoạt Nitro Turbo tăng tốc vượt qua các chướng ngại vật như đèo dốc, khúc cua đạo hàm và tích phân.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-lg shadow-blue-950/40 group-hover:translate-x-0.5 transition-all flex items-center justify-center gap-2">
              <span>VÀO ĐƯỜNG ĐUA TỐC ĐỘ</span>
              <span>🏎️</span>
            </button>
          </div>
        </div>

        {/* Game 3: Lật Mảnh Ghép Bí Mật */}
        <div 
          onClick={() => handleLaunch('mystery_puzzle')}
          className="group relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 hover:border-purple-500/60 p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all text-purple-400">
            <Puzzle className="w-32 h-32" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg">
              <Puzzle className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Khám Phá Tri Thức</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">Giải mã bí ẩn</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                Lật Mảnh Ghép Bí Mật
              </h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Bức tranh lịch sử về các nhà Toán học lỗi lạc (Pythagoras, Euler, Gauss...) đang bị ẩn giấu sau các ô số. Mỗi bài toán giải đúng sẽ lật mở một mảnh ghép kỳ diệu.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-sm tracking-wide shadow-lg shadow-purple-950/40 group-hover:translate-x-0.5 transition-all flex items-center justify-center gap-2">
              <span>LẬT MẢNH GHÉP KỲ BÍ</span>
              <span>🧩</span>
            </button>
          </div>
        </div>

        {/* Game 4: Đấu Trường Đối Kháng 2 Đội */}
        <div 
          onClick={() => handleLaunch('team_battle')}
          className="group relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 hover:border-emerald-500/60 p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all text-emerald-400">
            <Swords className="w-32 h-32" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
              <Swords className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Đặc Biệt Cho Bảng Tương Tác</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">Đội Đỏ vs Đội Xanh</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                Đấu Trường Tiếp Sức (2 Đội)
              </h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Tuyệt vời cho tiết học sôi động tại lớp! Chia học sinh thành 2 đội Đỏ & Xanh, luân phiên bấm bảng giải toán đối kháng, thanh giằng co điểm số trực quan trên máy chiếu.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-950/40 group-hover:translate-x-0.5 transition-all flex items-center justify-center gap-2">
              <span>KHỞI TRANH ĐỐI KHÁNG 2 ĐỘI</span>
              <span>⚔️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
