import { describe, expect, it } from "vitest";
import { key } from "../src/cave.ts";
import { nextPosition, restDeposit } from "../src/physics.ts";

describe("priorité des trois destinations", () => {
  it("prend d’abord (x, y+1) si la case est libre", () => {
    expect(nextPosition({ x: 500, y: 0 }, new Set())).toEqual({ x: 500, y: 1 });
  });

  it("prend ensuite (x-1, y+1) si le bas est occupé", () => {
    const occupe = new Set([key(500, 2)]);
    expect(nextPosition({ x: 500, y: 1 }, occupe)).toEqual({ x: 499, y: 2 });
  });

  it("prend enfin (x+1, y+1) si le bas et le bas-gauche sont occupés", () => {
    const occupe = new Set([key(500, 2), key(499, 2)]);
    expect(nextPosition({ x: 500, y: 1 }, occupe)).toEqual({ x: 501, y: 2 });
  });

  it("s’immobilise lorsque les trois cases sont indisponibles", () => {
    const occupe = new Set([key(500, 2), key(499, 2), key(501, 2)]);
    expect(nextPosition({ x: 500, y: 1 }, occupe)).toBeNull();
  });
});

describe("immobilisation et dépôt suivant", () => {
  it("occupe la position d’un dépôt immobilisé pour le suivant", () => {
    const occupe = new Set([key(500, 2), key(499, 2), key(501, 2)]);
    const settled = restDeposit({ x: 500, y: 1 }, occupe);
    expect(settled).toEqual({ x: 500, y: 1 });
    expect(occupe.has(key(500, 1))).toBe(true);
    expect(nextPosition({ x: 500, y: 0 }, occupe)).toEqual({ x: 499, y: 1 });
  });
});
