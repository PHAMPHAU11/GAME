import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  Upload, 
  Check, 
  Eye, 
  Clock, 
  Sliders, 
  Users 
} from 'lucide-react';
import { MathQuestion, GameSettings, MathTopic, DifficultyLevel } from '../types';
import { MathRenderer } from '../utils/mathRenderer';
import { sound } from '../utils/audio';

interface TeacherEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: MathQuestion[];
  onUpdateQuestions: (newQuestions: MathQuestion[]) => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
}

export const TeacherEditorModal: React.FC<TeacherEditorModalProps> = ({
  isOpen,
  onClose,
  questions,
  onUpdateQuestions,
  settings,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'add_new' | 'settings'>('questions');
  const [copied, setCopied] = useState(false);

  // New Question Form state
  const [grade, setGrade] = useState<'10' | '11' | '12'>('12');
  const [topic, setTopic] = useState<MathTopic>('khao_sat_ham_so');
  const [topicTitle, setTopicTitle] = useState('Hàm số & Khảo sát');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('thong_hieu');
  const [content, setContent] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<0 | 1 | 2 | 3>(0);
  const [explanation, setExplanation] = useState('');
  const [hint, setHint] = useState('');

  if (!isOpen) return null;

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      alert('Vui lòng điền đầy đủ nội dung câu hỏi và 4 phương án A, B, C, D!');
      return;
    }

    const newQ: MathQuestion = {
      id: `custom_${Date.now()}`,
      grade,
      topic,
      topicTitle,
      difficulty,
      content,
      options: [optA, optB, optC, optD],
      correctAnswer,
      explanation: explanation || 'Đáp án đúng theo định nghĩa và công thức toán học.',
      hint
    };

    onUpdateQuestions([newQ, ...questions]);
    sound.playCorrect();

    // Reset form
    setContent('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
    setHint('');
    setActiveTab('questions');
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Thầy/Cô có chắc chắn muốn xóa câu hỏi này?')) {
      onUpdateQuestions(questions.filter(q => q.id !== id));
      sound.playClick();
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(questions, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleImportJSON = () => {
    const input = window.prompt('Dán chuỗi JSON danh sách câu hỏi vào đây:');
    if (input) {
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onUpdateQuestions(parsed);
          sound.playCorrect();
          alert(`Đã nạp thành công ${parsed.length} câu hỏi mới!`);
        } else {
          alert('Dữ liệu không đúng định dạng mảng câu hỏi.');
        }
      } catch {
        alert('Lỗi phân tích JSON! Vui lòng kiểm tra lại cú pháp.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <span>Khu Vực Soạn Đề & Cài Đặt Dành Cho Giáo Viên</span>
            </h3>
            <p className="text-xs text-slate-400">
              Quản lý ngân hàng câu hỏi GDPT 2018, tùy biến thời gian, âm thanh & chia đội
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 gap-4 bg-slate-950/50">
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'questions'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Danh Sách Câu Hỏi ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('add_new')}
            className={`py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'add_new'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Câu Mới (Có LaTeX)</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tùy Biến Lớp Học & Đồng Hồ
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: QUESTIONS LIST */}
          {activeTab === 'questions' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80">
                <span className="text-xs text-slate-300">
                  Tổng số: <strong className="text-white">{questions.length} câu hỏi</strong> trong hệ thống.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép JSON' : 'Sao chép JSON'}</span>
                  </button>
                  <button
                    onClick={handleImportJSON}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Nhập file JSON</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 hover:border-slate-600 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">#{idx + 1}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          LỚP {q.grade}
                        </span>
                        <span className="text-xs text-slate-300 font-medium">{q.topicTitle}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Xóa câu hỏi này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-white">
                      <MathRenderer content={q.content} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-1.5 px-2 rounded-lg border flex items-center gap-1.5 ${
                            oIdx === q.correctAnswer
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-mono">{['A', 'B', 'C', 'D'][oIdx]}.</span>
                          <MathRenderer content={opt} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW QUESTION */}
          {activeTab === 'add_new' && (
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Khối Lớp:</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as '10' | '11' | '12')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="10">Toán Lớp 10</option>
                    <option value="11">Toán Lớp 11</option>
                    <option value="12">Toán Lớp 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Chủ đề bài học:</label>
                  <input
                    type="text"
                    value={topicTitle}
                    onChange={(e) => setTopicTitle(e.target.value)}
                    placeholder="VD: Đạo hàm & Khảo sát hàm số"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mức độ nhận thức:</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="nhan_biet">Nhận biết</option>
                    <option value="thong_hieu">Thông hiểu</option>
                    <option value="van_dung">Vận dụng</option>
                    <option value="van_dung_cao">Vận dụng cao</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nội dung câu hỏi (Kẹp công thức giữa dấu $...$):
                </label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ví dụ: Tính giá trị tích phân $I = \\int_0^1 (2x + 1)dx$..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Live Preview */}
              {content && (
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/30 text-sm">
                  <span className="text-[10px] text-blue-400 font-bold block mb-1 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Xem trước công thức hiển thị:
                  </span>
                  <MathRenderer content={content} />
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phương án A:</label>
                  <input
                    type="text"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    placeholder="VD: $x = 2$"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phương án B:</label>
                  <input
                    type="text"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    placeholder="VD: $x = -1$"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phương án C:</label>
                  <input
                    type="text"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    placeholder="VD: $x = 0$"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phương án D:</label>
                  <input
                    type="text"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    placeholder="VD: $x = 1$"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Correct Answer Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Đáp án đúng:</label>
                <div className="flex gap-4">
                  {[0, 1, 2, 3].map((val) => (
                    <label key={val} className="flex items-center gap-1.5 cursor-pointer text-sm font-bold text-white">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctAnswer === val}
                        onChange={() => setCorrectAnswer(val as 0 | 1 | 2 | 3)}
                        className="text-emerald-500"
                      />
                      <span>{['A', 'B', 'C', 'D'][val]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Explanation & Hint */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Lời giải chi tiết:</label>
                  <input
                    type="text"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="VD: Ta tính $f'(x) = 0$ suy ra nghiệm..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Gợi ý cho học sinh:</label>
                  <input
                    type="text"
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    placeholder="VD: Nhớ lại công thức nguyên hàm từng phần"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu Câu Hỏi Vào Ngân Hàng</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/80">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Cài Đặt Đồng Hồ Đếm Ngược</span>
                </h4>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">Bật đồng hồ đếm ngược</div>
                    <div className="text-xs text-slate-400">Nếu tắt, học sinh sẽ có thời gian làm bài không giới hạn</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.hasTimer}
                    onChange={(e) => onUpdateSettings({ ...settings, hasTimer: e.target.checked })}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                </div>

                {settings.hasTimer && (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Thời gian suy nghĩ mỗi câu (giây):
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={180}
                      value={settings.timePerQuestion}
                      onChange={(e) => onUpdateSettings({ ...settings, timePerQuestion: parseInt(e.target.value) || 25 })}
                      className="w-32 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Teams Customization */}
              <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/80">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Tên Đội Cho Chế Độ Đấu Trường 2 Đội</span>
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-red-400 mb-1">Tên Đội 1:</label>
                    <input
                      type="text"
                      value={settings.team1Name}
                      onChange={(e) => onUpdateSettings({ ...settings, team1Name: e.target.value })}
                      placeholder="🔴 Đội Đỏ"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-400 mb-1">Tên Đội 2:</label>
                    <input
                      type="text"
                      value={settings.team2Name}
                      onChange={(e) => onUpdateSettings({ ...settings, team2Name: e.target.value })}
                      placeholder="🔵 Đội Xanh"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
