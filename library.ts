
import { z } from "zod";

// Library catalogue
const catalogue = {
  dune: { title: "dune", copiesAvailable: 3 },
  neuromancer: { title: "neuromancer", copiesAvailable: 1 },
  foundation: { title: "foundation", copiesAvailable: 0 },
};

// Zod schemas
export const BookTitleSchema = z.enum([
  "dune",
  "neuromancer",
  "foundation",
]);

export const BookSchema = z.object({
  title: BookTitleSchema,
  copiesAvailable: z.number().int().nonnegative(),
});

// TypeScript type from Zod
export type Book = z.infer<typeof BookSchema>;

// We will implement this after writing the tests
export const findBook = (_title: unknown): Book => {
  throw new Error("Not implemented yet");
};
