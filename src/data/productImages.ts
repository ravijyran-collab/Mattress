/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Direct ES module imports ensure Vite bundles these assets into /assets/ with hashes
// This guarantees they are deployed, served with correct MIME types, and cached across Cloud Run / AI Studio CDN
import heroLuxuryImg from '../assets/images/hero_luxury_mattress_1793516647568.jpg';
import orthoSpinealignImg from '../assets/images/product_ortho_spinealign_1793516647215.jpg';
import naturalLatexImg from '../assets/images/product_natural_latex_1793516647557.jpg';
import cervicalPillowImg from '../assets/images/product_cervical_pillow_1793516647630.jpg';
import pocketSpringImg from '../assets/images/product_pocket_spring_1793518688522.jpg';
import memoryCoolingImg from '../assets/images/product_memory_cooling_1793518701368.jpg';
import sofaBedImg from '../assets/images/product_sofa_bed_1793518713561.jpg';
import mattressTopperImg from '../assets/images/product_mattress_topper_1793518726099.jpg';

export const PRODUCT_IMAGES = {
  hero: heroLuxuryImg,
  orthoSpinealign: orthoSpinealignImg,
  naturalLatex: naturalLatexImg,
  cervicalPillow: cervicalPillowImg,
  pocketSpring: pocketSpringImg,
  memoryCooling: memoryCoolingImg,
  sofaBed: sofaBedImg,
  mattressTopper: mattressTopperImg,
};

// Fallback image (always guaranteed to be in /assets/ bundle)
export const FALLBACK_IMAGE = heroLuxuryImg;
