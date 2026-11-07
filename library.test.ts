
import { describe, expect, test } from "vitest";
import { findBook } from "./library";

describe("Library - findBook", () => {
  test("finds Dune with 3 available copies", () => {
    expect(findBook("dune")).toEqual({
      title: "dune",
      copiesAvailable: 3,
    });
  });

  test("finds Foundation even with 0 copies", () => {
    expect(findBook("foundation")).toEqual({
      title: "foundation",
      copiesAvailable: 0,
    });
  });

  test("throws for an unknown book", () => {
    expect(() => findBook("harry potter")).toThrow();
  });

  test("throws when title is a number", () => {
    expect(() => findBook(42)).toThrow();
  });
});
