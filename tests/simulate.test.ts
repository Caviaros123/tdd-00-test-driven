import { describe, expect, it } from "vitest";
import { key, parseRegister } from "../src/cave.ts";
import { dropMany, countSettledAbyss, countSettledFloor } from "../src/simulate.ts";

const SAMPLE = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe("chute d’un dépôt jusqu’à immobilisation ou sortie", () => {
  it("immobilise les cinq premiers dépôts aux positions de l’extrait", () => {
    const cave = parseRegister(SAMPLE);
    const occupe = new Set(cave.rock);
    const settled = dropMany(occupe, cave.maxRockY, 5, "abyss");
    expect(settled).toEqual([
      { x: 500, y: 8 },
      { x: 499, y: 8 },
      { x: 501, y: 8 },
      { x: 500, y: 7 },
      { x: 498, y: 8 },
    ]);
  });

  it("arrête le comptage dès qu’un dépôt quitte la zone connue par le bas", () => {
    const cave = parseRegister(SAMPLE);
    expect(countSettledAbyss(cave)).toBe(24);
  });

  it("ne compte aucun dépôt s’il tombe immédiatement dans l’abîme", () => {
    const cave = parseRegister("500,2 -> 500,2");
    expect(countSettledAbyss(cave)).toBe(0);
  });
});

describe("lecture B — sol supposé", () => {
  it("place le sol à maxY + 2", () => {
    const cave = parseRegister(SAMPLE);
    expect(cave.maxRockY + 2).toBe(11);
  });

  it("compte tous les dépôts jusqu’à obstruction de l’arrivée, y compris le dernier", () => {
    const cave = parseRegister(SAMPLE);
    expect(countSettledFloor(cave)).toBe(93);
    const occupe = new Set(cave.rock);
    dropMany(occupe, cave.maxRockY, 93, "floor");
    expect(occupe.has(key(500, 0))).toBe(true);
  });
});
