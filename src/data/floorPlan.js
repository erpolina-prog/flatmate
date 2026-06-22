// Flat 2, 70 North End Road NW11 7SY
// All dimensions in meters (interior measurements from floor plan)

export const CEILING_HEIGHT = 2.6;

export const FLOORS = {
  first: {
    id: 'first',
    name: 'First Floor',
    // Outer bounding box for camera framing
    totalWidth: 7.00,
    totalDepth: 10.44,
    rooms: [
      {
        id: 'reception_kitchen',
        name: 'Reception / Kitchen',
        x: 0, y: 0,
        width: 7.00, depth: 5.36,
        type: 'living',
        color2d: '#fdf9f4',
        color3d: '#e0d8ce',
      },
      {
        id: 'landing_1',
        name: 'Landing',
        x: 0, y: 5.36,
        width: 4.06, depth: 1.69,
        type: 'hallway',
        color2d: '#f2f2f0',
        color3d: '#d0d0cc',
      },
      {
        id: 'bathroom_1',
        name: 'Bathroom',
        x: 4.06, y: 5.36,
        width: 2.94, depth: 1.69,
        type: 'bathroom',
        color2d: '#eaf4f8',
        color3d: '#c4dce8',
      },
      {
        id: 'bedroom_1',
        name: 'Bedroom 1',
        x: 0, y: 7.05,
        width: 5.18, depth: 3.39,
        type: 'bedroom',
        color2d: '#f2f4fa',
        color3d: '#d0d4e4',
      },
      {
        id: 'hallway_1',
        name: 'Hallway',
        x: 5.18, y: 7.05,
        width: 1.82, depth: 3.39,
        type: 'hallway',
        color2d: '#f2f2f0',
        color3d: '#d0d0cc',
      },
    ],
  },
  second: {
    id: 'second',
    name: 'Second Floor',
    totalWidth: 7.84,
    totalDepth: 5.00,
    rooms: [
      {
        id: 'bedroom_2',
        name: 'Bedroom 2',
        x: 0, y: 0,
        width: 4.00, depth: 3.35,
        type: 'bedroom',
        color2d: '#f2f4fa',
        color3d: '#d0d4e4',
      },
      {
        id: 'bedroom_3',
        name: 'Bedroom 3',
        x: 4.00, y: 0,
        width: 3.84, depth: 3.32,
        type: 'bedroom',
        color2d: '#f2f4fa',
        color3d: '#d0d4e4',
      },
      {
        id: 'eaves',
        name: 'Eaves',
        x: 0, y: 3.35,
        width: 3.47, depth: 1.65,
        type: 'storage',
        color2d: '#ebebea',
        color3d: '#c8c8c4',
      },
      {
        id: 'landing_2',
        name: 'Landing',
        x: 3.47, y: 3.35,
        width: 4.37, depth: 1.65,
        type: 'hallway',
        color2d: '#f2f2f0',
        color3d: '#d0d0cc',
      },
    ],
  },
};
