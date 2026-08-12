// Dimensions: width × depth × height in metres
// Items sourced from The Vale NW11 furniture inventory

export const FURNITURE_CATEGORIES = [
  {
    id: 'living',
    name: 'Living Room',
    items: [
      { id: 'sofa',        name: 'Sofa — Obriel Grande Chaise',  width: 2.49, depth: 1.62, height: 0.82, color: '#c7b299' },
      { id: 'rug',         name: 'Rug — Allen Home Octavia',      width: 2.44, depth: 3.05, height: 0.02, color: '#3f5c8a' },
      { id: 'tv-stand',    name: 'TV Stand — noo.ma MET',         width: 1.60, depth: 0.42, height: 0.60, color: '#2a2a2a' },
      { id: 'armchair',    name: 'Armchair — IKEA POÄNG',         width: 0.68, depth: 0.82, height: 1.00, color: '#8a6a4a' },
      { id: 'plant-stand', name: 'Plant Stand — SATSUMAS',        width: 0.84, depth: 0.28, height: 0.70, color: '#c9b48a' },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    items: [
      { id: 'king-bed', name: 'King Bed — Next Matson Ottoman', width: 1.61, depth: 2.14, height: 1.01, color: '#a9998a' },
      { id: 'mirror',   name: 'Standing Mirror — IKORNNES',    width: 0.52, depth: 0.52, height: 1.67, color: '#bfae91' },
    ],
  },
  {
    id: 'office',
    name: 'Office / Study',
    items: [
      { id: 'desk',          name: 'Desk — IKEA TROTTEN',           width: 1.60, depth: 0.80, height: 0.75, color: '#d8d8d8' },
      { id: 'standing-desk', name: 'Standing Desk — FLEXISPOT',     width: 1.00, depth: 0.60, height: 0.90, color: '#1c1c1c' },
      { id: 'office-chair',  name: 'Office Chair — Herman Miller',  width: 0.69, depth: 0.69, height: 1.00, color: '#444444' },
      { id: 'ekenabben',     name: 'Open Shelving — EKENABBEN',     width: 0.70, depth: 0.34, height: 1.54, color: '#dccdb0' },
      { id: 'vilto',         name: 'Shelving — VILTO (birch)',       width: 0.46, depth: 0.26, height: 1.50, color: '#c9a876' },
    ],
  },
  {
    id: 'nursery',
    name: 'Nursery / Kids',
    items: [
      { id: 'cot',         name: 'Cot — IKEA GULLIVER',          width: 0.66, depth: 1.24, height: 0.80, color: '#c8d8e8' },
      { id: 'floor-bed',   name: 'Floor Bed — Flair Play House',  width: 0.98, depth: 1.96, height: 1.43, color: '#d8c8e0' },
      { id: 'toy-storage', name: 'Toy Storage — TROFAST',         width: 0.99, depth: 0.44, height: 0.56, color: '#e8e0d0' },
      { id: 'toy-boxes',   name: 'Toy Boxes ×3 — SOCKERBIT',      width: 1.14, depth: 0.25, height: 0.15, color: '#e8a3c2' },
      { id: 'bookshelf-1', name: 'Bookshelf — IKEA FLISAT',       width: 0.49, depth: 0.28, height: 0.41, color: '#d9c9a3' },
      { id: 'bookshelf-2', name: 'Bookshelf — 3 Sprouts',         width: 0.62, depth: 0.25, height: 0.61, color: '#c9b890' },
      { id: 'playmat',     name: 'Play Mat — 6 tiles (2×3)',       width: 1.20, depth: 1.80, height: 0.02, color: '#7fb3a3' },
      { id: 'baby-chair',  name: 'Tripp Trapp Chair',              width: 0.46, depth: 0.49, height: 0.79, color: '#e3d3b8' },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    items: [
      { id: 'shoe-rack',  name: 'Shoe Rack — TJUSIG',    width: 0.79, depth: 0.32, height: 0.37, color: '#d8d8d8' },
      { id: 'muskan',     name: 'Shelving — MUSKAN',      width: 0.37, depth: 0.37, height: 1.40, color: '#e0e0e0' },
      { id: 'dog-house',  name: 'Dog House — SEMI RAY',   width: 0.60, depth: 0.57, height: 0.45, color: '#9a9a9a' },
    ],
  },
];

export const ALL_FURNITURE = FURNITURE_CATEGORIES.flatMap(cat => cat.items);

export function getFurnitureDef(id) {
  return ALL_FURNITURE.find(f => f.id === id);
}
