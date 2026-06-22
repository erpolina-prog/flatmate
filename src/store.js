import { create } from 'zustand';

let _id = 100;
const uid = () => `f${_id++}`;

const SNAP = 0.05;
export const snap = (v) => Math.round(v / SNAP) * SNAP;

const seed = [
  // First floor — reception/kitchen
  { catalogId: 'sofa-3',       floor: 'first',  x: 0.5,  y: 0.8,  rotation: 0   },
  { catalogId: 'coffee-table', floor: 'first',  x: 1.2,  y: 2.0,  rotation: 0   },
  { catalogId: 'dining-6',     floor: 'first',  x: 3.8,  y: 1.0,  rotation: 0   },
  { catalogId: 'tv-unit',      floor: 'first',  x: 0.5,  y: 0.5,  rotation: 180 },
  { catalogId: 'plant-large',  floor: 'first',  x: 6.5,  y: 4.8,  rotation: 0   },
  // First floor — bedroom 1
  { catalogId: 'bed-double',   floor: 'first',  x: 0.3,  y: 7.4,  rotation: 0   },
  { catalogId: 'wardrobe-2',   floor: 'first',  x: 3.8,  y: 7.05, rotation: 0   },
  { catalogId: 'bedside',      floor: 'first',  x: 1.75, y: 7.4,  rotation: 0   },
  // Second floor — bedroom 2
  { catalogId: 'bed-double',   floor: 'second', x: 0.3,  y: 0.5,  rotation: 0   },
  { catalogId: 'wardrobe-2',   floor: 'second', x: 2.5,  y: 0.1,  rotation: 0   },
  { catalogId: 'bedside',      floor: 'second', x: 1.75, y: 0.5,  rotation: 0   },
  // Second floor — bedroom 3
  { catalogId: 'bed-single',   floor: 'second', x: 4.2,  y: 0.4,  rotation: 0   },
  { catalogId: 'desk',         floor: 'second', x: 6.0,  y: 2.3,  rotation: 90  },
];

const initialFurniture = seed.map(s => ({ id: uid(), ...s }));

export const useStore = create((set, get) => ({
  currentFloor: 'first',
  viewMode: '2d',
  selectedId: null,
  furniture: initialFurniture,

  setFloor:    (floor) => set({ currentFloor: floor, selectedId: null }),
  setViewMode: (mode)  => set({ viewMode: mode }),
  selectItem:  (id)    => set({ selectedId: id }),
  deselectItem: ()     => set({ selectedId: null }),

  addFurniture: (catalogId, floor, x, y) => {
    const item = { id: uid(), catalogId, floor, x, y, rotation: 0 };
    set(s => ({ furniture: [...s.furniture, item], selectedId: item.id }));
    return item.id;
  },

  moveFurniture: (id, x, y) =>
    set(s => ({
      furniture: s.furniture.map(f => f.id === id ? { ...f, x: snap(x), y: snap(y) } : f),
    })),

  rotateFurniture: (id) =>
    set(s => ({
      furniture: s.furniture.map(f =>
        f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f
      ),
    })),

  deleteFurniture: (id) =>
    set(s => ({
      furniture: s.furniture.filter(f => f.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    })),
}));
