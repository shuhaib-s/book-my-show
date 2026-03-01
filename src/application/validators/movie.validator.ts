// application/validators/auth.validator.ts
import { z } from "zod";

const movieSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  duration: z.number().min(1),
  language: z.string().min(2),
  releaseDate: z.date(),
});

export default movieSchema;