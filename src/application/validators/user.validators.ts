// application/validators/auth.validator.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
    password: z.string().min(6).refine((password) => {
      return password.length >= 6;
    }, {
      message: "Password must be at least 6 characters long",
  }),
  phone: z.string().optional().refine((phone:string | undefined) => {
    return phone && phone.length >= 10 ? true : false;
    }, {
      message: "Phone number must be at least 10 characters long",
    }),
});

export const assignRoleSchema = z.object({
  id: z.string(),
  role: z.string(),
});