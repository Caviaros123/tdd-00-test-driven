import { key } from "./cave.ts";
import { restDeposit } from "./physics.ts";

const SOURCE_X = 500;
const SOURCE_Y = 0;

function estOccupe(
  occupe: Set<string>,
  x: number,
  y: number,
  maxRockY: number,
  avecSol: boolean,
) {
  if (avecSol && y >= maxRockY + 2) return true;
  return occupe.has(key(x, y));
}

function nextMove(
  pos: { x: number; y: number },
  occupe: Set<string>,
  maxRockY: number,
  avecSol: boolean,
) {
  // meme ordre que nextPosition: bas, bas-gauche, bas-droite
  if (!estOccupe(occupe, pos.x, pos.y + 1, maxRockY, avecSol)) {
    return { x: pos.x, y: pos.y + 1 };
  }
  if (!estOccupe(occupe, pos.x - 1, pos.y + 1, maxRockY, avecSol)) {
    return { x: pos.x - 1, y: pos.y + 1 };
  }
  if (!estOccupe(occupe, pos.x + 1, pos.y + 1, maxRockY, avecSol)) {
    return { x: pos.x + 1, y: pos.y + 1 };
  }
  return null;
}

export function dropOne(
  occupe: Set<string>,
  maxRockY: number,
  mode: string,
) {
  const avecSol = mode === "floor";
  let pos = { x: SOURCE_X, y: SOURCE_Y };
  if (estOccupe(occupe, pos.x, pos.y, maxRockY, avecSol)) {
    return pos;
  }
  while (true) {
    const next = nextMove(pos, occupe, maxRockY, avecSol);
    if (next === null) {
      restDeposit(pos, occupe);
      return pos;
    }
    if (mode === "abyss" && next.y > maxRockY) {
      return "void";
    }
    pos = next;
  }
}

export function dropMany(
  occupe: Set<string>,
  maxRockY: number,
  count: number,
  mode: string,
) {
  const settled: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const result = dropOne(occupe, maxRockY, mode);
    if (result === "void") break;
    settled.push(result);
  }
  return settled;
}

export function countSettledAbyss(cave: {
  rock: Set<string>;
  maxRockY: number;
}) {
  const occupe = new Set(cave.rock);
  let nb = 0;
  while (true) {
    const result = dropOne(occupe, cave.maxRockY, "abyss");
    if (result === "void") return nb;
    nb++;
  }
}

export function countSettledFloor(cave: {
  rock: Set<string>;
  maxRockY: number;
}) {
  const occupe = new Set(cave.rock);
  let nb = 0;
  while (true) {
    if (occupe.has(key(SOURCE_X, SOURCE_Y))) return nb;
    dropOne(occupe, cave.maxRockY, "floor");
    nb++;
  }
}
