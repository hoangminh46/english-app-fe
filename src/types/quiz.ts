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
          { id: 'perfect-continuous', name: 'Thể hoàn thành tiếp diễn (Perfect Continuous)' },
          { id: 'sequence', name: 'Sự hòa hợp thì (Sequence of Tenses)' },
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
        { id: 'comparisons', name: 'So sánh (Comparisons)' },
        { id: 'reported', name: 'Câu tường thuật (Reported Speech)' },
        { id: 'inversion', name: 'Câu đảo ngữ (Inversion)' },
        { id: 'wishes', name: 'Câu điều ước (Wishes)' }
        ]
      },
      {
        id: 'parts-of-speech',
        name: 'Từ Loại',
        subtopics: [
          { id: 'nouns', name: 'Danh từ & Mạo từ (Nouns & Articles)' },
          { id: 'pronouns', name: 'Đại từ (Pronouns)' },
          { id: 'adjectives', name: 'Tính từ (Adjectives)' },
          { id: 'adverbs', name: 'Trạng từ (Adverbs)' },
          { id: 'prepositions', name: 'Giới từ (Prepositions)' },
          { id: 'conjunctions', name: 'Liên từ (Conjunctions)' },
          { id: 'modal', name: 'Động từ khuyết thiếu (Modal Verbs)' },
          { id: 'phrasal', name: 'Cụm động từ (Phrasal Verbs)' },
          { id: 'infinitives', name: 'Động từ nguyên mẫu & Danh động từ (Infinitives & Gerunds)' }
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
          { id: 'clothing', name: 'Quần áo & Thời trang' },
          { id: 'weather', name: 'Thời tiết & Mùa' },
          { id: 'hobbies', name: 'Sở thích & Giải trí' },
          { id: 'transportation', name: 'Phương tiện giao thông' },
          { id: 'appearance', name: 'Ngoại hình & Tính cách' },
          { id: 'shopping', name: 'Mua sắm & Tiền bạc' }
        ]
      },
      {
        id: 'social',
        name: 'Chủ Đề Xã Hội',
        subtopics: [
          { id: 'education', name: 'Giáo dục & Học tập' },
          { id: 'health', name: 'Sức khỏe & Y tế' },
          { id: 'environment', name: 'Môi trường & Thiên nhiên' },
          { id: 'technology', name: 'Công nghệ & Internet' },
          { id: 'culture', name: 'Văn hóa & Truyền thống' },
          { id: 'media', name: 'Truyền thông & Báo chí' },
          { id: 'politics', name: 'Chính trị & Pháp luật' },
          { id: 'emotions', name: 'Cảm xúc & Tâm lý' }
        ]
      },
      {
        id: 'work',
        name: 'Chủ Đề Công Việc',
        subtopics: [
          { id: 'office', name: 'Văn phòng & Công sở' },
          { id: 'business', name: 'Kinh doanh & Thương mại' },
          { id: 'marketing', name: 'Marketing & Quảng cáo' },
          { id: 'finance', name: 'Tài chính & Ngân hàng' },
          { id: 'interviews', name: 'Phỏng vấn & Tuyển dụng' },
          { id: 'startups', name: 'Khởi nghiệp & Đổi mới' },
          { id: 'management', name: 'Quản lý dự án' },
          { id: 'development', name: 'Phát triển nghề nghiệp' }
        ]
      },
      {
        id: 'academic',
        name: 'Từ Vựng Học Thuật',
        subtopics: [
          { id: 'general-academic', name: 'Từ vựng học thuật tổng hợp' },
          { id: 'essay-writing', name: 'Từ vựng viết luận' },
          { id: 'research', name: 'Từ vựng nghiên cứu' },
          { id: 'stem', name: 'Từ vựng Khoa học - Kỹ thuật' }
        ]
      },
    ]
  },
  {
    id: 'communication',
    name: 'Tiếng Anh Giao Tiếp (Communication)',
    topics: [
      {
        id: 'core-skills',
        name: 'Kỹ Năng Nền Tảng',
        subtopics: [
          { id: 'pronunciation', name: 'Phát âm & Ngữ điệu (Pronunciation)' },
          { id: 'listening', name: 'Kỹ năng Nghe hiểu (Active Listening)' },
          { id: 'body-language', name: 'Ngôn ngữ cơ thể (Body Language)' },
          { id: 'conversation-flow', name: 'Duy trì hội thoại (Conversation Flow)' }
        ]
      },
      {
        id: 'daily-life',
        name: 'Giao Tiếp Hằng Ngày',
        subtopics: [
          { id: 'greetings', name: 'Chào hỏi & Giới thiệu' },
          { id: 'small-talk', name: 'Trò chuyện xã giao (Small Talk)' },
          { id: 'directions', name: 'Hỏi đường & Chỉ dẫn' },
          { id: 'shopping', name: 'Mua sắm & Thanh toán' },
          { id: 'dining', name: 'Nhà hàng & Đặt món' },
          { id: 'transport', name: 'Phương tiện công cộng' },
          { id: 'travel', name: 'Đặt phòng & Du lịch' },
          { id: 'emergency', name: 'Tình huống khẩn cấp' }
        ]
      },
      {
        id: 'work-communication',
        name: 'Giao Tiếp Công Việc',
        subtopics: [
          { id: 'interview', name: 'Phỏng vấn & Xin việc' },
          { id: 'meetings', name: 'Cuộc họp (Meetings)' },
          { id: 'presentations', name: 'Thuyết trình (Presentations)' },
          { id: 'negotiation', name: 'Đàm phán & Thảo luận' },
          { id: 'email', name: 'Email & Thư tín' },
          { id: 'networking', name: 'Giao lưu nghề nghiệp (Networking)' },
          { id: 'conflict', name: 'Xử lý xung đột' }
        ]
      },
      {
        id: 'social',
        name: 'Tình Huống Xã Hội',
        subtopics: [
          { id: 'complaints', name: 'Khiếu nại & Phàn nàn' },
          { id: 'apologies', name: 'Xin lỗi & Từ chối' },
          { id: 'suggestions', name: 'Đề xuất & Gợi ý' },
          { id: 'feedback', name: 'Khen ngợi & Phê bình' },
          { id: 'social-events', name: 'Sự kiện xã hội (Parties/Events)' },
          { id: 'group-discussions', name: 'Thảo luận nhóm' }
        ]
      }
    ]
  }
]; 