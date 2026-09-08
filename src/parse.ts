export function parsePoint(raw: string) {
  const bits = raw.split(",");
  const x = Number(bits[0]);
  const y = Number(bits[1]);
  if (bits.length !== 2 || Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error(`Point invalide: "${raw}"`);
  }
  return { x, y };
}

export function parseTrace(line: string) {
  const points: { x: number; y: number }[] = [];
  const morceaux = line.split(" -> ");
  for (let i = 0; i < morceaux.length; i++) {
    points.push(parsePoint(morceaux[i].trim()));
  }
  return points;
}
