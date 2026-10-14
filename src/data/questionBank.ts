import { MathQuestion } from '../types';

export const INITIAL_QUESTIONS: MathQuestion[] = [
  // ================= LỚP 12 =================
  {
    id: '12_ks_01',
    grade: '12',
    topic: 'khao_sat_ham_so',
    topicTitle: 'Hàm số & Khảo sát hàm số',
    difficulty: 'nhan_biet',
    content: 'Cho hàm số $y = f(x)$ có bảng xét dấu đạo hàm như sau: $f\'(x) > 0$ trên $(-\\infty; -1)$ và $(2; +\\infty)$, $f\'(x) < 0$ trên $(-1; 2)$. Hàm số đã cho đạt cực đại tại điểm nào?',
    options: [
      '$x = -1$',
      '$x = 2$',
      '$x = 0$',
      '$x = 1$'
    ],
    correctAnswer: 0,
    explanation: 'Đạo hàm $f\'(x)$ đổi dấu từ dương sang âm khi qua điểm $x = -1$, do đó hàm số đạt cực đại tại $x = -1$.',
    hint: 'Cực đại là điểm mà đạo hàm đổi dấu từ dương sang âm.'
  },
  {
    id: '12_ks_02',
    grade: '12',
    topic: 'khao_sat_ham_so',
    topicTitle: 'Hàm số & Khảo sát hàm số',
    difficulty: 'thong_hieu',
    content: 'Đồ thị hàm số $y = \\frac{2x - 1}{x + 1}$ có đường tiệm cận đứng và tiệm cận ngang lần lượt là:',
    options: [
      '$x = -1$ và $y = 2$',
      '$x = 1$ và $y = 2$',
      '$x = 2$ và $y = -1$',
      '$x = -1$ và $y = -1$'
    ],
    correctAnswer: 0,
    explanation: 'Tiệm cận đứng là nghiệm của mẫu số: $x + 1 = 0 \\Rightarrow x = -1$. Tiệm cận ngang: $\\lim_{x \\to \\pm\\infty} \\frac{2x-1}{x+1} = 2 \\Rightarrow y = 2$.',
    hint: 'Mẫu bằng 0 cho TC đứng, tỉ số hệ số bậc cao nhất cho TC ngang.'
  },
  {
    id: '12_ks_03',
    grade: '12',
    topic: 'khao_sat_ham_so',
    topicTitle: 'Hàm số & Khảo sát hàm số',
    difficulty: 'van_dung',
    content: 'Giá trị lớn nhất của hàm số $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ bằng bao nhiêu?',
    options: [
      '$11$',
      '$2$',
      '$3$',
      '$19$'
    ],
    correctAnswer: 0,
    explanation: '$f\'(x) = 4x^3 - 4x = 4x(x^2 - 1) = 0 \\Rightarrow x = 0; x = 1$ (thuộc $[0; 2]$). Ta có $f(0) = 3$, $f(1) = 2$, $f(2) = 2^4 - 2(2^2) + 3 = 11$. Vậy $\\max = 11$.',
    hint: 'Tính $f(0), f(1), f(2)$ rồi so sánh.'
  },
  {
    id: '12_tp_01',
    grade: '12',
    topic: 'nguyen_ham_tich_phan',
    topicTitle: 'Nguyên hàm & Tích phân',
    difficulty: 'nhan_biet',
    content: 'Họ tất cả các nguyên hàm của hàm số $f(x) = 3x^2 + e^x$ là:',
    options: [
      '$x^3 + e^x + C$',
      '$6x + e^x + C$',
      '$\\frac{x^3}{3} + e^x + C$',
      '$x^3 - e^x + C$'
    ],
    correctAnswer: 0,
    explanation: '$\\int (3x^2 + e^x)dx = 3\\cdot \\frac{x^3}{3} + e^x + C = x^3 + e^x + C$.',
    hint: 'Áp dụng công thức nguyên hàm cơ bản $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$.'
  },
  {
    id: '12_tp_02',
    grade: '12',
    topic: 'nguyen_ham_tich_phan',
    topicTitle: 'Nguyên hàm & Tích phân',
    difficulty: 'thong_hieu',
    content: 'Tích phân $I = \\int_0^1 (2x + 1)dx$ có giá trị bằng:',
    options: [
      '$2$',
      '$1$',
      '$3$',
      '$\\frac{3}{2}$'
    ],
    correctAnswer: 0,
    explanation: '$I = [x^2 + x]_0^1 = (1^2 + 1) - 0 = 2$.',
    hint: 'Tìm nguyên hàm rồi thay cận trên trừ cận dưới.'
  },
  {
    id: '12_tp_03',
    grade: '12',
    topic: 'nguyen_ham_tich_phan',
    topicTitle: 'Nguyên hàm & Tích phân',
    difficulty: 'van_dung',
    content: 'Diện tích hình phẳng giới hạn bởi đồ thị hàm số $y = x^2 - 4$ và trục hoành $y = 0$ bằng:',
    options: [
      '$\\frac{32}{3}$',
      '$\\frac{16}{3}$',
      '$\\frac{8}{3}$',
      '$32$'
    ],
    correctAnswer: 0,
    explanation: 'Hoành độ giao điểm: $x^2 - 4 = 0 \\Leftrightarrow x = \\pm 2$. Diện tích $S = \\int_{-2}^2 |x^2 - 4| dx = 2 \\int_0^2 (4 - x^2) dx = 2 [4x - \\frac{x^3}{3}]_0^2 = 2 (8 - \\frac{8}{3}) = \\frac{32}{3}$.',
    hint: 'Tìm giao điểm rồi tính tích phân trị tuyệt đối.'
  },
  {
    id: '12_oxyz_01',
    grade: '12',
    topic: 'hinh_hoc_oxyz',
    topicTitle: 'Hình học giải tích Oxyz',
    difficulty: 'nhan_biet',
    content: 'Trong không gian $Oxyz$, cho mặt cầu $(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$. Tọa độ tâm $I$ và bán kính $R$ của $(S)$ là:',
    options: [
      '$I(1; -2; 3)$ và $R = 4$',
      '$I(-1; 2; -3)$ và $R = 16$',
      '$I(1; -2; 3)$ và $R = 16$',
      '$I(-1; 2; -3)$ và $R = 4$'
    ],
    correctAnswer: 0,
    explanation: 'Phương trình $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ có tâm $I(a; b; c) = (1; -2; 3)$ và bán kính $R = \\sqrt{16} = 4$.',
    hint: 'Đổi dấu các số trong ngoặc để tìm tâm $I$, lấy căn bậc hai vế phải để tìm $R$.'
  },
  {
    id: '12_oxyz_02',
    grade: '12',
    topic: 'hinh_hoc_oxyz',
    topicTitle: 'Hình học giải tích Oxyz',
    difficulty: 'thong_hieu',
    content: 'Trong không gian $Oxyz$, mặt phẳng đi qua điểm $M(2; -1; 1)$ và có một vectơ pháp tuyến $\\vec{n} = (1; -2; 3)$ có phương trình là:',
    options: [
      '$x - 2y + 3z - 7 = 0$',
      '$x - 2y + 3z + 7 = 0$',
      '$2x - y + z - 7 = 0$',
      '$x - 2y + 3z - 1 = 0$'
    ],
    correctAnswer: 0,
    explanation: 'Phương trình mặt phẳng: $1(x - 2) - 2(y + 1) + 3(z - 1) = 0 \\Leftrightarrow x - 2 - 2y - 2 + 3z - 3 = 0 \\Leftrightarrow x - 2y + 3z - 7 = 0$.',
    hint: 'Sử dụng công thức: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.'
  },
  {
    id: '12_xs_01',
    grade: '12',
    topic: 'xac_suat_thong_ke',
    topicTitle: 'Xác suất & Thống kê THPT',
    difficulty: 'thong_hieu',
    content: 'Gieo một con xúc xắc cân đối và đồng chất 2 lần liên tiếp. Xác suất để tổng số chấm xuất hiện trong hai lần gieo bằng $7$ là:',
    options: [
      '$\\frac{1}{6}$',
      '$\\frac{1}{12}$',
      '$\\frac{7}{36}$',
      '$\\frac{5}{36}$'
    ],
    correctAnswer: 0,
    explanation: 'Số phần tử không gian mẫu $n(\\Omega) = 6 \\times 6 = 36$. Các cặp tổng bằng 7: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \\Rightarrow$ có 6 cặp. Xác suất $P = \\frac{6}{36} = \\frac{1}{6}$.',
    hint: 'Đếm số cặp $(a, b)$ sao cho $a + b = 7$.'
  },

  // ================= LỚP 11 =================
  {
    id: '11_lg_01',
    grade: '11',
    topic: 'luong_giac',
    topicTitle: 'Hàm số & Phương trình Lượng giác',
    difficulty: 'nhan_biet',
    content: 'Tập giá trị của hàm số lượng giác $y = 2\\cos x + 3$ là:',
    options: [
      '$[1; 5]$',
      '$[-1; 1]$',
      '$[-2; 2]$',
      '$[2; 5]$'
    ],
    correctAnswer: 0,
    explanation: 'Vì $-1 \\le \\cos x \\le 1 \\Rightarrow -2 \\le 2\\cos x \\le 2 \\Rightarrow 1 \\le 2\\cos x + 3 \\le 5$. Vậy tập giá trị là $[1; 5]$.',
    hint: 'Giá trị của $\\cos x$ luôn nằm trong đoạn $[-1; 1]$.'
  },
  {
    id: '11_lg_02',
    grade: '11',
    topic: 'luong_giac',
    topicTitle: 'Hàm số & Phương trình Lượng giác',
    difficulty: 'thong_hieu',
    content: 'Nghiệm của phương trình lượng giác $\\sin x = \\frac{1}{2}$ là:',
    options: [
      '$x = \\frac{\\pi}{6} + k2\\pi$ hoặc $x = \\frac{5\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)',
      '$x = \\frac{\\pi}{3} + k2\\pi$ hoặc $x = \\frac{2\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$)',
      '$x = \\pm \\frac{\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)',
      '$x = \\frac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)'
    ],
    correctAnswer: 0,
    explanation: '$\\sin x = \\sin(\\frac{\\pi}{6}) \\Leftrightarrow x = \\frac{\\pi}{6} + k2\\pi$ hoặc $x = \\pi - \\frac{\\pi}{6} + k2\\pi = \\frac{5\\pi}{6} + k2\\pi$.',
    hint: '$\\sin x = \\sin \\alpha \\Leftrightarrow x = \\alpha + k2\\pi$ hoặc $x = \\pi - \\alpha + k2\\pi$.'
  },
  {
    id: '11_cs_01',
    grade: '11',
    topic: 'cap_so',
    topicTitle: 'Dãy số, Cấp số cộng & Cấp số nhân',
    difficulty: 'nhan_biet',
    content: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = 3$ và công sai $d = 4$. Số hạng thứ 5 là:',
    options: [
      '$u_5 = 19$',
      '$u_5 = 23$',
      '$u_5 = 15$',
      '$u_5 = 20$'
    ],
    correctAnswer: 0,
    explanation: 'Công thức số hạng tổng quát của CSC: $u_n = u_1 + (n - 1)d$. Do đó $u_5 = 3 + (5 - 1) \\times 4 = 3 + 16 = 19$.',
    hint: '$u_5 = u_1 + 4d$.'
  },
  {
    id: '11_cs_02',
    grade: '11',
    topic: 'cap_so',
    topicTitle: 'Dãy số, Cấp số cộng & Cấp số nhân',
    difficulty: 'thong_hieu',
    content: 'Cho cấp số nhân $(u_n)$ có $u_1 = 2$ và công bội $q = 3$. Tổng của 4 số hạng đầu tiên $S_4$ bằng:',
    options: [
      '$80$',
      '$40$',
      '$54$',
      '$26$'
    ],
    correctAnswer: 0,
    explanation: '$S_4 = u_1 \\frac{1 - q^4}{1 - q} = 2 \\times \\frac{1 - 3^4}{1 - 3} = 2 \\times \\frac{1 - 81}{-2} = 80$.',
    hint: 'Công thức $S_n = u_1 \\frac{q^n - 1}{q - 1}$.'
  },
  {
    id: '11_gh_01',
    grade: '11',
    topic: 'gioi_han_lien_tuc',
    topicTitle: 'Giới hạn & Hàm số liên tục',
    difficulty: 'nhan_biet',
    content: 'Giới hạn $\\lim_{x \\to 2} (3x^2 - 4x + 1)$ bằng:',
    options: [
      '$5$',
      '$9$',
      '$1$',
      '$7$'
    ],
    correctAnswer: 0,
    explanation: 'Thay trực tiếp $x = 2$: $3(2^2) - 4(2) + 1 = 12 - 8 + 1 = 5$.',
    hint: 'Thay trực tiếp $x = 2$ vào biểu thức đa thức.'
  },
  {
    id: '11_gh_02',
    grade: '11',
    topic: 'gioi_han_lien_tuc',
    topicTitle: 'Giới hạn & Hàm số liên tục',
    difficulty: 'thong_hieu',
    content: 'Giới hạn $\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$ có kết quả là:',
    options: [
      '$2$',
      '$1$',
      '$0$',
      'Không tồn tại'
    ],
    correctAnswer: 0,
    explanation: 'Ta có $\\frac{x^2 - 1}{x - 1} = \\frac{(x - 1)(x + 1)}{x - 1} = x + 1$ (với $x \\ne 1$). Khi $x \\to 1$, giới hạn bằng $1 + 1 = 2$.',
    hint: 'Rút gọn hằng đẳng thức tử số.'
  },
  {
    id: '11_dh_01',
    grade: '11',
    topic: 'dao_ham',
    topicTitle: 'Đạo hàm & Ứng dụng',
    difficulty: 'nhan_biet',
    content: 'Đạo hàm của hàm số $y = \\sqrt{x}$ trên khoảng $(0; +\\infty)$ là:',
    options: [
      '$y\' = \\frac{1}{2\\sqrt{x}}$',
      '$y\' = \\frac{1}{\\sqrt{x}}$',
      '$y\' = 2\\sqrt{x}$',
      '$y\' = \\frac{-1}{2\\sqrt{x}}$'
    ],
    correctAnswer: 0,
    explanation: 'Theo bảng đạo hàm cơ bản, $(\\sqrt{x})\' = \\frac{1}{2\\sqrt{x}}$.',
    hint: 'Công thức đạo hàm căn bậc hai cơ bản.'
  },
  {
    id: '11_hkg_01',
    grade: '11',
    topic: 'hinh_khong_gian',
    topicTitle: 'Hình học không gian & Quan hệ vuông góc',
    difficulty: 'nhan_biet',
    content: 'Cho đường thẳng $d$ vuông góc với hai đường thẳng cắt nhau cùng nằm trong mặt phẳng $(P)$. Khẳng định nào sau đây là ĐÚNG?',
    options: [
      '$d \\perp (P)$',
      '$d \\parallel (P)$',
      '$d \\subset (P)$',
      '$d$ cắt $(P)$ nhưng không vuông góc'
    ],
    correctAnswer: 0,
    explanation: 'Định lý: Nếu một đường thẳng vuông góc với hai đường thẳng cắt nhau cùng thuộc một mặt phẳng thì nó vuông góc với mặt phẳng đó.',
    hint: 'Điều kiện cần và đủ để đường thẳng vuông góc với mặt phẳng.'
  },

  // ================= LỚP 10 =================
  {
    id: '10_md_01',
    grade: '10',
    topic: 'menh_de_tap_hop',
    topicTitle: 'Mệnh đề & Tập hợp',
    difficulty: 'nhan_biet',
    content: 'Cho hai tập hợp $A = [1; 4]$ và $B = (2; 6)$. Giao của hai tập hợp $A \\cap B$ là:',
    options: [
      '$(2; 4]$',
      '$[1; 6)$',
      '$[2; 4]$',
      '$(1; 6)$'
    ],
    correctAnswer: 0,
    explanation: 'Giao $A \\cap B$ là tập hợp gồm các phần tử vừa thuộc $A$ vừa thuộc $B$: $2 < x \\le 4$, tức là $(2; 4]$.',
    hint: 'Biểu diễn trên trục số và lấy phần chung.'
  },
  {
    id: '10_md_02',
    grade: '10',
    topic: 'menh_de_tap_hop',
    topicTitle: 'Mệnh đề & Tập hợp',
    difficulty: 'thong_hieu',
    content: 'Mệnh đề phủ định của mệnh đề: "$\\forall x \\in \\mathbb{R}, x^2 + 1 > 0$" là:',
    options: [
      '"$\\exists x \\in \\mathbb{R}, x^2 + 1 \\le 0$"',
      '"$\\exists x \\in \\mathbb{R}, x^2 + 1 < 0$"',
      '"$\\forall x \\in \\mathbb{R}, x^2 + 1 \\le 0$"',
      '"$\\forall x \\in \\mathbb{R}, x^2 + 1 < 0$"'
    ],
    correctAnswer: 0,
    explanation: 'Phủ định của "$\\forall$" là "$\\exists$", phủ định của "$>$" là "$\\le$".',
    hint: 'Phủ định $\\forall$ chuyển thành $\\exists$, dấu $>$ thành $\\le$.'
  },
  {
    id: '10_bpt_01',
    grade: '10',
    topic: 'bat_phuong_trinh',
    topicTitle: 'Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    difficulty: 'nhan_biet',
    content: 'Điểm nào sau đây thuộc miền nghiệm của bất phương trình $2x - y + 1 > 0$?',
    options: [
      '$M(1; 1)$',
      '$N(0; 2)$',
      '$P(-1; 0)$',
      '$Q(-2; -1)$'
    ],
    correctAnswer: 0,
    explanation: 'Thay tọa độ điểm $M(1; 1)$ vào vế trái: $2(1) - 1 + 1 = 2 > 0$ (thỏa mãn). Điểm $N(0;2) \\Rightarrow -1 > 0$ (sai).',
    hint: 'Thay lần lượt tọa độ từng điểm vào biểu thức.'
  },
  {
    id: '10_hs_01',
    grade: '10',
    topic: 'ham_so_bac_hai',
    topicTitle: 'Hàm số bậc hai & Đồ thị',
    difficulty: 'nhan_biet',
    content: 'Tọa độ đỉnh parabol $y = x^2 - 4x + 3$ là:',
    options: [
      '$I(2; -1)$',
      '$I(-2; 15)$',
      '$I(2; 1)$',
      '$I(-2; -1)$'
    ],
    correctAnswer: 0,
    explanation: 'Hoành độ đỉnh $x_I = -\\frac{b}{2a} = -\\frac{-4}{2(1)} = 2$. Tung độ $y_I = 2^2 - 4(2) + 3 = -1$. Vậy $I(2; -1)$.',
    hint: 'Đỉnh parabol có hoành độ $x = -\\frac{b}{2a}$.'
  },
  {
    id: '10_htl_01',
    grade: '10',
    topic: 'he_thuc_luong',
    topicTitle: 'Hệ thức lượng trong tam giác',
    difficulty: 'thong_hieu',
    content: 'Cho tam giác $ABC$ có cạnh $b = 6$, $c = 8$ và góc $A = 60^\\circ$. Độ dài cạnh $a$ bằng:',
    options: [
      '$2\\sqrt{13}$',
      '$2\\sqrt{37}$',
      '$\\sqrt{52}$',
      '$10$'
    ],
    correctAnswer: 0,
    explanation: 'Theo định lý côsin: $a^2 = b^2 + c^2 - 2bc\\cos A = 6^2 + 8^2 - 2(6)(8)\\cos 60^\\circ = 36 + 64 - 96(0.5) = 100 - 48 = 52 \\Rightarrow a = \\sqrt{52} = 2\\sqrt{13}$.',
    hint: 'Áp dụng định lý côsin: $a^2 = b^2 + c^2 - 2bc\\cos A$.'
  },
  {
    id: '10_vt_01',
    grade: '10',
    topic: 'vecto',
    topicTitle: 'Vectơ & Các phép toán',
    difficulty: 'nhan_biet',
    content: 'Trong mặt phẳng tọa độ $Oxy$, cho hai vectơ $\\vec{a} = (2; -3)$ và $\\vec{b} = (1; 4)$. Tọa độ của vectơ $\\vec{u} = \\vec{a} + \\vec{b}$ là:',
    options: [
      '$\\vec{u} = (3; 1)$',
      '$\\vec{u} = (1; -7)$',
      '$\\vec{u} = (3; -7)$',
      '$\\vec{u} = (-1; 7)$'
    ],
    correctAnswer: 0,
    explanation: '$\\vec{u} = (x_a + x_b; y_a + y_b) = (2 + 1; -3 + 4) = (3; 1)$.',
    hint: 'Cộng từng thành phần hoành độ với hoành độ, tung độ với tung độ.'
  },
  {
    id: '10_vt_02',
    grade: '10',
    topic: 'vecto',
    topicTitle: 'Vectơ & Các phép toán',
    difficulty: 'thong_hieu',
    content: 'Tích vô hướng của hai vectơ $\\vec{u} = (3; 2)$ và $\\vec{v} = (-2; 4)$ bằng:',
    options: [
      '$2$',
      '$-14$',
      '$14$',
      '$-2$'
    ],
    correctAnswer: 0,
    explanation: 'Tích vô hướng $\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2 = 3(-2) + 2(4) = -6 + 8 = 2$.',
    hint: '$\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2$.'
  }
];

export const GRADE_NAMES: Record<string, string> = {
  all: 'Tất cả các khối (10, 11, 12)',
  '10': 'Toán Lớp 10 (GDPT 2018)',
  '11': 'Toán Lớp 11 (GDPT 2018)',
  '12': 'Toán Lớp 12 (GDPT 2018)'
};

export const TOPIC_NAMES: Record<string, string> = {
  all: 'Tất cả các chủ đề',
  menh_de_tap_hop: 'Mệnh đề & Tập hợp (Lớp 10)',
  bat_phuong_trinh: 'Bất phương trình bậc nhất hai ẩn (Lớp 10)',
  ham_so_bac_hai: 'Hàm số bậc hai (Lớp 10)',
  he_thuc_luong: 'Hệ thức lượng tam giác (Lớp 10)',
  vecto: 'Vectơ & Phép toán (Lớp 10)',
  luong_giac: 'Lượng giác (Lớp 11)',
  cap_so: 'Cấp số cộng & Cấp số nhân (Lớp 11)',
  gioi_han_lien_tuc: 'Giới hạn & Liên tục (Lớp 11)',
  dao_ham: 'Đạo hàm & Tiếp tuyến (Lớp 11)',
  hinh_khong_gian: 'Hình không gian & Vuông góc (Lớp 11)',
  khao_sat_ham_so: 'Khảo sát hàm số & Ứng dụng (Lớp 12)',
  nguyen_ham_tich_phan: 'Nguyên hàm, Tích phân & Ứng dụng (Lớp 12)',
  hinh_hoc_oxyz: 'Hình học Oxyz (Lớp 12)',
  xac_suat_thong_ke: 'Xác suất & Thống kê (Lớp 10-12)'
};
