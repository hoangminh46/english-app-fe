export type Topic = {
  id: string;
  name: string;
  nameEn: string;
  subtopics?: Topic[];
};

export type Category = {
  id: string;
  name: string;
  nameEn: string;
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
  timer?: number;
};

export interface NewWord {
  word: string;
  pronunciation: string;
  meaning: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  new_words: NewWord[];
}

export interface QuizResponse {
  questions: Question[];
}

export interface ScrambleWordExplanation {
  meaning: string;
  pronunciation: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
}

export interface ScrambleWord {
  id: number;
  word: string;
  scrambled: string;
  hint: string;
  explanation: ScrambleWordExplanation;
}

export interface ScrambleResponse {
  words: ScrambleWord[];
}

export type ScrambleProgress = {
  currentWordIndex: number;
  score: number;
  selectedLetters: string[];
  availableLetters: string[];
  showHint: boolean;
  isCorrect: boolean;
  timeLeft: number;
  showAnswer: boolean;
  isGameComplete: boolean;
};

export const audiences = [
  { value: "student", label: "Học sinh", labelEn: "Student" },
  { value: "college", label: "Sinh viên", labelEn: "College Student" },
  { value: "worker", label: "Người đi làm", labelEn: "Working Professional" },
  { value: "senior", label: "Người cao tuổi", labelEn: "Senior" }
];

export const languages = [
  { value: "english", label: "Tiếng Anh", labelEn: "English" },
  { value: "japanese", label: "Tiếng Nhật", labelEn: "Japanese" },
  { value: "chinese", label: "Tiếng Trung", labelEn: "Chinese" }
];

export const difficulties = [
  { value: "beginner", label: "Cơ bản", labelEn: "Beginner" },
  { value: "intermediate", label: "Trung cấp", labelEn: "Intermediate" },
  { value: "advanced", label: "Nâng cao", labelEn: "Advanced" }
];

export const quantityOptions = [10, 15, 20, 25];

export const categories: Category[] = [
  {
    id: 'grammar',
    name: 'Ngữ Pháp',
    nameEn: 'Grammar',
    topics: [
      {
        id: 'tenses',
        name: 'Thì và Thể',
        nameEn: 'Tenses',
        subtopics: [
          { id: 'present', name: 'Các thì hiện tại', nameEn: 'Present Tenses' },
          { id: 'past', name: 'Các thì quá khứ', nameEn: 'Past Tenses' },
          { id: 'future', name: 'Các thì tương lai', nameEn: 'Future Tenses' },
          { id: 'perfect-continuous', name: 'Thể hoàn thành tiếp diễn', nameEn: 'Perfect Continuous' },
          { id: 'sequence', name: 'Sự hòa hợp thì', nameEn: 'Sequence of Tenses' },
          { id: 'all', name: 'Tổng hợp 12 thì cơ bản', nameEn: 'All 12 Basic Tenses' }
        ]
      },
      {
        id: 'sentence-structures',
        name: 'Cấu Trúc Câu',
        nameEn: 'Sentence Structures',
        subtopics: [
          { id: 'conditionals', name: 'Câu điều kiện', nameEn: 'Conditionals' },
          { id: 'passive', name: 'Câu bị động', nameEn: 'Passive Voice' },
          { id: 'relative', name: 'Mệnh đề quan hệ', nameEn: 'Relative Clauses' },
          { id: 'comparisons', name: 'So sánh', nameEn: 'Comparisons' },
          { id: 'reported', name: 'Câu tường thuật', nameEn: 'Reported Speech' },
          { id: 'inversion', name: 'Câu đảo ngữ', nameEn: 'Inversion' },
          { id: 'wishes', name: 'Câu điều ước', nameEn: 'Wishes' }
        ]
      },
      {
        id: 'parts-of-speech',
        name: 'Từ Loại',
        nameEn: 'Parts of Speech',
        subtopics: [
          { id: 'nouns', name: 'Danh từ & Mạo từ', nameEn: 'Nouns & Articles' },
          { id: 'pronouns', name: 'Đại từ', nameEn: 'Pronouns' },
          { id: 'adjectives', name: 'Tính từ', nameEn: 'Adjectives' },
          { id: 'adverbs', name: 'Trạng từ', nameEn: 'Adverbs' },
          { id: 'prepositions', name: 'Giới từ', nameEn: 'Prepositions' },
          { id: 'conjunctions', name: 'Liên từ', nameEn: 'Conjunctions' },
          { id: 'modal', name: 'Động từ khuyết thiếu', nameEn: 'Modal Verbs' },
          { id: 'phrasal', name: 'Cụm động từ', nameEn: 'Phrasal Verbs' },
          { id: 'infinitives', name: 'Động từ nguyên mẫu & Danh động từ', nameEn: 'Infinitives & Gerunds' }
        ]
      }
    ]
  },
  {
    id: 'vocabulary',
    name: 'Từ Vựng',
    nameEn: 'Vocabulary',
    topics: [
      {
        id: 'basic',
        name: 'Chủ Đề Cơ Bản',
        nameEn: 'Basic Topics',
        subtopics: [
          { id: 'family', name: 'Gia đình & Bạn bè', nameEn: 'Family & Friends' },
          { id: 'house', name: 'Nhà cửa & Đồ đạc', nameEn: 'House & Furniture' },
          { id: 'food', name: 'Thực phẩm & Đồ uống', nameEn: 'Food & Drinks' },
          { id: 'clothing', name: 'Quần áo & Thời trang', nameEn: 'Clothing & Fashion' },
          { id: 'weather', name: 'Thời tiết & Mùa', nameEn: 'Weather & Seasons' },
          { id: 'hobbies', name: 'Sở thích & Giải trí', nameEn: 'Hobbies & Entertainment' },
          { id: 'transportation', name: 'Phương tiện giao thông', nameEn: 'Transportation' },
          { id: 'appearance', name: 'Ngoại hình & Tính cách', nameEn: 'Appearance & Personality' },
          { id: 'shopping', name: 'Mua sắm & Tiền bạc', nameEn: 'Shopping & Money' }
        ]
      },
      {
        id: 'social',
        name: 'Chủ Đề Xã Hội',
        nameEn: 'Social Topics',
        subtopics: [
          { id: 'education', name: 'Giáo dục & Học tập', nameEn: 'Education & Learning' },
          { id: 'health', name: 'Sức khỏe & Y tế', nameEn: 'Health & Medicine' },
          { id: 'environment', name: 'Môi trường & Thiên nhiên', nameEn: 'Environment & Nature' },
          { id: 'technology', name: 'Công nghệ & Internet', nameEn: 'Technology & Internet' },
          { id: 'culture', name: 'Văn hóa & Truyền thống', nameEn: 'Culture & Tradition' },
          { id: 'media', name: 'Truyền thông & Báo chí', nameEn: 'Media & Press' },
          { id: 'politics', name: 'Chính trị & Pháp luật', nameEn: 'Politics & Law' },
          { id: 'emotions', name: 'Cảm xúc & Tâm lý', nameEn: 'Emotions & Psychology' }
        ]
      },
      {
        id: 'work',
        name: 'Chủ Đề Công Việc',
        nameEn: 'Work Topics',
        subtopics: [
          { id: 'office', name: 'Văn phòng & Công sở', nameEn: 'Office & Workplace' },
          { id: 'business', name: 'Kinh doanh & Thương mại', nameEn: 'Business & Commerce' },
          { id: 'marketing', name: 'Marketing & Quảng cáo', nameEn: 'Marketing & Advertising' },
          { id: 'finance', name: 'Tài chính & Ngân hàng', nameEn: 'Finance & Banking' },
          { id: 'interviews', name: 'Phỏng vấn & Tuyển dụng', nameEn: 'Interviews & Recruitment' },
          { id: 'startups', name: 'Khởi nghiệp & Đổi mới', nameEn: 'Startups & Innovation' },
          { id: 'management', name: 'Quản lý dự án', nameEn: 'Project Management' },
          { id: 'development', name: 'Phát triển nghề nghiệp', nameEn: 'Career Development' }
        ]
      },
      {
        id: 'academic',
        name: 'Từ Vựng Học Thuật',
        nameEn: 'Academic Vocabulary',
        subtopics: [
          { id: 'general-academic', name: 'Từ vựng học thuật tổng hợp', nameEn: 'General Academic Vocabulary' },
          { id: 'essay-writing', name: 'Từ vựng viết luận', nameEn: 'Essay Writing Vocabulary' },
          { id: 'research', name: 'Từ vựng nghiên cứu', nameEn: 'Research Vocabulary' },
          { id: 'stem', name: 'Từ vựng Khoa học - Kỹ thuật', nameEn: 'STEM Vocabulary' }
        ]
      },
    ]
  },
  {
    id: 'communication',
    name: 'Tiếng Anh Giao Tiếp',
    nameEn: 'Communication',
    topics: [
      {
        id: 'core-skills',
        name: 'Kỹ Năng Nền Tảng',
        nameEn: 'Core Skills',
        subtopics: [
          { id: 'pronunciation', name: 'Phát âm & Ngữ điệu', nameEn: 'Pronunciation & Intonation' },
          { id: 'listening', name: 'Kỹ năng Nghe hiểu', nameEn: 'Active Listening' },
          { id: 'body-language', name: 'Ngôn ngữ cơ thể', nameEn: 'Body Language' },
          { id: 'conversation-flow', name: 'Duy trì hội thoại', nameEn: 'Conversation Flow' }
        ]
      },
      {
        id: 'daily-life',
        name: 'Giao Tiếp Hằng Ngày',
        nameEn: 'Daily Communication',
        subtopics: [
          { id: 'greetings', name: 'Chào hỏi & Giới thiệu', nameEn: 'Greetings & Introductions' },
          { id: 'small-talk', name: 'Trò chuyện xã giao', nameEn: 'Small Talk' },
          { id: 'directions', name: 'Hỏi đường & Chỉ dẫn', nameEn: 'Asking for & Giving Directions' },
          { id: 'shopping', name: 'Mua sắm & Thanh toán', nameEn: 'Shopping & Payment' },
          { id: 'dining', name: 'Nhà hàng & Đặt món', nameEn: 'Dining & Ordering' },
          { id: 'transport', name: 'Phương tiện công cộng', nameEn: 'Public Transportation' },
          { id: 'travel', name: 'Đặt phòng & Du lịch', nameEn: 'Booking & Travel' },
          { id: 'emergency', name: 'Tình huống khẩn cấp', nameEn: 'Emergency Situations' }
        ]
      },
      {
        id: 'work-communication',
        name: 'Giao Tiếp Công Việc',
        nameEn: 'Work Communication',
        subtopics: [
          { id: 'interview', name: 'Phỏng vấn & Xin việc', nameEn: 'Job Interviews' },
          { id: 'meetings', name: 'Cuộc họp', nameEn: 'Meetings' },
          { id: 'presentations', name: 'Thuyết trình', nameEn: 'Presentations' },
          { id: 'negotiation', name: 'Đàm phán & Thảo luận', nameEn: 'Negotiation & Discussion' },
          { id: 'email', name: 'Email & Thư tín', nameEn: 'Email & Correspondence' },
          { id: 'networking', name: 'Giao lưu nghề nghiệp', nameEn: 'Professional Networking' },
          { id: 'conflict', name: 'Xử lý xung đột', nameEn: 'Conflict Resolution' }
        ]
      },
      {
        id: 'social',
        name: 'Tình Huống Xã Hội',
        nameEn: 'Social Situations',
        subtopics: [
          { id: 'complaints', name: 'Khiếu nại & Phàn nàn', nameEn: 'Complaints' },
          { id: 'apologies', name: 'Xin lỗi & Từ chối', nameEn: 'Apologies & Refusals' },
          { id: 'suggestions', name: 'Đề xuất & Gợi ý', nameEn: 'Suggestions & Recommendations' },
          { id: 'feedback', name: 'Khen ngợi & Phê bình', nameEn: 'Praise & Criticism' },
          { id: 'social-events', name: 'Sự kiện xã hội', nameEn: 'Social Events & Parties' },
          { id: 'group-discussions', name: 'Thảo luận nhóm', nameEn: 'Group Discussions' }
        ]
      }
    ]
  }
]; 