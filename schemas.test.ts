
import { describe, expect, test } from "vitest";
import {
  PizzaTypeSchema,
  PizzaSchema,
  AmountSchema,
  OrderIdSchema,
} from "./pizzashop";

describe("Zod Schema Tests", () => {
  test("accepts a valid pizza type", () => {
    expect(PizzaTypeSchema.parse("margherita")).toBe("margherita");
  });

  test("rejects a pizza type with a capital letter", () => {
    expect(() => PizzaTypeSchema.parse("Margherita")).toThrow();
  });

  test("accepts a valid pizza object", () => {
    const pizza = {
      type: "pepperoni",
      price: 120,
    };

    expect(PizzaSchema.parse(pizza)).toEqual(pizza);
  });

  test("rejects a pizza without a price", () => {
    expect(() =>
      PizzaSchema.parse({ type: "pepperoni" })
    ).toThrow();
  });

  test("rejects an amount that is a string", () => {
    expect(() => AmountSchema.parse("100")).toThrow();
  });

  test("accepts order ID zero", () => {
    expect(OrderIdSchema.parse(0)).toBe(0);
  });
});
