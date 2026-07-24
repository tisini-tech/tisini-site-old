import type { Participant } from "@/lib/types/voting";

import arnoldImg from "@/assets/voting/arnold.jpeg";
import derrickImg from "@/assets/voting/derrick.jpeg";
import janImg from "@/assets/voting/jan.jpeg";
import samuelImg from "@/assets/voting/samuel.jpeg";
import charlesImg from "@/assets/voting/charles.jpeg";
import arturoImg from "@/assets/voting/arturo.jpeg";
import khwesaImg from "@/assets/voting/khwesa.jpeg";
import mbilaImg from "@/assets/voting/mbila.jpeg";
import obatImg from "@/assets/voting/obat.jpeg";
import rogenaImg from "@/assets/voting/rogena.jpeg";
import ronnieImg from "@/assets/voting/ronnie.jpeg";
import shellaImg from "@/assets/voting/sf/sf-sheila-9.8.jpeg"
import bobImg from "@/assets/voting/sf/sf-bob-7.1.jpeg"
import daleonImg from "@/assets/voting/sf/sf-deleaon-9.3.jpeg"
import dianaImg from "@/assets/voting/sf/sf-diana-6.8.jpeg"
import eugeneImg from "@/assets/voting/sf/sf-eugene-7.8.jpeg"
import festusImg from "@/assets/voting/sf/sf-festus-6.9.jpeg"
import georgeImg from "@/assets/voting/sf/sf-george-6.7.jpeg"
import jeansonImg from "@/assets/voting/sf/sf-jeanson-8.3.jpeg"
import maureenImg from "@/assets/voting/sf/sf-maureen-8.1.jpeg"
import naomiImg from "@/assets/voting/sf/sf-naomi-8.5.jpeg"
import nickImg from "@/assets/voting/sf/sf-nick-7.1.jpeg"
import ooroImg from "@/assets/voting/sf/sf-ooro-7.4.jpeg"
import yvetteImg from "@/assets/voting/sf/sf-yvette-8.0.jpeg"

import impactImg from "@/assets/voting/Impact-potw.jpeg";
import sfMenImg from "@/assets/voting/sf/sf-men.jpeg"
import sfWomenImg from "@/assets/voting/sf/sf-women.jpeg"
import enterpise26 from "@/assets/voting/enterprise-cup/enterprise-cup.jpeg"
// fan base nominees
import kabrasFans from "@/assets/voting/nominees-2026/1.jpg";
import kcbFans from "@/assets/voting/nominees-2026/2.jpg";
import blakbladFans from "@/assets/voting/nominees-2026/3.jpg";
// player of the season nominees
import lumumbaPTS from "@/assets/voting/nominees-2026/4.jpg";
import obatPTS from "@/assets/voting/nominees-2026/5.jpg";
import andycolePTS from "@/assets/voting/nominees-2026/6.jpg";
import fidensPTS from "@/assets/voting/nominees-2026/7.jpg";

import obatFTS from "@/assets/voting/nominees-2026/8.jpg";
import lumunbaFTS from "@/assets/voting/nominees-2026/9.jpg";
import andycoleFTS from "@/assets/voting/nominees-2026/10.jpg";
import arturoFTS from "@/assets/voting/nominees-2026/11.jpg";
import sifunaFTS from "@/assets/voting/nominees-2026/12.jpg";
import sheldonFTS from "@/assets/voting/nominees-2026/13.jpg";
import clintonFTS from "@/assets/voting/nominees-2026/14.jpg";

import victorBTS from "@/assets/voting/nominees-2026/15.jpg";
import asatiBTS from "@/assets/voting/nominees-2026/16.jpg";
import fidensBTS from "@/assets/voting/nominees-2026/17.jpg";
import alvinBTS from "@/assets/voting/nominees-2026/18.jpg";
import wekesaBTS from "@/assets/voting/nominees-2026/19.jpg";
import cantonaBTS from "@/assets/voting/nominees-2026/20.jpg";
import elvisBTS from "@/assets/voting/nominees-2026/21.jpg";
import walterBTS from "@/assets/voting/nominees-2026/22.jpg";

import danielYPTS from "@/assets/voting/nominees-2026/23.jpg";
import brianYPTS from "@/assets/voting/nominees-2026/24.jpg";
import chrisYPTS from "@/assets/voting/nominees-2026/25.jpg";
import ezekielYPTS from "@/assets/voting/nominees-2026/26.jpg";
import thomasYPTS from "@/assets/voting/nominees-2026/27.jpg";
import royYPTS from "@/assets/voting/nominees-2026/28.jpg";

import playerTS from "@/assets/voting/nominees-2026/PTS.jpeg";
import youngPlayerTS from "@/assets/voting/nominees-2026/YPTS.jpeg";
import fanBaseTS from "@/assets/voting/nominees-2026/FBTS.jpeg";
import forwardTS from "@/assets/voting/nominees-2026/FTS.jpeg";
import backTS from "@/assets/voting/nominees-2026/BTS.jpeg";

import walterEC from "@/assets/voting/enterprise-cup/walter-e-cup.jpeg"
import alexEC from "@/assets/voting/enterprise-cup/alex-e-cup.jpeg"
import conradEC from "@/assets/voting/enterprise-cup/conrad-e-cup.jpeg"
import lumumbaEC from "@/assets/voting/enterprise-cup/lumumba-e-cup.jpeg"
import nyambuaEC from "@/assets/voting/enterprise-cup/nyambua-e-cup.jpeg"
import sifunaEC from "@/assets/voting/enterprise-cup/sifuna-e-cup.jpeg"
import sydneyEC from "@/assets/voting/enterprise-cup/sydney-e-cup.jpeg"
import isaacEC from "@/assets/voting/enterprise-cup/isaac-e-cup.jpeg"


export const causesImages: Record<number, string> = {
  13: enterpise26,
  12: fanBaseTS,
  11: youngPlayerTS,
  10: backTS,
  9: forwardTS,
  8: playerTS,
  5: impactImg,
  6: sfWomenImg,
  7: sfMenImg,
};

export const participantImages: Record<number, string> = {
  26: georgeImg,
  25: festusImg,
  24: nickImg,
  23: bobImg,
  22: ooroImg,
  21: eugeneImg,
  20: jeansonImg,
  19: dianaImg,
  18: yvetteImg,
  17: maureenImg,
  16: naomiImg,
  15: daleonImg,
  14: shellaImg,
  3: derrickImg,
  4: arnoldImg,
  5: janImg,
  6: samuelImg,
  7: charlesImg,
  8: obatImg,
  9: arturoImg,
  10: rogenaImg,
  11: mbilaImg,
  12: khwesaImg,
  13: ronnieImg,

  27: lumumbaPTS,
  28: obatPTS,
  29: andycolePTS,
  30: fidensPTS,
  31: obatFTS,
  32: lumunbaFTS,
  33: andycoleFTS,
  34: arturoFTS,
  35: sifunaFTS,
  36: sheldonFTS,
  37: clintonFTS,
  38: victorBTS,
  39: asatiBTS,
  40: fidensBTS,
  41: alvinBTS,
  42: wekesaBTS,
  43: cantonaBTS,
  44: elvisBTS,
  45: walterBTS,
  46: danielYPTS,
  47: brianYPTS,
  48: chrisYPTS,
  49: ezekielYPTS,
  50: thomasYPTS,
  51: royYPTS,
  52: kabrasFans,
  53: kcbFans,
  54: blakbladFans,

  55: walterEC,
  56: alexEC,
  57: nyambuaEC,
  58: conradEC,
  59: isaacEC,
  60: lumumbaEC,
  61: sydneyEC,
  62: sifunaEC,
};

/** API sometimes stores dev-only paths like `/src/assets/...` that 404 in the browser. */
function isBrokenDevImageUrl(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes("/src/") ||
    u.includes("src/assets") ||
    u.includes("/src/assets/")
  );
}

/**
 * Prefer a real remote URL; ignore broken `src/...` paths; fall back to bundled map by id.
 */
export function getParticipantImageSrc(
  participant: Participant,
): string | undefined {
  const raw = participant.image_url?.trim();
  const local = participantImages[participant.id];

  if (!raw) return local;
  if (isBrokenDevImageUrl(raw)) return local;

  return raw;
}
