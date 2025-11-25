// Type definitions
export type GrammarTopic = {
  id: string;
  title: string;
  description: string;
};

export type GrammarSubcategory = {
  id: string;
  title: string;
  description: string;
  topics: GrammarTopic[];
};

export type GrammarCategory = {
  id: string;
  title: string;
  description: string;
  subcategories: GrammarSubcategory[];
};

// Data structure
export const grammarCategories: GrammarCategory[] = [
  // ========== 1. CÁC THÌ (TENSES) ==========
  {
    id: 'tenses',
    title: 'Các Thì',
    description: 'Tất cả các thì trong tiếng Anh',
    subcategories: [
      {
        id: 'present-tenses',
        title: 'Thì Hiện Tại',
        description: 'Các thì hiện tại trong tiếng Anh',
        topics: [
          {
            id: 'present-simple',
            title: 'Thì Hiện Tại Đơn',
            description: 'Diễn tả sự thật, thói quen, hành động lặp đi lặp lại'
          },
          {
            id: 'present-continuous',
            title: 'Thì Hiện Tại Tiếp Diễn',
            description: 'Diễn tả hành động đang xảy ra tại thời điểm nói'
          },
          {
            id: 'present-perfect',
            title: 'Thì Hiện Tại Hoàn Thành',
            description: 'Diễn tả hành động đã hoàn thành có liên quan đến hiện tại'
          },
          {
            id: 'present-perfect-continuous',
            title: 'Thì Hiện Tại Hoàn Thành Tiếp Diễn',
            description: 'Diễn tả hành động bắt đầu trong quá khứ, kéo dài đến hiện tại'
          }
        ]
      },
      {
        id: 'past-tenses',
        title: 'Thì Quá Khứ',
        description: 'Các thì quá khứ trong tiếng Anh',
        topics: [
          {
            id: 'past-simple',
            title: 'Thì Quá Khứ Đơn',
            description: 'Diễn tả hành động đã hoàn thành trong quá khứ'
          },
          {
            id: 'past-continuous',
            title: 'Thì Quá Khứ Tiếp Diễn',
            description: 'Diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ'
          },
          {
            id: 'past-perfect',
            title: 'Thì Quá Khứ Hoàn Thành',
            description: 'Diễn tả hành động xảy ra trước một hành động khác trong quá khứ'
          },
          {
            id: 'past-perfect-continuous',
            title: 'Thì Quá Khứ Hoàn Thành Tiếp Diễn',
            description: 'Diễn tả hành động kéo dài đến một thời điểm trong quá khứ'
          }
        ]
      },
      {
        id: 'future-tenses',
        title: 'Thì Tương Lai',
        description: 'Các thì tương lai trong tiếng Anh',
        topics: [
          {
            id: 'future-simple',
            title: 'Thì Tương Lai Đơn',
            description: 'Diễn tả quyết định tức thì, dự đoán tương lai'
          },
          {
            id: 'future-continuous',
            title: 'Thì Tương Lai Tiếp Diễn',
            description: 'Diễn tả hành động đang xảy ra tại một thời điểm trong tương lai'
          },
          {
            id: 'future-perfect',
            title: 'Thì Tương Lai Hoàn Thành',
            description: 'Diễn tả hành động hoàn thành trước một thời điểm trong tương lai'
          },
          {
            id: 'future-perfect-continuous',
            title: 'Thì Tương Lai Hoàn Thành Tiếp Diễn',
            description: 'Diễn tả hành động kéo dài đến một thời điểm trong tương lai'
          },
          {
            id: 'be-going-to',
            title: 'Be Going To',
            description: 'Diễn tả kế hoạch, dự định trong tương lai'
          }
        ]
      }
    ]
  },

  // ========== 2. TỪ LOẠI (PARTS OF SPEECH) ==========
  {
    id: 'parts-of-speech',
    title: 'Từ Loại',
    description: 'Các loại từ trong tiếng Anh',
    subcategories: [
      {
        id: 'nouns',
        title: 'Danh Từ',
        description: 'Từ chỉ người, vật, sự việc',
        topics: [
          {
            id: 'countable-nouns',
            title: 'Danh Từ Đếm Được',
            description: 'Danh từ có thể đếm được: book, apple, cat...'
          },
          {
            id: 'uncountable-nouns',
            title: 'Danh Từ Không Đếm Được',
            description: 'Danh từ không đếm được: water, rice, information...'
          },
          {
            id: 'proper-nouns',
            title: 'Danh Từ Riêng',
            description: 'Tên riêng của người, địa điểm: John, London...'
          },
          {
            id: 'collective-nouns',
            title: 'Danh Từ Tập Hợp',
            description: 'Danh từ chỉ nhóm: team, family, class...'
          },
          {
            id: 'compound-nouns',
            title: 'Danh Từ Ghép',
            description: 'Danh từ tạo từ nhiều từ: swimming pool, mother-in-law...'
          }
        ]
      },
      {
        id: 'verbs',
        title: 'Động Từ',
        description: 'Từ chỉ hành động, trạng thái',
        topics: [
          {
            id: 'action-verbs',
            title: 'Động Từ Hành Động',
            description: 'Động từ diễn tả hành động: run, eat, write...'
          },
          {
            id: 'linking-verbs',
            title: 'Động Từ Liên Kết',
            description: 'Động từ liên kết chủ ngữ và tính từ: be, seem, become...'
          },
          {
            id: 'helping-verbs',
            title: 'Động Từ Trợ Giúp',
            description: 'Động từ hỗ trợ động từ chính: have, do, be...'
          },
          {
            id: 'regular-verbs',
            title: 'Động Từ Có Quy Tắc',
            description: 'Động từ thêm -ed ở dạng quá khứ: play → played'
          },
          {
            id: 'irregular-verbs',
            title: 'Động Từ Bất Quy Tắc',
            description: 'Động từ có dạng quá khứ đặc biệt: go → went'
          },
          {
            id: 'phrasal-verbs',
            title: 'Cụm Động Từ',
            description: 'Động từ kết hợp với giới từ: turn on, give up...'
          }
        ]
      },
      {
        id: 'adjectives',
        title: 'Tính Từ',
        description: 'Từ mô tả danh từ',
        topics: [
          {
            id: 'descriptive-adjectives',
            title: 'Tính Từ Miêu Tả',
            description: 'Tính từ mô tả đặc điểm: beautiful, big, red...'
          },
          {
            id: 'quantitative-adjectives',
            title: 'Tính Từ Số Lượng',
            description: 'Tính từ chỉ số lượng: some, many, few...'
          },
          {
            id: 'demonstrative-adjectives',
            title: 'Tính Từ Chỉ Định',
            description: 'Tính từ chỉ định: this, that, these, those'
          },
          {
            id: 'possessive-adjectives',
            title: 'Tính Từ Sở Hữu',
            description: 'Tính từ chỉ sở hữu: my, your, his, her...'
          },
          {
            id: 'comparative-adjectives',
            title: 'Tính Từ So Sánh',
            description: 'So sánh hơn và nhất: bigger, biggest...'
          }
        ]
      },
      {
        id: 'adverbs',
        title: 'Trạng Từ',
        description: 'Từ bổ nghĩa cho động từ, tính từ',
        topics: [
          {
            id: 'manner-adverbs',
            title: 'Trạng Từ Cách Thức',
            description: 'Cách thức thực hiện: quickly, carefully...'
          },
          {
            id: 'time-adverbs',
            title: 'Trạng Từ Thời Gian',
            description: 'Thời gian xảy ra: now, yesterday, soon...'
          },
          {
            id: 'frequency-adverbs',
            title: 'Trạng Từ Tần Suất',
            description: 'Tần suất xảy ra: always, sometimes, never...'
          },
          {
            id: 'place-adverbs',
            title: 'Trạng Từ Nơi Chốn',
            description: 'Nơi xảy ra: here, there, everywhere...'
          },
          {
            id: 'degree-adverbs',
            title: 'Trạng Từ Mức Độ',
            description: 'Mức độ: very, quite, extremely...'
          }
        ]
      }
    ]
  },

  // ========== 3. CẤU TRÚC CÂU (SENTENCE STRUCTURE) ==========
  {
    id: 'sentence-structure',
    title: 'Cấu Trúc Câu',
    description: 'Cách tạo câu trong tiếng Anh',
    subcategories: [
      {
        id: 'sentence-types',
        title: 'Các Loại Câu',
        description: 'Câu khẳng định, phủ định, nghi vấn',
        topics: [
          {
            id: 'declarative-sentences',
            title: 'Câu Khẳng Định',
            description: 'Câu trần thuật một sự việc: I like apples.'
          },
          {
            id: 'negative-sentences',
            title: 'Câu Phủ Định',
            description: 'Câu phủ nhận: I don\'t like apples.'
          },
          {
            id: 'interrogative-sentences',
            title: 'Câu Nghi Vấn',
            description: 'Câu hỏi: Do you like apples?'
          },
          {
            id: 'imperative-sentences',
            title: 'Câu Mệnh Lệnh',
            description: 'Câu yêu cầu, ra lệnh: Close the door!'
          },
          {
            id: 'exclamatory-sentences',
            title: 'Câu Cảm Thán',
            description: 'Câu bày tỏ cảm xúc: What a beautiful day!'
          }
        ]
      },
      {
        id: 'sentence-patterns',
        title: 'Mẫu Câu',
        description: 'Các mẫu cấu trúc câu cơ bản',
        topics: [
          {
            id: 'svo-pattern',
            title: 'Mẫu S + V + O',
            description: 'Chủ ngữ + Động từ + Tân ngữ: I eat apples.'
          },
          {
            id: 'svc-pattern',
            title: 'Mẫu S + V + C',
            description: 'Chủ ngữ + Động từ + Bổ ngữ: She is happy.'
          },
          {
            id: 'svoo-pattern',
            title: 'Mẫu S + V + O + O',
            description: 'Chủ ngữ + Động từ + 2 tân ngữ: I gave him a book.'
          },
          {
            id: 'svoc-pattern',
            title: 'Mẫu S + V + O + C',
            description: 'Chủ ngữ + Động từ + Tân ngữ + Bổ ngữ: We call him John.'
          }
        ]
      },
      {
        id: 'clauses',
        title: 'Mệnh Đề',
        description: 'Mệnh đề chính và mệnh đề phụ',
        topics: [
          {
            id: 'independent-clauses',
            title: 'Mệnh Đề Độc Lập',
            description: 'Mệnh đề có thể đứng độc lập thành câu'
          },
          {
            id: 'dependent-clauses',
            title: 'Mệnh Đề Phụ Thuộc',
            description: 'Mệnh đề không thể đứng độc lập'
          },
          {
            id: 'noun-clauses',
            title: 'Mệnh Đề Danh Từ',
            description: 'Mệnh đề đóng vai trò như danh từ'
          },
          {
            id: 'adjective-clauses',
            title: 'Mệnh Đề Tính Từ',
            description: 'Mệnh đề bổ nghĩa cho danh từ'
          },
          {
            id: 'adverb-clauses',
            title: 'Mệnh Đề Trạng Từ',
            description: 'Mệnh đề bổ nghĩa cho động từ'
          }
        ]
      }
    ]
  },

  // ========== 4. MẠO TỪ (ARTICLES) ==========
  {
    id: 'articles',
    title: 'Mạo Từ',
    description: 'Cách sử dụng a, an, the',
    subcategories: [
      {
        id: 'indefinite-articles',
        title: 'Mạo Từ Không Xác Định',
        description: 'A và An',
        topics: [
          {
            id: 'article-a',
            title: 'Mạo Từ A',
            description: 'Sử dụng trước phụ âm: a book, a car'
          },
          {
            id: 'article-an',
            title: 'Mạo Từ An',
            description: 'Sử dụng trước nguyên âm: an apple, an hour'
          }
        ]
      },
      {
        id: 'definite-articles',
        title: 'Mạo Từ Xác Định',
        description: 'The',
        topics: [
          {
            id: 'article-the',
            title: 'Mạo Từ The',
            description: 'Sử dụng cho danh từ xác định: the book, the sun'
          },
          {
            id: 'no-article',
            title: 'Không Dùng Mạo Từ',
            description: 'Trường hợp không cần mạo từ'
          }
        ]
      }
    ]
  },

  // ========== 5. ĐẠI TỪ (PRONOUNS) ==========
  {
    id: 'pronouns',
    title: 'Đại Từ',
    description: 'Từ thay thế cho danh từ',
    subcategories: [
      {
        id: 'personal-pronouns',
        title: 'Đại Từ Nhân Xưng',
        description: 'I, you, he, she, it, we, they',
        topics: [
          {
            id: 'subject-pronouns',
            title: 'Đại Từ Chủ Ngữ',
            description: 'I, you, he, she, it, we, they'
          },
          {
            id: 'object-pronouns',
            title: 'Đại Từ Tân Ngữ',
            description: 'me, you, him, her, it, us, them'
          }
        ]
      },
      {
        id: 'possessive-pronouns',
        title: 'Đại Từ Sở Hữu',
        description: 'Chỉ quyền sở hữu',
        topics: [
          {
            id: 'possessive-adjectives-pro',
            title: 'Tính Từ Sở Hữu',
            description: 'my, your, his, her, its, our, their'
          },
          {
            id: 'possessive-pronouns-form',
            title: 'Đại Từ Sở Hữu',
            description: 'mine, yours, his, hers, its, ours, theirs'
          }
        ]
      },
      {
        id: 'other-pronouns',
        title: 'Các Đại Từ Khác',
        description: 'Đại từ phản thân, chỉ định...',
        topics: [
          {
            id: 'reflexive-pronouns',
            title: 'Đại Từ Phản Thân',
            description: 'myself, yourself, himself, herself...'
          },
          {
            id: 'demonstrative-pronouns',
            title: 'Đại Từ Chỉ Định',
            description: 'this, that, these, those'
          },
          {
            id: 'relative-pronouns',
            title: 'Đại Từ Quan Hệ',
            description: 'who, whom, whose, which, that'
          },
          {
            id: 'indefinite-pronouns',
            title: 'Đại Từ Bất Định',
            description: 'someone, anyone, everyone, nothing...'
          }
        ]
      }
    ]
  },

  // ========== 6. GIỚI TỪ (PREPOSITIONS) ==========
  {
    id: 'prepositions',
    title: 'Giới Từ',
    description: 'Từ chỉ vị trí, thời gian, hướng',
    subcategories: [
      {
        id: 'prepositions-of-time',
        title: 'Giới Từ Chỉ Thời Gian',
        description: 'in, on, at, during, for...',
        topics: [
          {
            id: 'prep-in-time',
            title: 'Giới Từ In (Thời gian)',
            description: 'in the morning, in 2024, in summer'
          },
          {
            id: 'prep-on-time',
            title: 'Giới Từ On (Thời gian)',
            description: 'on Monday, on December 25th'
          },
          {
            id: 'prep-at-time',
            title: 'Giới Từ At (Thời gian)',
            description: 'at 5 o\'clock, at noon, at night'
          },
          {
            id: 'other-time-preps',
            title: 'Giới Từ Thời Gian Khác',
            description: 'during, for, since, until, by...'
          }
        ]
      },
      {
        id: 'prepositions-of-place',
        title: 'Giới Từ Chỉ Nơi Chốn',
        description: 'in, on, at, under, behind...',
        topics: [
          {
            id: 'prep-in-place',
            title: 'Giới Từ In (Nơi chốn)',
            description: 'in the room, in Vietnam, in the box'
          },
          {
            id: 'prep-on-place',
            title: 'Giới Từ On (Nơi chốn)',
            description: 'on the table, on the wall, on the street'
          },
          {
            id: 'prep-at-place',
            title: 'Giới Từ At (Nơi chốn)',
            description: 'at home, at school, at the door'
          },
          {
            id: 'position-preps',
            title: 'Giới Từ Vị Trí',
            description: 'under, above, below, behind, in front of...'
          }
        ]
      },
      {
        id: 'prepositions-of-movement',
        title: 'Giới Từ Chỉ Hướng',
        description: 'to, from, into, out of...',
        topics: [
          {
            id: 'movement-preps',
            title: 'Giới Từ Di Chuyển',
            description: 'to, from, into, out of, through, across...'
          }
        ]
      },
      {
        id: 'other-prepositions',
        title: 'Giới Từ Khác',
        description: 'with, without, about, for...',
        topics: [
          {
            id: 'manner-preps',
            title: 'Giới Từ Cách Thức',
            description: 'with, without, by, like...'
          },
          {
            id: 'other-common-preps',
            title: 'Giới Từ Phổ Biến Khác',
            description: 'about, for, of, with, against...'
          }
        ]
      }
    ]
  },

  // ========== 7. ĐỘNG TỪ KHUYẾT THIẾU (MODAL VERBS) ==========
  {
    id: 'modal-verbs',
    title: 'Động Từ Khuyết Thiếu',
    description: 'Can, could, should, must...',
    subcategories: [
      {
        id: 'ability-permission',
        title: 'Khả Năng & Cho Phép',
        description: 'Can, could, be able to',
        topics: [
          {
            id: 'can-ability',
            title: 'Can - Khả Năng',
            description: 'Diễn tả khả năng: I can swim.'
          },
          {
            id: 'could-ability',
            title: 'Could - Khả Năng Quá Khứ',
            description: 'Khả năng trong quá khứ: I could swim when I was young.'
          },
          {
            id: 'be-able-to',
            title: 'Be Able To',
            description: 'Thay thế can ở một số thì: I will be able to...'
          }
        ]
      },
      {
        id: 'obligation-necessity',
        title: 'Bắt Buộc & Cần Thiết',
        description: 'Must, have to, should',
        topics: [
          {
            id: 'must',
            title: 'Must',
            description: 'Bắt buộc mạnh: You must study.'
          },
          {
            id: 'have-to',
            title: 'Have To',
            description: 'Bắt buộc do quy định: I have to go to work.'
          },
          {
            id: 'should',
            title: 'Should',
            description: 'Nên làm: You should study harder.'
          },
          {
            id: 'ought-to',
            title: 'Ought To',
            description: 'Nên làm (tương tự should): You ought to apologize.'
          }
        ]
      },
      {
        id: 'possibility-probability',
        title: 'Khả Năng & Suy Đoán',
        description: 'May, might, could',
        topics: [
          {
            id: 'may-might',
            title: 'May & Might',
            description: 'Có thể xảy ra: It may rain today.'
          },
          {
            id: 'could-possibility',
            title: 'Could - Khả Năng',
            description: 'Có thể: It could be true.'
          }
        ]
      },
      {
        id: 'other-modals',
        title: 'Động Từ Khuyết Thiếu Khác',
        description: 'Will, would, shall',
        topics: [
          {
            id: 'will-future',
            title: 'Will',
            description: 'Tương lai, dự đoán: I will help you.'
          },
          {
            id: 'would',
            title: 'Would',
            description: 'Quá khứ của will, lịch sự: Would you like...?'
          },
          {
            id: 'shall',
            title: 'Shall',
            description: 'Đề nghị, gợi ý: Shall we go?'
          }
        ]
      }
    ]
  },

  // ========== 8. LIÊN TỪ (CONJUNCTIONS) ==========
  {
    id: 'conjunctions',
    title: 'Liên Từ',
    description: 'Từ nối các từ, cụm từ, câu',
    subcategories: [
      {
        id: 'coordinating-conjunctions',
        title: 'Liên Từ Đẳng Lập',
        description: 'And, but, or, so...',
        topics: [
          {
            id: 'fanboys',
            title: 'FANBOYS',
            description: 'For, And, Nor, But, Or, Yet, So'
          }
        ]
      },
      {
        id: 'subordinating-conjunctions',
        title: 'Liên Từ Phụ Thuộc',
        description: 'Because, although, when, if...',
        topics: [
          {
            id: 'cause-effect',
            title: 'Nguyên Nhân - Kết Quả',
            description: 'because, since, as, so that...'
          },
          {
            id: 'contrast',
            title: 'Tương Phản',
            description: 'although, though, even though, while...'
          },
          {
            id: 'time-conjunctions',
            title: 'Thời Gian',
            description: 'when, while, before, after, until...'
          },
          {
            id: 'condition',
            title: 'Điều Kiện',
            description: 'if, unless, provided that...'
          }
        ]
      },
      {
        id: 'correlative-conjunctions',
        title: 'Liên Từ Tương Quan',
        description: 'Both...and, either...or...',
        topics: [
          {
            id: 'correlative-pairs',
            title: 'Cặp Liên Từ',
            description: 'both...and, either...or, neither...nor, not only...but also'
          }
        ]
      }
    ]
  },

  // ========== 9. TỪ ĐỂ HỎI (QUESTION WORDS) ==========
  {
    id: 'question-words',
    title: 'Từ Để Hỏi',
    description: 'What, when, where, who, why, how',
    subcategories: [
      {
        id: 'wh-questions',
        title: 'Câu Hỏi WH',
        description: 'Câu hỏi với từ để hỏi',
        topics: [
          {
            id: 'what-questions',
            title: 'What (Cái gì)',
            description: 'Hỏi về sự vật, sự việc: What is this?'
          },
          {
            id: 'when-questions',
            title: 'When (Khi nào)',
            description: 'Hỏi về thời gian: When did you arrive?'
          },
          {
            id: 'where-questions',
            title: 'Where (Ở đâu)',
            description: 'Hỏi về nơi chốn: Where do you live?'
          },
          {
            id: 'who-questions',
            title: 'Who (Ai)',
            description: 'Hỏi về người: Who is he?'
          },
          {
            id: 'why-questions',
            title: 'Why (Tại sao)',
            description: 'Hỏi về lý do: Why are you late?'
          },
          {
            id: 'how-questions',
            title: 'How (Như thế nào)',
            description: 'Hỏi về cách thức: How do you do it?'
          }
        ]
      },
      {
        id: 'yes-no-questions',
        title: 'Câu Hỏi Yes/No',
        description: 'Câu hỏi trả lời có/không',
        topics: [
          {
            id: 'be-questions',
            title: 'Câu Hỏi Với Be',
            description: 'Are you...? Is he...? Was it...?'
          },
          {
            id: 'do-does-did-questions',
            title: 'Câu Hỏi Với Do/Does/Did',
            description: 'Do you...? Does she...? Did they...?'
          },
          {
            id: 'modal-questions',
            title: 'Câu Hỏi Với Modal Verbs',
            description: 'Can you...? Will he...? Should I...?'
          }
        ]
      }
    ]
  },

  // ========== 10. CẤU TRÚC ĐẶC BIỆT (SPECIAL STRUCTURES) ==========
  {
    id: 'special-structures',
    title: 'Cấu Trúc Đặc Biệt',
    description: 'Câu điều kiện, câu bị động...',
    subcategories: [
      {
        id: 'conditional-sentences',
        title: 'Câu Điều Kiện',
        description: 'If clauses - Type 0, 1, 2, 3',
        topics: [
          {
            id: 'zero-conditional',
            title: 'Câu Điều Kiện Loại 0',
            description: 'Sự thật hiển nhiên: If you heat water, it boils.'
          },
          {
            id: 'first-conditional',
            title: 'Câu Điều Kiện Loại 1',
            description: 'Có thể xảy ra: If it rains, I will stay home.'
          },
          {
            id: 'second-conditional',
            title: 'Câu Điều Kiện Loại 2',
            description: 'Không có thật ở hiện tại: If I were rich, I would...'
          },
          {
            id: 'third-conditional',
            title: 'Câu Điều Kiện Loại 3',
            description: 'Không có thật trong quá khứ: If I had known...'
          },
          {
            id: 'mixed-conditional',
            title: 'Câu Điều Kiện Hỗn Hợp',
            description: 'Kết hợp các loại: If I had studied, I would be...'
          }
        ]
      },
      {
        id: 'passive-voice',
        title: 'Câu Bị Động',
        description: 'Passive voice',
        topics: [
          {
            id: 'passive-simple',
            title: 'Bị Động Thì Đơn',
            description: 'Present/Past/Future Simple Passive'
          },
          {
            id: 'passive-continuous',
            title: 'Bị Động Thì Tiếp Diễn',
            description: 'Present/Past Continuous Passive'
          },
          {
            id: 'passive-perfect',
            title: 'Bị Động Thì Hoàn Thành',
            description: 'Present/Past Perfect Passive'
          },
          {
            id: 'passive-modals',
            title: 'Bị Động Với Modal Verbs',
            description: 'Can be done, must be finished...'
          }
        ]
      },
      {
        id: 'reported-speech',
        title: 'Câu Tường Thuật',
        description: 'Reported/Indirect speech',
        topics: [
          {
            id: 'reported-statements',
            title: 'Tường Thuật Câu Khẳng Định',
            description: 'He said (that)...'
          },
          {
            id: 'reported-questions',
            title: 'Tường Thuật Câu Hỏi',
            description: 'He asked if/whether..., He asked what...'
          },
          {
            id: 'reported-commands',
            title: 'Tường Thuật Câu Mệnh Lệnh',
            description: 'He told me to...'
          }
        ]
      },
      {
        id: 'wish-sentences',
        title: 'Câu Ước',
        description: 'I wish, If only',
        topics: [
          {
            id: 'wish-present',
            title: 'Ước Trái Hiện Tại',
            description: 'I wish I had..., I wish I were...'
          },
          {
            id: 'wish-past',
            title: 'Ước Trái Quá Khứ',
            description: 'I wish I had done...'
          },
          {
            id: 'wish-future',
            title: 'Ước Tương Lai',
            description: 'I wish...would...'
          }
        ]
      }
    ]
  }
];

