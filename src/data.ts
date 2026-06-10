/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, GalleryItem } from './types';
import chefPanFlames from './assets/images/chef_pan_flames_1781017372875.png';
import chocolateEclatDish from './assets/images/chocolate_eclat_dish_1781017351321.png';
import galleryBooth from './assets/images/gallery_booth_1781017463501.png';
import galleryCandlelit from './assets/images/gallery_candlelit_1781017393436.png';
import galleryHall from './assets/images/gallery_hall_1781017418869.png';
import galleryLamp from './assets/images/gallery_lamp_1781017440865.png';
import heritageDuckDish from './assets/images/heritage_duck_dish_1781017327228.png';
import oysterPearlDish from './assets/images/oyster_pearl_dish_1781017278785.png';
import philosophyPlating from './assets/images/philosophy_plating_1781017259647.png';
import steakPourHero from './assets/images/steak_pour_hero_1781017240523.png';
import wildForestDish from './assets/images/wild_forest_dish_1781017302473.png';

export const HERO_DATA = {
  title: "SAVOR THE EXTRAORDINARY",
  subTitle: "Where emotion finds its flavor and every moment becomes a lasting memory.",
  ctaText: "RESERVE YOUR EXPERIENCE",
  image: steakPourHero
};

export const PHILOSOPHY_DATA = {
  tag: "OUR PHILOSOPHY",
  title: "ARTISTRY. INTUITION. SOUL.",
  paragraphs: [
    "ÉLAN is more than a restaurant. It is a celebration of instinct, craftsmanship, and the beauty of fleeting moments.",
    "We honor the finest ingredients, the hands that prepare them, and the stories they tell on the plate."
  ],
  linkText: "OUR STORY",
  image: philosophyPlating
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "oyster-pearl",
    number: "01",
    name: "OYSTER & PEARL",
    description: "Sea / Clean / Bright",
    image: oysterPearlDish,
    tags: ["Caviar", "Oyster Slurps", "Uni Butter", "Yuzu Foam"],
    price: "€42",
    details: "Indulge in a fresh, hand-scalloped Kumamoto oyster nestled in a creamy, temperature-controlled emulsion of sea urchin butter, crowned with royal osetra caviar and micro-sorrel."
  },
  {
    id: "wild-forest",
    number: "02",
    name: "WILD FOREST",
    description: "Earth / Aroma / Depth",
    image: wildForestDish,
    tags: ["Morels", "Shaved Truffle", "Porcini soil", "Oak smoke"],
    price: "€38",
    details: "A sensory exploration of the forest floor: braised black morels, toasted chestnut purée, and a dramatic tableside oakwood smoking, complete with fresh matsutake curls."
  },
  {
    id: "heritage-duck",
    number: "03",
    name: "HERITAGE DUCK",
    description: "Rich / Warm / Elegant",
    image: heritageDuckDish,
    tags: ["Dry Aged", "Blood Orange", "Fennel Pollen"],
    price: "€58",
    details: "14-day dry-aged duck breast cooked to medium-rare over cherrywood ember, glazed with a dark orange reduction, and served with charred baby fennel."
  },
  {
    id: "chocolate-eclat",
    number: "04",
    name: "CHOCOLATE ÉCLAT",
    description: "Dark / Silky / Intense",
    image: chocolateEclatDish,
    tags: ["72% Araguani", "Gold Leaf", "Salted Sablé"],
    price: "€26",
    details: "An interactive, hyper-glossy dark chocolate sphere melted tableside with hot spiced cacao reduction, revealing a center of blood orange sorbet and a sea salt sablé crust."
  }
];

export const BEHIND_DATA = {
  tag: "BEHIND EVERY DISH",
  title: "PASSION. PRECISION. PRESENCE.",
  subtitle: "Watch the craft in motion.",
  image: chefPanFlames
};

export const AMBIENCE_GALLERY: GalleryItem[] = [
  {
    id: "candlelit",
    image: galleryCandlelit,
    title: "Table 14 - Intimate Hearth",
    category: "Intimate Dinner"
  },
  {
    id: "hall",
    image: galleryHall,
    title: "The Golden Arbor Grand Room",
    category: "Main Dining Hall"
  },
  {
    id: "lamp",
    image: galleryLamp,
    title: "Minimalist Lounge Accents",
    category: "Bar & Lounge"
  },
  {
    id: "booth",
    image: galleryBooth,
    title: "The Velvet Alcove Booths",
    category: "Private Booth"
  }
];
