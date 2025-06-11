export type Topic = {
  id: string;
  name: string;
  subtopics?: Topic[];
};

export type Category = {
  id: string;
  name: string;
  topics: Topic[];
};

export type FormData = {
  audience: string;
  language: string;
  subtopics: string[];
  difficulty: string;
  quantity: number;
  category: string;
  mainTopic: string;
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

export const audiences = ["Học sinh", "Sinh viên", "Người đi làm", "Người cao tuổi"];
export const languages = ["Tiếng Anh", "Tiếng Nhật", "Tiếng Trung"];
export const difficulties = [
  { value: "beginner", label: "Cơ bản" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Nâng cao" }
];
export const quantityOptions = [10, 15, 20, 25];

export const categories: Category[] = [
  {
    id: 'grammar',
    name: 'Ngữ Pháp (Grammar)',
    topics: [
      {
        id: 'tenses',
        name: 'Thì và Thể',
        subtopics: [
          { id: 'present', name: 'Các thì hiện tại (Present Tenses)' },
          { id: 'past', name: 'Các thì quá khứ (Past Tenses)' },
          { id: 'future', name: 'Các thì tương lai (Future Tenses)' },
          { id: 'all', name: 'Tổng hợp 12 thì cơ bản' }
        ]
      },
      {
        id: 'sentence-structures',
        name: 'Cấu Trúc Câu',
        subtopics: [
          { id: 'conditionals', name: 'Câu điều kiện (Conditionals)' },
          { id: 'passive', name: 'Câu bị động (Passive Voice)' },
          { id: 'relative', name: 'Mệnh đề quan hệ (Relative Clauses)' },
          { id: 'comparisons', name: 'So sánh (Comparisons)' }
        ]
      },
      {
        id: 'parts-of-speech',
        name: 'Từ Loại',
        subtopics: [
          { id: 'prepositions', name: 'Giới từ (Prepositions)' },
          { id: 'conjunctions', name: 'Liên từ (Conjunctions)' },
          { id: 'adverbs', name: 'Trạng từ (Adverbs)' },
          { id: 'adjectives', name: 'Tính từ (Adjectives)' }
        ]
      }
    ]
  },
  {
    id: 'vocabulary',
    name: 'Từ Vựng (Vocabulary)',
    topics: [
      {
        id: 'basic',
        name: 'Chủ Đề Cơ Bản',
        subtopics: [
          { id: 'family', name: 'Gia đình & Bạn bè' },
          { id: 'house', name: 'Nhà cửa & Đồ đạc' },
          { id: 'food', name: 'Thực phẩm & Đồ uống' },
          { id: 'clothing', name: 'Quần áo & Thời trang' }
        ]
      },
      {
        id: 'social',
        name: 'Chủ Đề Xã Hội',
        subtopics: [
          { id: 'education', name: 'Giáo dục & Học tập' },
          { id: 'health', name: 'Sức khỏe & Y tế' },
          { id: 'environment', name: 'Môi trường & Thiên nhiên' },
          { id: 'technology', name: 'Công nghệ & Internet' }
        ]
      },
      {
        id: 'work',
        name: 'Chủ Đề Công Việc',
        subtopics: [
          { id: 'office', name: 'Văn phòng & Công sở' },
          { id: 'business', name: 'Kinh doanh & Thương mại' },
          { id: 'marketing', name: 'Marketing & Quảng cáo' },
          { id: 'finance', name: 'Tài chính & Ngân hàng' }
        ]
      }
    ]
  },
  {
    id: 'communication',
    name: 'Tiếng Anh Giao Tiếp (Communication)',
    topics: [
      {
        id: 'basic-communication',
        name: 'Giao Tiếp Cơ Bản',
        subtopics: [
          { id: 'greetings', name: 'Chào hỏi & Giới thiệu' },
          { id: 'directions', name: 'Hỏi đường & Chỉ dẫn' },
          { id: 'shopping', name: 'Mua sắm & Thanh toán' },
          { id: 'travel', name: 'Đặt phòng & Du lịch' }
        ]
      },
      {
        id: 'work-communication',
        name: 'Giao Tiếp Công Việc',
        subtopics: [
          { id: 'interview', name: 'Phỏng vấn & Xin việc' },
          { id: 'meetings', name: 'Họp & Thuyết trình' },
          { id: 'email', name: 'Email & Thư tín' },
          { id: 'negotiation', name: 'Đàm phán & Thảo luận' }
        ]
      },
      {
        id: 'special-situations',
        name: 'Tình Huống Đặc Biệt',
        subtopics: [
          { id: 'complaints', name: 'Khiếu nại & Phàn nàn' },
          { id: 'apologies', name: 'Xin lỗi & Từ chối' },
          { id: 'suggestions', name: 'Đề xuất & Gợi ý' },
          { id: 'feedback', name: 'Khen ngợi & Phê bình' }
        ]
      }
    ]
  }
]; 