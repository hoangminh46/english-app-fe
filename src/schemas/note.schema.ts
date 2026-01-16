import { z } from 'zod';

export const noteSchema = z.object({
  category: z.enum(['vocabulary', 'formula', 'other'], {
    message: 'Vui lòng chọn phân loại hợp lệ',
  }),
  title: z.string()
    .min(1, 'Tiêu đề không được để trống')
    .max(100, 'Tiêu đề không quá 100 ký tự'),
  content: z.string()
    .min(1, 'Nội dung không được để trống')
    .max(500, 'Nội dung không quá 500 ký tự'),
  example: z.string().max(200, 'Ví dụ không quá 200 ký tự').optional().or(z.literal('')),
  isLearned: z.boolean().optional(),
});

export type NoteSchemaType = z.infer<typeof noteSchema>;
