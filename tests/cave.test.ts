import { describe, expect, it } from "vitest";
import { cellsOfTrace, key, parseRegister } from "../src/cave.ts";

describe("remplissage des segments", () => {
  it("occupe toutes les cases d’un segment vertical, extrémités comprises", () => {
    const cells = cellsOfTrace([
      { x: 498, y: 4 },
      { x: 498, y: 6 },
    ]);
    expect(cells).toEqual(new Set([key(498, 4), key(498, 5), key(498, 6)]));
  });

  it("occupe toutes les cases d’un segment horizontal, extrémités comprises", () => {
    const cells = cellsOfTrace([
      { x: 498, y: 6 },
      { x: 496, y: 6 },
    ]);
    expect(cells).toEqual(new Set([key(498, 6), key(497, 6), key(496, 6)]));
  });

  it("enchaîne plusieurs segments d’un même tracé", () => {
    const cells = cellsOfTrace([
      { x: 498, y: 4 },
      { x: 498, y: 6 },
      { x: 496, y: 6 },
    ]);
    expect(cells).toEqual(
      new Set([
        key(498, 4),
        key(498, 5),
        key(498, 6),
        key(497, 6),
        key(496, 6),
      ]),
    );
  });

  it("refuse un segment diagonal", () => {
    expect(() =>
      cellsOfTrace([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ]),
    ).toThrow(/diagonal/);
  });

  it("assemble plusieurs tracés du registre", () => {
    const cave = parseRegister(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`);
    expect(cave.rock.has(key(498, 4))).toBe(true);
    expect(cave.rock.has(key(497, 6))).toBe(true);
    expect(cave.rock.has(key(502, 4))).toBe(true);
    expect(cave.rock.has(key(494, 9))).toBe(true);
    expect(cave.maxRockY).toBe(9);
  });
});
