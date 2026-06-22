// width × depth × height in meters
export const FURNITURE_CATEGORIES = [
  {
    id: 'seating',
    name: 'Seating',
    items: [
      { id: 'sofa-2', name: '2-seat Sofa',  width: 1.60, depth: 0.90, height: 0.85, color: '#c4a87a' },
      { id: 'sofa-3', name: '3-seat Sofa',  width: 2.20, depth: 0.90, height: 0.85, color: '#c4a87a' },
      { id: 'armchair', name: 'Armchair',   width: 0.85, depth: 0.85, height: 0.85, color: '#b89060' },
      { id: 'ottoman', name: 'Ottoman',     width: 0.70, depth: 0.70, height: 0.45, color: '#a07850' },
    ],
  },
  {
    id: 'beds',
    name: 'Beds',
    items: [
      { id: 'bed-single', name: 'Single Bed', width: 0.90, depth: 2.00, height: 0.55, color: '#8aaccc' },
      { id: 'bed-double', name: 'Double Bed', width: 1.40, depth: 2.00, height: 0.55, color: '#8aaccc' },
      { id: 'bed-king',   name: 'King Bed',   width: 1.60, depth: 2.00, height: 0.55, color: '#8aaccc' },
    ],
  },
  {
    id: 'tables',
    name: 'Tables',
    items: [
      { id: 'coffee-table', name: 'Coffee Table',     width: 1.20, depth: 0.60, height: 0.45, color: '#c8a060' },
      { id: 'dining-4',     name: 'Dining Table (4)', width: 1.20, depth: 0.80, height: 0.75, color: '#c8a060' },
      { id: 'dining-6',     name: 'Dining Table (6)', width: 1.80, depth: 0.90, height: 0.75, color: '#c8a060' },
      { id: 'bedside',      name: 'Bedside Table',    width: 0.50, depth: 0.40, height: 0.60, color: '#c8a060' },
      { id: 'desk',         name: 'Desk',             width: 1.40, depth: 0.70, height: 0.75, color: '#b89050' },
      { id: 'side-table',   name: 'Side Table',       width: 0.50, depth: 0.50, height: 0.60, color: '#c8a060' },
    ],
  },
  {
    id: 'storage',
    name: 'Storage',
    items: [
      { id: 'wardrobe-2', name: 'Wardrobe (2-door)', width: 1.20, depth: 0.60, height: 2.00, color: '#a09080' },
      { id: 'wardrobe-3', name: 'Wardrobe (3-door)', width: 1.80, depth: 0.60, height: 2.00, color: '#a09080' },
      { id: 'bookshelf',  name: 'Bookshelf',         width: 0.80, depth: 0.30, height: 1.80, color: '#907060' },
      { id: 'chest',      name: 'Chest of Drawers',  width: 0.80, depth: 0.50, height: 1.00, color: '#a09080' },
      { id: 'tv-unit',    name: 'TV Unit',            width: 1.50, depth: 0.45, height: 0.50, color: '#606060' },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    items: [
      { id: 'fridge',          name: 'Fridge',          width: 0.60, depth: 0.70, height: 1.80, color: '#d0d0d0' },
      { id: 'kitchen-island',  name: 'Kitchen Island',  width: 1.20, depth: 0.90, height: 0.90, color: '#c8c8c8' },
      { id: 'kitchen-counter', name: 'Counter (long)',  width: 1.80, depth: 0.60, height: 0.90, color: '#c8c8c8' },
      { id: 'kitchen-counter-s', name: 'Counter (short)', width: 0.90, depth: 0.60, height: 0.90, color: '#c8c8c8' },
      { id: 'washing-machine', name: 'Washing Machine', width: 0.60, depth: 0.60, height: 0.85, color: '#e0e0e0' },
    ],
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    items: [
      { id: 'bathtub', name: 'Bathtub', width: 1.70, depth: 0.80, height: 0.60, color: '#a8d0e8' },
      { id: 'shower',  name: 'Shower',  width: 0.90, depth: 0.90, height: 2.20, color: '#c0e4f8' },
      { id: 'toilet',  name: 'Toilet',  width: 0.40, depth: 0.65, height: 0.75, color: '#e8e8e8' },
      { id: 'sink',    name: 'Sink',    width: 0.55, depth: 0.40, height: 0.85, color: '#e8e8e8' },
    ],
  },
  {
    id: 'decor',
    name: 'Decor',
    items: [
      { id: 'rug-large',   name: 'Rug (Large)',  width: 2.40, depth: 1.70, height: 0.02, color: '#c05030' },
      { id: 'rug-small',   name: 'Rug (Small)',  width: 1.50, depth: 1.00, height: 0.02, color: '#c05030' },
      { id: 'plant-large', name: 'Floor Plant',  width: 0.50, depth: 0.50, height: 1.40, color: '#3a8a3a' },
      { id: 'plant-small', name: 'Small Plant',  width: 0.30, depth: 0.30, height: 0.45, color: '#4a9a4a' },
      { id: 'floor-lamp',  name: 'Floor Lamp',   width: 0.30, depth: 0.30, height: 1.60, color: '#e8b830' },
      { id: 'tv',          name: 'TV',           width: 1.20, depth: 0.08, height: 0.70, color: '#181818' },
    ],
  },
];

export const ALL_FURNITURE = FURNITURE_CATEGORIES.flatMap(cat => cat.items);

export function getFurnitureDef(id) {
  return ALL_FURNITURE.find(f => f.id === id);
}
