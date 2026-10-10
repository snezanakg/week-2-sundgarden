import { z } from "zod";

export const bookSchema = z.object({
  title: z
  .string({ error: "A book needs a title" })
  .min(1, "A book needs a title")
  .max(100),
  genre: z.string().max(50).optional(),
  published_year: z.number().int().min(1000).max(2100),
  author_id: z.number().int().positive().optional(),
});

export type Book = z.infer<typeof bookSchema> & {
  id: number;
};