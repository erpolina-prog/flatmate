import { create } from 'zustand';

let _id = 100;
const uid = () => `f${_id++}`;

const SNAP = 0.05;
export const snap = (v) => Math.round(v / SNAP) * SNAP;

const seed = [
  // Ground floor — entrance hall
  { catalogId: 'shoe-rack',    floor: 'ground', x: 0.05, y: 3.90, rotation: 0 },

  // First floor — Reception Room (x:0–3.64, y:6.32–11.03)
  { catalogId: 'tv-stand',    floor: 'first',  x: 0.10, y: 6.40,  rotation: 0   },
  { catalogId: 'rug',         floor: 'first',  x: 0.10, y: 7.00,  rotation: 0   },
  { catalogId: 'sofa',        floor: 'first',  x: 0.10, y: 8.90,  rotation: 0   },
  { catalogId: 'armchair',    floor: 'first',  x: 2.80, y: 7.80,  rotation: 90  },
  { catalogId: 'plant-stand', floor: 'first',  x: 2.70, y: 6.50,  rotation: 0   },

  // First floor — Bedroom 3 / Nursery (x:0–3.64, y:3.07–6.32)
  { catalogId: 'cot',         floor: 'first',  x: 0.10, y: 3.15,  rotation: 0   },
  { catalogId: 'floor-bed',   floor: 'first',  x: 1.00, y: 3.15,  rotation: 0   },
  { catalogId: 'toy-storage', floor: 'first',  x: 2.60, y: 3.10,  rotation: 0   },
  { catalogId: 'bookshelf-1', floor: 'first',  x: 3.10, y: 3.10,  rotation: 0   },
  { catalogId: 'playmat',     floor: 'first',  x: 0.10, y: 4.30,  rotation: 0   },
  { catalogId: 'baby-chair',  floor: 'first',  x: 2.00, y: 4.80,  rotation: 0   },
  { catalogId: 'bookshelf-2', floor: 'first',  x: 2.90, y: 5.90,  rotation: 0   },
  { catalogId: 'toy-boxes',   floor: 'first',  x: 1.30, y: 5.90,  rotation: 0   },

  // First floor — Bedroom 2 / Study (x:3.64–6.59, y:0–3.80)
  { catalogId: 'desk',          floor: 'first',  x: 3.70, y: 0.10,  rotation: 0   },
  { catalogId: 'office-chair',  floor: 'first',  x: 4.20, y: 0.95,  rotation: 0   },
  { catalogId: 'ekenabben',     floor: 'first',  x: 5.85, y: 0.10,  rotation: 0   },
  { catalogId: 'standing-desk', floor: 'first',  x: 3.70, y: 1.80,  rotation: 0   },

  // Second floor — Master Bedroom (x:0–3.16, y:0–6.86)
  { catalogId: 'king-bed',  floor: 'second', x: 0.20, y: 0.20,  rotation: 0   },
  { catalogId: 'mirror',    floor: 'second', x: 2.50, y: 0.10,  rotation: 0   },
  { catalogId: 'vilto',     floor: 'second', x: 2.60, y: 0.75,  rotation: 0   },
  { catalogId: 'dog-house', floor: 'second', x: 0.20, y: 5.80,  rotation: 0   },

  // Second floor — Master Bedroom arm (x:3.16–6.80, y:5.63–6.86)
  { catalogId: 'muskan',    floor: 'second', x: 3.20, y: 5.70,  rotation: 0   },
];

const initialFurniture = seed.map(s => ({ id: uid(), ...s }));

export const useStore = create((set) => ({
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

  measureMode: false,
  toggleMeasure: () => set(s => ({ measureMode: !s.measureMode })),
}));
