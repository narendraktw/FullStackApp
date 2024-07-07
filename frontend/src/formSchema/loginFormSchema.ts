// do the zod validation for login page
import * as z from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email('Please enter a valid email'),
	password: z.string().min(3, 'Password must be at least 6 characters'),
});

export type LoginForm = z.infer<typeof loginFormSchema>;