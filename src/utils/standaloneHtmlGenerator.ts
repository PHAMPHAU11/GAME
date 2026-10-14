import { MathQuestion, GameSettings } from '../types';

export function generateStandaloneHtml(questions: MathQuestion[], settings: GameSettings): string {
  const serializedQuestions = JSON.stringify(questions, null, 2);
  const serializedSettings = JSON.stringify(settings, null, 2);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Toán Học Đấu Trí THPT - Game Giáo Dục GDPT 2018 (Bản Offline)</title>
  <!-- MathJax for crystal clear mathematical formulas -->
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
      },
      svg: { fontCache: 'global' },
      options: { enableMenu: false }
    };
  </script>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" id="MathJax-script" async></script>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --card-border: #1f2937;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --accent: #f59e0b;
      --accent-hover: #d97706;
      --success: #10b981;
      --danger: #ef4444;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #090d16 65%, #05070c 100%);
      color: var(--text);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
    }
    header {
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.85rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 800;
      font-size: 1.25rem;
      background: linear-gradient(135deg, #60a5fa, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.07);
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s;
    }
    .btn:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
    .btn-primary {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      border-color: #60a5fa;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
    }
    .btn-accent {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      border-color: #fbbf24;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
      flex: 1;
      width: 100%;
    }
    .grid-2x2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 1.25rem;
      margin-top: 1.5rem;
    }
    .game-card {
      background: rgba(17, 24, 39, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }
    .game-card:hover {
      border-color: #60a5fa;
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
      background: rgba(30, 41, 59, 0.85);
    }
    .game-card .icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }
    .game-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .game-card p {
      font-size: 0.875rem;
      color: var(--text-muted);
      line-height: 1.4;
      margin-bottom: 1rem;
    }
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      background: rgba(17, 24, 39, 0.6);
      padding: 0.85rem 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      align-items: center;
      margin-bottom: 1.5rem;
    }
    select, input {
      background: #1f2937;
      color: white;
      border: 1px solid #374151;
      padding: 0.45rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      outline: none;
    }
    /* Question Box */
    .question-box {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 1rem;
      padding: 1.75rem;
      margin-bottom: 1.25rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }
    .q-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      color: #9ca3af;
    }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .badge-grade { background: rgba(59, 130, 246, 0.2); color: #93c5fd; border: 1px solid #3b82f6; }
    .badge-diff { background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid #f59e0b; }
    .q-text {
      font-size: 1.25rem;
      line-height: 1.6;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 1.5rem;
    }
    .options-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.85rem;
    }
    @media (min-width: 640px) {
      .options-grid { grid-template-columns: 1fr 1fr; }
    }
    .opt-btn {
      background: rgba(31, 41, 55, 0.8);
      border: 2px solid rgba(255, 255, 255, 0.1);
      color: #f3f4f6;
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      font-size: 1.05rem;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.85rem;
      transition: all 0.2s;
    }
    .opt-btn:hover:not(:disabled) {
      border-color: #60a5fa;
      background: rgba(59, 130, 246, 0.15);
      transform: translateX(3px);
    }
    .opt-btn.correct {
      border-color: #10b981 !important;
      background: rgba(16, 185, 129, 0.25) !important;
      color: #34d399 !important;
    }
    .opt-btn.wrong {
      border-color: #ef4444 !important;
      background: rgba(239, 68, 68, 0.25) !important;
      color: #f87171 !important;
    }
    .opt-letter {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }
    /* Timer bar */
    .timer-container {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
      margin-bottom: 1.25rem;
    }
    .timer-fill {
      height: 100%;
      background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
      transition: width 1s linear;
    }
    /* Canvas for Confetti */
    #confetti-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 100;
    }
    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(6px);
      z-index: 80;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .modal.active { display: flex; }
    .modal-content {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 1rem;
      max-width: 650px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 1.75rem;
    }
  </style>
</head>
<body>
  <canvas id="confetti-canvas"></canvas>

  <header>
    <div class="brand" onclick="goHome()">
      <span>📐</span>
      <span>Toán Học Đấu Trí THPT</span>
      <span style="font-size: 0.75rem; background: rgba(59,130,246,0.25); border:1px solid #3b82f6; padding: 2px 6px; border-radius: 4px; color: #93c5fd;">GDPT 2018</span>
    </div>
    <div class="header-actions">
      <button class="btn" onclick="toggleAudio()" id="sound-btn">🔊 Âm thanh</button>
      <button class="btn" onclick="openTeacherEditor()">📝 Ngân hàng đề</button>
      <button class="btn btn-primary" onclick="goHome()">🏠 Menu chính</button>
    </div>
  </header>

  <div class="container" id="app-container">
    <!-- View will be rendered here dynamically -->
  </div>

  <script>
    // --- 1. SOUND ENGINE (100% Offline Web Audio API Synthesizer) ---
    class WebAudioSynth {
      constructor() {
        this.ctx = null;
        this.enabled = true;
      }
      init() {
        if (!this.ctx && typeof AudioContext !== 'undefined') {
          this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }
      playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.08);
          osc.stop(this.ctx.currentTime + i * 0.08 + 0.3);
        });
      }
      playWrong() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
      }
      playBell() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        [440, 880, 1320, 1760].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.3 / (idx + 1), this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 1.6);
        });
      }
      playTick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
      }
      playFanfare() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const seq = [
          { f: 523.25, t: 0, d: 0.12 },
          { f: 523.25, t: 0.14, d: 0.12 },
          { f: 659.25, t: 0.28, d: 0.25 },
          { f: 783.99, t: 0.55, d: 0.2 },
          { f: 1046.5, t: 0.75, d: 0.6 }
        ];
        seq.forEach(s => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(s.f, this.ctx.currentTime + s.t);
          gain.gain.setValueAtTime(0.25, this.ctx.currentTime + s.t);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + s.t + s.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + s.t);
          osc.stop(this.ctx.currentTime + s.t + s.d);
        });
      }
    }
    const sound = new WebAudioSynth();

    function toggleAudio() {
      sound.enabled = !sound.enabled;
      document.getElementById('sound-btn').innerText = sound.enabled ? '🔊 Âm thanh' : '🔇 Tắt tiếng';
    }

    // --- 2. CONFETTI GENERATOR (Pure Offline Canvas) ---
    function triggerConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particles = [];
      const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#ec4899', '#8b5cf6'];
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height * 0.35,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.7) * 12,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          vrot: (Math.random() - 0.5) * 10,
          opacity: 1
        });
      }
      let frame = 0;
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.3; // gravity
          p.rotation += p.vrot;
          p.opacity -= 0.012;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });
        frame++;
        if (frame < 80) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      animate();
    }

    // --- 3. QUESTION DATA & STATE ---
    let QUESTIONS = ${serializedQuestions};
    let SETTINGS = ${serializedSettings};
    let currentGrade = 'all';
    let currentTopic = 'all';
    let activeGame = 'hub';
    let gameState = {
      qIndex: 0,
      score: 0,
      timer: 25,
      timerId: null,
      answered: false,
      activeQuestions: [],
      // Team battle
      team1Score: 0,
      team2Score: 0,
      currentTurn: 1, // 1 or 2
      // Lifelines
      lifelines: { fiftyFifty: true, hint: true, skip: true },
      hiddenOptions: []
    };

    function renderMath() {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().catch(() => {});
      }
    }

    function getFilteredQuestions() {
      return QUESTIONS.filter(q => {
        const matchGrade = currentGrade === 'all' || q.grade === currentGrade;
        const matchTopic = currentTopic === 'all' || q.topic === currentTopic;
        return matchGrade && matchTopic;
      });
    }

    // --- 4. VIEW RENDERING ---
    function goHome() {
      if (gameState.timerId) clearInterval(gameState.timerId);
      activeGame = 'hub';
      renderHub();
    }

    function renderHub() {
      const container = document.getElementById('app-container');
      const filtered = getFilteredQuestions();
      container.innerHTML = \`
        <div style="text-align: center; margin-bottom: 2rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, #60a5fa, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Đấu Trường Toán Học THPT
          </h1>
          <p style="color: #9ca3af; font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
            Hệ thống trò chơi học tập tương tác chuẩn GDPT 2018 (Lớp 10, 11, 12). Tối ưu cho Máy chiếu & Màn hình tương tác.
          </p>
        </div>

        <div class="filter-bar">
          <label style="font-weight: 600; font-size: 0.85rem; color: #9ca3af;">Khối Lớp:</label>
          <select id="grade-select" onchange="onFilterChange()">
            <option value="all" \${currentGrade === 'all' ? 'selected' : ''}>Tất cả khối (10, 11, 12)</option>
            <option value="10" \${currentGrade === '10' ? 'selected' : ''}>Toán Lớp 10</option>
            <option value="11" \${currentGrade === '11' ? 'selected' : ''}>Toán Lớp 11</option>
            <option value="12" \${currentGrade === '12' ? 'selected' : ''}>Toán Lớp 12</option>
          </select>

          <span style="color: #6b7280;">|</span>
          <span style="font-size: 0.85rem; color: #9ca3af;">Hiện có: <strong style="color: #60a5fa;">\${filtered.length} câu hỏi</strong> sẵn sàng</span>
        </div>

        <div class="grid-2x2">
          <div class="game-card" onclick="startGame('golden_bell')">
            <div class="icon">🔔</div>
            <h3>Rung Chuông Vàng</h3>
            <p>Thử thách cá nhân hoặc toàn lớp qua các nấc thang kiến thức với 3 quyền trợ giúp kịch tính.</p>
            <button class="btn btn-accent" style="width: 100%; justify-content: center;">Bắt đầu Chơi 🔔</button>
          </div>

          <div class="game-card" onclick="startGame('speed_racer')">
            <div class="icon">🏎️</div>
            <h3>Đường Đua Toán Học</h3>
            <p>Vượt chướng ngại vật & tăng tốc turbo! Trả lời đúng liên tiếp để nạp nitro và về đích sớm nhất.</p>
            <button class="btn btn-primary" style="width: 100%; justify-content: center;">Vào Đường Đua 🏎️</button>
          </div>

          <div class="game-card" onclick="startGame('mystery_puzzle')">
            <div class="icon">🧩</div>
            <h3>Lật Mảnh Ghép Bí Mật</h3>
            <p>Mỗi câu trả lời đúng sẽ mở ra một mảnh ghép của danh nhân Toán học hoặc ứng dụng thực tế.</p>
            <button class="btn" style="width: 100%; justify-content: center; background: #6366f1; border-color: #818cf8;">Khám Phá Bí Mật 🧩</button>
          </div>

          <div class="game-card" onclick="startGame('team_battle')">
            <div class="icon">⚔️</div>
            <h3>Đấu Trường Tiếp Sức (2 Đội)</h3>
            <p>Dành riêng cho Bảng Tương Tác: Chia lớp thành Đội Đỏ vs Đội Xanh, thi đua đối kháng tính điểm trực tiếp.</p>
            <button class="btn" style="width: 100%; justify-content: center; background: #10b981; border-color: #34d399;">Khởi Tranh 2 Đội ⚔️</button>
          </div>
        </div>
      \`;
    }

    function onFilterChange() {
      currentGrade = document.getElementById('grade-select').value;
      renderHub();
    }

    function startGame(mode) {
      const questions = getFilteredQuestions();
      if (questions.length === 0) {
        alert('Chưa có câu hỏi nào trong danh mục đã chọn! Hãy chọn danh mục khác.');
        return;
      }
      activeGame = mode;
      gameState.qIndex = 0;
      gameState.score = 0;
      gameState.team1Score = 0;
      gameState.team2Score = 0;
      gameState.currentTurn = 1;
      gameState.activeQuestions = [...questions].sort(() => 0.5 - Math.random());
      gameState.lifelines = { fiftyFifty: true, hint: true, skip: true };
      gameState.hiddenOptions = [];

      sound.playBell();
      renderCurrentGame();
    }

    function renderCurrentGame() {
      if (activeGame === 'golden_bell') renderGoldenBell();
      else if (activeGame === 'speed_racer') renderSpeedRacer();
      else if (activeGame === 'mystery_puzzle') renderMysteryPuzzle();
      else if (activeGame === 'team_battle') renderTeamBattle();
    }

    // --- GAME 1: RUNG CHUÔNG VÀNG ---
    function renderGoldenBell() {
      const container = document.getElementById('app-container');
      const q = gameState.activeQuestions[gameState.qIndex];
      const totalQ = gameState.activeQuestions.length;

      startTimer();

      container.innerHTML = \`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #fbbf24;">🔔 Rung Chuông Vàng - Câu \${gameState.qIndex + 1}/\${totalQ}</h2>
            <p style="color: #9ca3af; font-size: 0.85rem;">Điểm hiện tại: <strong style="color: #34d399;">\${gameState.score}</strong> điểm</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn" onclick="useFiftyFifty()" \${!gameState.lifelines.fiftyFifty ? 'disabled style="opacity:0.4"' : ''}>50:50</button>
            <button class="btn" onclick="useHint()" \${!gameState.lifelines.hint ? 'disabled style="opacity:0.4"' : ''}>💡 Gợi ý</button>
            <button class="btn" onclick="skipQuestion()" \${!gameState.lifelines.skip ? 'disabled style="opacity:0.4"' : ''}>⏭️ Đổi câu</button>
          </div>
        </div>

        <div class="timer-container">
          <div class="timer-fill" id="timer-bar" style="width: 100%;"></div>
        </div>

        <div class="question-box">
          <div class="q-meta">
            <span class="badge badge-grade">Toán Lớp \${q.grade} - \${q.topicTitle}</span>
            <span style="font-weight: 700; color: #fbbf24;" id="timer-text">\${gameState.timer}s</span>
          </div>
          <div class="q-text">\${q.content}</div>

          <div class="options-grid">
            \${q.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isHidden = gameState.hiddenOptions.includes(idx);
              return \`
                <button class="opt-btn" id="opt-\${idx}" onclick="selectAnswer(\${idx})" \${isHidden ? 'style="visibility:hidden;"' : ''}>
                  <div class="opt-letter">\${letter}</div>
                  <div>\${opt}</div>
                </button>
              \`;
            }).join('')}
          </div>

          <div id="explanation-box" style="display: none; margin-top: 1.5rem; padding: 1rem; border-radius: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6;">
            <h4 style="color: #93c5fd; font-weight: 700; margin-bottom: 0.35rem;">Giải thích chi tiết:</h4>
            <p style="color: #e5e7eb; font-size: 0.95rem;">\${q.explanation}</p>
          </div>
        </div>

        <div id="next-action" style="display: flex; justify-content: flex-end; margin-top: 1rem;"></div>
      \`;

      renderMath();
    }

    // --- GAME 2: SPEED RACER ---
    function renderSpeedRacer() {
      const container = document.getElementById('app-container');
      const q = gameState.activeQuestions[gameState.qIndex];
      const totalQ = gameState.activeQuestions.length;
      const progressPercent = Math.round((gameState.qIndex / totalQ) * 100);

      container.innerHTML = \`
        <div style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #60a5fa;">🏎️ Đường Đua Toán Học - Chặng \${gameState.qIndex + 1}/\${totalQ}</h2>
          <div style="background: rgba(31, 41, 55, 0.8); height: 38px; border-radius: 9999px; position: relative; margin-top: 0.75rem; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
            <div style="background: linear-gradient(90deg, #3b82f6, #10b981); height: 100%; width: \${progressPercent}%; transition: width 0.4s ease;"></div>
            <div style="position: absolute; left: calc(\${progressPercent}% - 20px); top: 3px; font-size: 1.5rem; transition: left 0.4s ease;">🏎️</div>
            <div style="position: absolute; right: 12px; top: 8px; font-size: 1.1rem;">🏁 Về đích</div>
          </div>
        </div>

        <div class="question-box">
          <div class="q-meta">
            <span class="badge badge-grade">Chủ đề: \${q.topicTitle}</span>
            <span style="color: #34d399; font-weight: 700;">Tốc độ: \${80 + gameState.score * 15} km/h ⚡</span>
          </div>
          <div class="q-text">\${q.content}</div>

          <div class="options-grid">
            \${q.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return \`
                <button class="opt-btn" id="opt-\${idx}" onclick="selectAnswer(\${idx})">
                  <div class="opt-letter">\${letter}</div>
                  <div>\${opt}</div>
                </button>
              \`;
            }).join('')}
          </div>

          <div id="explanation-box" style="display: none; margin-top: 1.5rem; padding: 1rem; border-radius: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6;">
            <h4 style="color: #93c5fd; font-weight: 700; margin-bottom: 0.35rem;">Giải thích lời giải:</h4>
            <p style="color: #e5e7eb; font-size: 0.95rem;">\${q.explanation}</p>
          </div>
        </div>
        <div id="next-action" style="display: flex; justify-content: flex-end; margin-top: 1rem;"></div>
      \`;

      renderMath();
    }

    // --- GAME 3: MYSTERY PUZZLE ---
    function renderMysteryPuzzle() {
      const container = document.getElementById('app-container');
      const q = gameState.activeQuestions[gameState.qIndex];
      const totalTiles = 6;
      const openedTiles = Math.min(gameState.score, totalTiles);

      container.innerHTML = \`
        <div style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #a78bfa;">🧩 Mảnh Ghép Bí Mật - Câu \${gameState.qIndex + 1}</h2>
          <p style="color: #9ca3af; font-size: 0.85rem;">Đã mở: \${openedTiles}/\${totalTiles} mảnh ghép. Hãy giải các bài toán để khám phá bức tranh danh nhân!</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 420px; margin: 0 auto 1.5rem; height: 180px; border: 2px solid #6366f1; border-radius: 0.75rem; overflow: hidden; background: url('https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80') center/cover;">
          \${Array.from({length: totalTiles}).map((_, i) => {
            const isUnlocked = i < openedTiles;
            return \`
              <div style="background: \${isUnlocked ? 'transparent' : 'rgba(17, 24, 39, 0.95)'}; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; color: #a78bfa; transition: all 0.5s;">
                \${isUnlocked ? '' : '❓ ' + (i + 1)}
              </div>
            \`;
          }).join('')}
        </div>

        <div class="question-box">
          <div class="q-meta">
            <span class="badge badge-grade">\${q.topicTitle}</span>
          </div>
          <div class="q-text">\${q.content}</div>

          <div class="options-grid">
            \${q.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return \`
                <button class="opt-btn" id="opt-\${idx}" onclick="selectAnswer(\${idx})">
                  <div class="opt-letter">\${letter}</div>
                  <div>\${opt}</div>
                </button>
              \`;
            }).join('')}
          </div>

          <div id="explanation-box" style="display: none; margin-top: 1.5rem; padding: 1rem; border-radius: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6;">
            <h4 style="color: #93c5fd; font-weight: 700; margin-bottom: 0.35rem;">Giải thích:</h4>
            <p style="color: #e5e7eb; font-size: 0.95rem;">\${q.explanation}</p>
          </div>
        </div>
        <div id="next-action" style="display: flex; justify-content: flex-end; margin-top: 1rem;"></div>
      \`;

      renderMath();
    }

    // --- GAME 4: TEAM BATTLE (ĐẤU TRƯỜNG 2 ĐỘI) ---
    function renderTeamBattle() {
      const container = document.getElementById('app-container');
      const q = gameState.activeQuestions[gameState.qIndex];
      const isTeam1 = gameState.currentTurn === 1;

      container.innerHTML = \`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; background: rgba(17,24,39,0.8); padding: 1rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.1);">
          <div style="padding: 0.75rem 1.25rem; border-radius: 0.5rem; background: \${isTeam1 ? 'rgba(239, 68, 68, 0.3)' : 'transparent'}; border: 2px solid #ef4444; text-align: center;">
            <div style="font-size: 0.85rem; color: #fca5a5;">\${SETTINGS.team1Name || '🔴 ĐỘI ĐỎ'}</div>
            <div style="font-size: 1.75rem; font-weight: 900; color: #ef4444;">\${gameState.team1Score} đ</div>
            \${isTeam1 ? '<div style="font-size: 0.75rem; background: #ef4444; color: white; border-radius: 4px; padding: 2px 6px; margin-top: 4px;">Đang thi đấu</div>' : ''}
          </div>

          <div style="font-weight: 800; font-size: 1.5rem; color: #fbbf24;">VS</div>

          <div style="padding: 0.75rem 1.25rem; border-radius: 0.5rem; background: \${!isTeam1 ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}; border: 2px solid #3b82f6; text-align: center;">
            <div style="font-size: 0.85rem; color: #93c5fd;">\${SETTINGS.team2Name || '🔵 ĐỘI XANH'}</div>
            <div style="font-size: 1.75rem; font-weight: 900; color: #3b82f6;">\${gameState.team2Score} đ</div>
            \${!isTeam1 ? '<div style="font-size: 0.75rem; background: #3b82f6; color: white; border-radius: 4px; padding: 2px 6px; margin-top: 4px;">Đang thi đấu</div>' : ''}
          </div>
        </div>

        <div class="question-box">
          <div class="q-meta">
            <span class="badge badge-grade">Toán Lớp \${q.grade} - \${q.topicTitle}</span>
            <span style="font-weight: 700; color: \${isTeam1 ? '#ef4444' : '#3b82f6'};">Lượt của: \${isTeam1 ? (SETTINGS.team1Name || 'Đội Đỏ') : (SETTINGS.team2Name || 'Đội Xanh')}</span>
          </div>
          <div class="q-text">\${q.content}</div>

          <div class="options-grid">
            \${q.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return \`
                <button class="opt-btn" id="opt-\${idx}" onclick="selectAnswer(\${idx})">
                  <div class="opt-letter">\${letter}</div>
                  <div>\${opt}</div>
                </button>
              \`;
            }).join('')}
          </div>

          <div id="explanation-box" style="display: none; margin-top: 1.5rem; padding: 1rem; border-radius: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6;">
            <h4 style="color: #93c5fd; font-weight: 700; margin-bottom: 0.35rem;">Đáp án đúng & giải thích:</h4>
            <p style="color: #e5e7eb; font-size: 0.95rem;">\${q.explanation}</p>
          </div>
        </div>
        <div id="next-action" style="display: flex; justify-content: flex-end; margin-top: 1rem;"></div>
      \`;

      renderMath();
    }

    // --- GAME ACTIONS & LOGIC ---
    function startTimer() {
      if (gameState.timerId) clearInterval(gameState.timerId);
      gameState.timer = SETTINGS.timePerQuestion || 25;
      const bar = document.getElementById('timer-bar');
      const text = document.getElementById('timer-text');
      if (bar) bar.style.width = '100%';

      gameState.timerId = setInterval(() => {
        gameState.timer--;
        if (text) text.innerText = gameState.timer + 's';
        if (bar) bar.style.width = ((gameState.timer / (SETTINGS.timePerQuestion || 25)) * 100) + '%';
        if (gameState.timer <= 5 && gameState.timer > 0) sound.playTick();

        if (gameState.timer <= 0) {
          clearInterval(gameState.timerId);
          onTimeout();
        }
      }, 1000);
    }

    function onTimeout() {
      sound.playWrong();
      revealAnswer(-1);
    }

    function selectAnswer(chosenIdx) {
      if (gameState.timerId) clearInterval(gameState.timerId);
      const q = gameState.activeQuestions[gameState.qIndex];
      const isCorrect = chosenIdx === q.correctAnswer;

      if (isCorrect) {
        sound.playCorrect();
        gameState.score += 10;
        if (activeGame === 'team_battle') {
          if (gameState.currentTurn === 1) gameState.team1Score += 10;
          else gameState.team2Score += 10;
        }
      } else {
        sound.playWrong();
      }

      revealAnswer(chosenIdx);
    }

    function revealAnswer(chosenIdx) {
      const q = gameState.activeQuestions[gameState.qIndex];
      const btns = document.querySelectorAll('.opt-btn');
      btns.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correctAnswer) btn.classList.add('correct');
        else if (idx === chosenIdx) btn.classList.add('wrong');
      });

      const exp = document.getElementById('explanation-box');
      if (exp) exp.style.display = 'block';

      const nextAction = document.getElementById('next-action');
      if (nextAction) {
        const isLast = gameState.qIndex >= gameState.activeQuestions.length - 1;
        nextAction.innerHTML = \`
          <button class="btn btn-primary" onclick="\${isLast ? 'finishGame()' : 'nextQuestion()'}">
            \${isLast ? '🏆 Xem Kết Quả' : 'Câu kế tiếp ➔'}
          </button>
        \`;
      }
    }

    function nextQuestion() {
      gameState.qIndex++;
      gameState.hiddenOptions = [];
      if (activeGame === 'team_battle') {
        gameState.currentTurn = gameState.currentTurn === 1 ? 2 : 1;
      }
      renderCurrentGame();
    }

    function finishGame() {
      if (gameState.timerId) clearInterval(gameState.timerId);
      sound.playFanfare();
      triggerConfetti();

      const container = document.getElementById('app-container');
      let resultDetails = '';

      if (activeGame === 'team_battle') {
        const winTeam = gameState.team1Score > gameState.team2Score 
          ? (SETTINGS.team1Name || 'Đội Đỏ') 
          : (gameState.team2Score > gameState.team1Score ? (SETTINGS.team2Name || 'Đội Xanh') : 'Hòa nhau');
        resultDetails = \`
          <h2 style="font-size: 2rem; color: #fbbf24; margin-bottom: 0.5rem;">🎉 Chiến thắng thuộc về: \${winTeam}! 🎉</h2>
          <p style="font-size: 1.25rem; color: #9ca3af;">Đội Đỏ: \${gameState.team1Score} điểm | Đội Xanh: \${gameState.team2Score} điểm</p>
        \`;
      } else {
        resultDetails = \`
          <h2 style="font-size: 2rem; color: #fbbf24; margin-bottom: 0.5rem;">🎉 Chúc mừng bạn đã hoàn thành! 🎉</h2>
          <p style="font-size: 1.25rem; color: #34d399; font-weight: 700;">Tổng điểm đạt được: \${gameState.score} điểm</p>
        \`;
      }

      container.innerHTML = \`
        <div style="text-align: center; padding: 3rem 1.5rem; background: #111827; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.15); max-width: 600px; margin: 2rem auto;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
          \${resultDetails}
          <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="startGame('\${activeGame}')">🔄 Chơi lại</button>
            <button class="btn btn-accent" onclick="goHome()">🏠 Về Menu chính</button>
          </div>
        </div>
      \`;
    }

    // --- LIFELINES (50:50, Hint, Skip) ---
    function useFiftyFifty() {
      if (!gameState.lifelines.fiftyFifty) return;
      gameState.lifelines.fiftyFifty = false;
      const q = gameState.activeQuestions[gameState.qIndex];
      const wrongs = [0, 1, 2, 3].filter(i => i !== q.correctAnswer).sort(() => 0.5 - Math.random());
      gameState.hiddenOptions = [wrongs[0], wrongs[1]];
      renderCurrentGame();
    }

    function useHint() {
      if (!gameState.lifelines.hint) return;
      gameState.lifelines.hint = false;
      const q = gameState.activeQuestions[gameState.qIndex];
      alert('💡 GỢI Ý TOÁN HỌC:\\n\\n' + (q.hint || 'Hãy phân tích kỹ các giả thiết và công thức liên quan!'));
      renderCurrentGame();
    }

    function skipQuestion() {
      if (!gameState.lifelines.skip) return;
      gameState.lifelines.skip = false;
      nextQuestion();
    }

    // --- TEACHER MODAL ---
    function openTeacherEditor() {
      const modal = document.createElement('div');
      modal.id = 'editor-modal';
      modal.className = 'modal active';
      modal.innerHTML = \`
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #60a5fa;">📝 Ngân Hàng Đề & Cài Đặt Giáo Viên</h3>
            <button class="btn" onclick="closeEditorModal()">✕ Đóng</button>
          </div>
          <p style="font-size: 0.85rem; color: #9ca3af; margin-bottom: 1rem;">
            Giáo viên có thể xuất/nhập danh sách câu hỏi dạng JSON hoặc thêm mới câu hỏi có công thức LaTeX (kẹp giữa dấu $ hoặc $$).
          </p>
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem;">
            <button class="btn btn-accent" onclick="exportQuestionsJson()">💾 Sao chép JSON câu hỏi</button>
            <button class="btn" onclick="promptImportJson()">📥 Nhập JSON từ máy</button>
          </div>
          <div style="max-height: 300px; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem; padding: 0.5rem;">
            \${QUESTIONS.map((q, i) => \`
              <div style="padding: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.85rem;">
                <strong>#\${i+1} [Lớp \${q.grade}]</strong> \${q.content.substring(0, 80)}...
              </div>
            \`).join('')}
          </div>
        </div>
      \`;
      document.body.appendChild(modal);
    }

    function closeEditorModal() {
      const modal = document.getElementById('editor-modal');
      if (modal) modal.remove();
    }

    function exportQuestionsJson() {
      navigator.clipboard.writeText(JSON.stringify(QUESTIONS, null, 2)).then(() => {
        alert('Đã sao chép toàn bộ ' + QUESTIONS.length + ' câu hỏi dạng JSON vào bộ nhớ đệm!');
      });
    }

    function promptImportJson() {
      const data = prompt('Dán chuỗi JSON danh sách câu hỏi vào đây:');
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            QUESTIONS = parsed;
            alert('Đã nhập thành công ' + parsed.length + ' câu hỏi!');
            closeEditorModal();
            renderHub();
          }
        } catch (e) {
          alert('Dữ liệu JSON không hợp lệ! Vui lòng kiểm tra lại.');
        }
      }
    }

    // Initialize App
    window.addEventListener('DOMContentLoaded', () => {
      renderHub();
    });
  </script>
</body>
</html>`;
}
