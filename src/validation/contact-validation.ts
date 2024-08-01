import { z, ZodType } from "zod";

export class ContactValidation {
  static readonly CREATE: ZodType = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1).max(20).optional(),
  });
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1).max(20).optional(),
  });
}
