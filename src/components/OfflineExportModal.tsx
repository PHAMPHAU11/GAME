import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  CheckCircle2, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { MathQuestion, GameSettings } from '../types';
import { generateStandaloneHtml } from '../utils/standaloneHtmlGenerator';
import { sound } from '../utils/audio';

interface OfflineExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: MathQuestion[];
  settings: GameSettings;
}

export const OfflineExportModal: React.FC<OfflineExportModalProps> = ({
  isOpen,
  onClose,
  questions,
  settings
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateStandaloneHtml(questions, settings);

  const handleDownload = () => {
    sound.playCorrect();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Toan_Hoc_Dau_Tri_THPT_GDPT2018.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(htmlContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Xuất Ứng Dụng Thành File HTML Độc Lập (Single-File Offline)
              </h3>
              <p className="text-xs text-slate-400">
                1 file duy nhất chứa đầy đủ mã nguồn, giao diện, âm thanh Web Audio và công thức Toán
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Advantages */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-2">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Đặc Điểm Nổi Bật Của Bản Xuất Offline:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Chạy 100% Offline:</strong> Không cần Internet, không cần cài đặt máy chủ Node.js</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Âm thanh Web Audio:</strong> Tự tổng hợp sóng âm, không lo bị lỗi thiếu file MP3</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Đầy đủ 4 Trò chơi:</strong> Rung Chuông Vàng, Đường Đua, Mảnh Ghép, Đấu 2 Đội</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dễ mang đi dạy:</strong> Copy vào USB, mở trên mọi Tivi, Máy chiếu, Bảng tương tác</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-950/40 hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>TẢI FILE .HTML VỀ MÁY NGAY</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'ĐÃ SAO CHÉP MÃ NGUỒN' : 'Sao Chép Toàn Bộ Mã'}</span>
            </button>
          </div>

          {/* Code Preview snippet */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                Mã nguồn HTML (Dung lượng: ~{Math.round(htmlContent.length / 1024)} KB):
              </span>
              <span>UTF-8 Chuẩn Tiếng Việt</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto max-h-48 leading-relaxed select-all">
              {htmlContent.substring(0, 1500)}...
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
