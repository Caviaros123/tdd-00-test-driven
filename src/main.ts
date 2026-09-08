import { readFileSync } from "node:fs";
import { parseRegister } from "./cave.ts";
import { countSettledAbyss, countSettledFloor } from "./simulate.ts";

const fichier = process.argv[2] || "input.txt";
const texte = readFileSync(fichier, "utf8");
const cave = parseRegister(texte);

const lectureA = countSettledAbyss(cave);
const lectureB = countSettledFloor(cave);

console.log("Lecture A (limite ouverte) : " + lectureA);
console.log("Lecture B (sol supposé)    : " + lectureB);
