
import { describe, expect, test } from "vitest";
import { borrowBook } from "./library";

describe("Library Integration Tests", () => {
  test("borrows Dune for member 7", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.title).toBe("dune");
    expect(loan.memberId).toBe(7);
  });

  test("returns a loan ID between 1000 and 9999", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.loanId).toBeGreaterThanOrEqual(1000);
    expect(loan.loanId).toBeLessThanOrEqual(9999);
  });

  test("rejects books with no copies available", () => {
    expect(() => borrowBook("foundation", 7)).toThrow(
      "No copies available"
    );
  });

  test("rejects a negative member ID", () => {
    expect(() => borrowBook("dune", -1)).toThrow();
  });
});
