export type Topic = {
  id: string;
  name: string;
};

export type FormData = {
  audience: string;
  language: string;
  topic: string[];
  difficulty: string;
  quantity: number;
};

export type Question = {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
};

export type QuizResponse = {
  questions: Question[];
};

export const topicsByLanguage: Record<string, Topic[]> = {
  "Tiếng Anh": [
    { id: "business", name: "Kinh doanh" },
    { id: "travel", name: "Du lịch" },
    { id: "education", name: "Giáo dục" },
    { id: "health", name: "Sức khỏe" },
    { id: "technology", name: "Công nghệ" },
    { id: "daily", name: "Đời sống hàng ngày" },
  ],
  "Tiếng Nhật": [
    { id: "anime", name: "Anime & Manga" },
    { id: "culture", name: "Văn hóa Nhật Bản" },
    { id: "cuisine", name: "Ẩm thực Nhật" },
    { id: "travel_jp", name: "Du lịch Nhật Bản" },
    { id: "business_jp", name: "Kinh doanh với Nhật" },
  ],
  "Tiếng Trung": [
    { id: "culture_cn", name: "Văn hóa Trung Quốc" },
    { id: "business_cn", name: "Kinh doanh với Trung Quốc" },
    { id: "cuisine_cn", name: "Ẩm thực Trung Hoa" },
    { id: "travel_cn", name: "Du lịch Trung Quốc" },
    { id: "history_cn", name: "Lịch sử Trung Hoa" },
  ]
};

export const audiences = ["Học sinh", "Sinh viên", "Người đi làm", "Người cao tuổi"];
export const languages = ["Tiếng Anh", "Tiếng Nhật", "Tiếng Trung"];
export const difficulties = [
  { value: "beginner", label: "Cơ bản" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Nâng cao" }
];
export const quantityOptions = [10, 15, 20, 25]; 