
import { describe, expect, test } from "vitest";
import {
  findBook,
  checkOutBook,
  registerLoan,
} from "./library";

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


describe("Library - checkOutBook", () => {
  test("returns a number", () => {
    expect(checkOutBook(findBook("dune"))).toBeTypeOf("number");
  });

  test("returns a whole number", () => {
    expect(Number.isInteger(checkOutBook(findBook("dune")))).toBe(true);
  });

  test("returns a loan ID between 1000 and 9999", () => {
    const loanId = checkOutBook(findBook("dune"));

    expect(loanId).toBeGreaterThanOrEqual(1000);
    expect(loanId).toBeLessThanOrEqual(9999);
  });

  test("throws when no copies are available", () => {
    expect(() => checkOutBook(findBook("foundation"))).toThrow(
      "No copies available"
    );
  });

  test("throws when copiesAvailable is missing", () => {
    expect(() => checkOutBook({ title: "dune" })).toThrow();
  });
});



describe("Library - registerLoan", () => {
  test("registers a valid loan", () => {
    expect(registerLoan(1234, "dune", 7)).toEqual({
      loanId: 1234,
      title: "dune",
      memberId: 7,
    });
  });

  test("rejects member ID zero", () => {
    expect(() => registerLoan(1234, "dune", 0)).toThrow();
  });

  test("rejects an unknown book title", () => {
    expect(() =>
      registerLoan(1234, "harry potter", 7)
    ).toThrow();
  });
});

