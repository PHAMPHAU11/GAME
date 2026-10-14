/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GradeLevel, MathTopic, GameMode, MathQuestion, GameSettings } from './types';
import { INITIAL_QUESTIONS } from './data/questionBank';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { GameHub } from './components/GameHub';
import { GoldenBellGame } from './components/games/GoldenBellGame';
import { SpeedRacerGame } from './components/games/SpeedRacerGame';
import { MysteryPuzzleGame } from './components/games/MysteryPuzzleGame';
import { TeamBattleGame } from './components/games/TeamBattleGame';
import { TeacherEditorModal } from './components/TeacherEditorModal';
import { OfflineExportModal } from './components/OfflineExportModal';

export default function App() {
  const [grade, setGrade] = useState<GradeLevel>('all');
  const [selectedTopic, setSelectedTopic] = useState<MathTopic>('all');
  const [activeGame, setActiveGame] = useState<GameMode>('hub');
  const [questions, setQuestions] = useState<MathQuestion[]>(INITIAL_QUESTIONS);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [settings, setSettings] = useState<GameSettings>({
    hasTimer: true,
    timePerQuestion: 25,
    soundEnabled: true,
    showExplanation: true,
    team1Name: '🔴 ĐỘI ĐỎ',
    team2Name: '🔵 ĐỘI XANH'
  });

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sound.enabled = nextVal;
  };

  const handleGoHome = () => {
    setActiveGame('hub');
  };

  // Filter questions for the active game session
  const gameQuestions = questions.filter(q => {
    const matchGrade = grade === 'all' || q.grade === grade;
    const matchTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    return matchGrade && matchTopic;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Header
        grade={grade}
        onGradeChange={setGrade}
        activeGame={activeGame}
        onGoHome={handleGoHome}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeGame === 'hub' && (
          <GameHub
            onSelectGame={(mode) => setActiveGame(mode)}
            grade={grade}
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            questions={questions}
          />
        )}

        {activeGame === 'golden_bell' && (
          <GoldenBellGame
            questions={gameQuestions.length > 0 ? gameQuestions : questions}
            settings={settings}
            onFinish={handleGoHome}
            onGoHome={handleGoHome}
          />
        )}

        {activeGame === 'speed_racer' && (
          <SpeedRacerGame
            questions={gameQuestions.length > 0 ? gameQuestions : questions}
            settings={settings}
            onFinish={handleGoHome}
            onGoHome={handleGoHome}
          />
        )}

        {activeGame === 'mystery_puzzle' && (
          <MysteryPuzzleGame
            questions={gameQuestions.length > 0 ? gameQuestions : questions}
            settings={settings}
            onFinish={handleGoHome}
            onGoHome={handleGoHome}
          />
        )}

        {activeGame === 'team_battle' && (
          <TeamBattleGame
            questions={gameQuestions.length > 0 ? gameQuestions : questions}
            settings={settings}
            onFinish={handleGoHome}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Toán Học THPT (Lớp 10, 11, 12) • Chương trình Giáo dục Phổ thông 2018
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>⚡ Web Audio API Tự Sinh Âm</span>
            <span>📐 KaTeX / MathJax LaTeX</span>
            <span>💾 Hỗ trợ xuất Offline 100%</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TeacherEditorModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        questions={questions}
        onUpdateQuestions={setQuestions}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      <OfflineExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        questions={questions}
        settings={settings}
      />
    </div>
  );
}
