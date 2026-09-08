import { parseTrace } from "./parse.ts";

export function key(x: number, y: number) {
  return x + "," + y;
}

export function cellsOfTrace(points: { x: number; y: number }[]) {
  const cases = new Set<string>();
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    if (from.x !== to.x && from.y !== to.y) {
      throw new Error(
        `Segment diagonal interdit: (${from.x},${from.y}) -> (${to.x},${to.y})`,
      );
    }
    const xmin = Math.min(from.x, to.x);
    const xmax = Math.max(from.x, to.x);
    const ymin = Math.min(from.y, to.y);
    const ymax = Math.max(from.y, to.y);
    for (let x = xmin; x <= xmax; x++) {
      for (let y = ymin; y <= ymax; y++) {
        cases.add(key(x, y));
      }
    }
  }
  return cases;
}

export function parseRegister(source: string) {
  const rock = new Set<string>();
  let maxRockY = 0;
  const lignes = source.split("\n");
  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i].trim();
    if (ligne === "") continue;
    const cellules = cellsOfTrace(parseTrace(ligne));
    for (const cellule of cellules) {
      rock.add(cellule);
      const y = Number(cellule.split(",")[1]);
      if (y > maxRockY) maxRockY = y;
    }
  }
  return { rock, maxRockY };
}
