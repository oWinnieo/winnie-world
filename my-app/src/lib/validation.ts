import { z } from 'zod';

// 定义用户注册表单的验证模式
export const registerSchema = z.object({
    username: z.string().min(3, { message: '用户名至少需要 3 个字符' }),
    email: z.string().email({ message: '请输入有效的电子邮件地址' }),
    password: z.string().min(6, { message: '密码至少需要 6 个字符' })
});

// 从模式中提取类型
export type RegisterFormData = z.infer<typeof registerSchema>;