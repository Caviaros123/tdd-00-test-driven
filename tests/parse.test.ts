import { describe, expect, it } from "vitest";
import { parsePoint, parseTrace } from "../src/parse.ts";

describe("décodage des tracés", () => {
  it("lit un point x,y", () => {
    expect(parsePoint("498,4")).toEqual({ x: 498, y: 4 });
  });

  it("lit une suite de points séparés par ' -> '", () => {
    expect(parseTrace("498,4 -> 498,6 -> 496,6")).toEqual([
      { x: 498, y: 4 },
      { x: 498, y: 6 },
      { x: 496, y: 6 },
    ]);
  });

  it("rejette un point mal formé", () => {
    expect(() => parsePoint("498")).toThrow(/Point invalide/);
  });
});
