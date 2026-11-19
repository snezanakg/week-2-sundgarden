import { describe, test, expect } from "vitest";

import {
  createPizza,
  sendOrder,
  orderPizza,
  chargeCustomer,
} from "./pizzashop";

describe("Pizza Shop Unit Tests", () => {
  test("createPizza returns correct type and price", () => {
    const pizza = createPizza("margherita");

    expect(pizza).toEqual({ type: "margherita", price: 100 });
  });
test("orderPizza returns true for vegetarian pizza", () => {
    expect(orderPizza("vegetarian")).toBe(true);
  });

test("createPizza accepts vegetarian pizza for 110 SEK", () => {
  const pizza = createPizza("vegetarian");

  expect(pizza).toEqual({
    type: "vegetarian",
    price: 110,
  });
});


  test("createPizza throws for unknown type", () => {
    expect(() => createPizza("hawaii")).toThrow();
  });


  test("sendOrder returns a numeric order id", () => {
    const id = sendOrder({ type: "pepperoni", price: 120 });

    expect(typeof id).toBe("number");
    expect(Number.isInteger(id)).toBe(true);
    expect(id).toBeGreaterThanOrEqual(0);
    expect(id).toBeLessThan(1000);
  });

  test("orderPizza returns true for a valid pizza", () => {
    const result = orderPizza("pepperoni");

    expect(result).toBe(true);
  });

test("chargeCustomer returns true for a valid order", () => {
  expect(chargeCustomer(42, 100)).toBe(true);
});

test("chargeCustomer throws when order ID is undefined", () => {
  expect(() => chargeCustomer(undefined, 100)).toThrow(
    "Cannot charge the customer without a valid order ID!"
  );
});

test("chargeCustomer throws for a negative order ID", () => {
  expect(() => chargeCustomer(-1, 100)).toThrow();
});

test("chargeCustomer throws for a decimal order ID", () => {
  expect(() => chargeCustomer(12.5, 100)).toThrow();
});

test("chargeCustomer throws when amount is zero", () => {
  expect(() => chargeCustomer(42, 0)).toThrow();
});

});
