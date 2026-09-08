import { key } from "./cave.ts";

export function nextPosition(
  pos: { x: number; y: number },
  occupe: Set<string>,
) {
  const bas = { x: pos.x, y: pos.y + 1 };
  if (!occupe.has(key(bas.x, bas.y))) return bas;

  const basGauche = { x: pos.x - 1, y: pos.y + 1 };
  if (!occupe.has(key(basGauche.x, basGauche.y))) return basGauche;

  const basDroite = { x: pos.x + 1, y: pos.y + 1 };
  if (!occupe.has(key(basDroite.x, basDroite.y))) return basDroite;

  return null;
}

export function restDeposit(
  pos: { x: number; y: number },
  occupe: Set<string>,
) {
  occupe.add(key(pos.x, pos.y));
  return pos;
}
