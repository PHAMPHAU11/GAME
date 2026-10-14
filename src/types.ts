export type GradeLevel = 'all' | '10' | '11' | '12';

export type MathTopic = 
  | 'all'
  // Lớp 10
  | 'menh_de_tap_hop'
  | 'bat_phuong_trinh'
  | 'ham_so_bac_hai'
  | 'he_thuc_luong'
  | 'vecto'
  // Lớp 11
  | 'luong_giac'
  | 'cap_so'
  | 'gioi_han_lien_tuc'
  | 'dao_ham'
  | 'hinh_khong_gian'
  // Lớp 12
  | 'khao_sat_ham_so'
  | 'nguyen_ham_tich_phan'
  | 'hinh_hoc_oxyz'
  | 'xac_suat_thong_ke';

export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';

export interface MathQuestion {
  id: string;
  grade: '10' | '11' | '12';
  topic: MathTopic;
  topicTitle: string;
  difficulty: DifficultyLevel;
  content: string; // supports LaTeX enclosed in $...$
  options: [string, string, string, string]; // [A, B, C, D]
  correctAnswer: 0 | 1 | 2 | 3; // 0=A, 1=B, 2=C, 3=D
  explanation: string;
  hint?: string;
}

export type GameMode = 'hub' | 'golden_bell' | 'speed_racer' | 'mystery_puzzle' | 'team_battle';

export interface GameSettings {
  hasTimer: boolean;
  timePerQuestion: number; // in seconds, default 25
  soundEnabled: boolean;
  showExplanation: boolean;
  team1Name: string;
  team2Name: string;
}
