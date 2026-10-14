import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Download, 
  Settings, 
  Home, 
  BookOpen
} from 'lucide-react';
import { GradeLevel } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  grade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  activeGame: string;
  onGoHome: () => void;
  onOpenTeacherModal: () => void;
  onOpenExportModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  grade,
  onGradeChange,
  activeGame,
  onGoHome,
  onOpenTeacherModal,
  onOpenExportModal,
  soundEnabled,
  onToggleSound
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            ∑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
                Toán Học Đấu Trí THPT
              </span>
              <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                GDPT 2018
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Game Tương Tác Lớp 10 - 11 - 12 (Bảng Tương Tác & Máy Chiếu)
            </p>
          </div>
        </div>

        {/* Grade Filter & Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Grade Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={grade}
              onChange={(e) => {
                sound.playClick();
                onGradeChange(e.target.value as GradeLevel);
              }}
              className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer pr-1"
            >
              <option value="all" className="bg-slate-900 text-white">Toàn khối (10, 11, 12)</option>
              <option value="10" className="bg-slate-900 text-white">Toán Lớp 10</option>
              <option value="11" className="bg-slate-900 text-white">Toán Lớp 11</option>
              <option value="12" className="bg-slate-900 text-white">Toán Lớp 12</option>
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) sound.playClick();
            }}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-800/50 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen / Projector Mode */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình máy chiếu'}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Teacher Question Editor */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTeacherModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600 text-xs font-semibold transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Soạn đề & Cài đặt</span>
          </button>

          {/* Export Standalone HTML Offline */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenExportModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất HTML Offline</span>
          </button>

          {/* Home button when inside a game */}
          {activeGame !== 'hub' && (
            <button
              onClick={() => {
                sound.playClick();
                onGoHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Về Menu</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
