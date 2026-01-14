import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다').max(50, '이름은 최대 50자까지 가능합니다').optional(),
  email: z.string().email('유효한 이메일 주소를 입력해주세요').max(255, '이메일은 최대 255자까지 가능합니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[a-zA-Z]/, '비밀번호에 영문자가 포함되어야 합니다')
    .regex(/[0-9]/, '비밀번호에 숫자가 포함되어야 합니다'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
})

export const signInSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type SignInInput = z.infer<typeof signInSchema>
