import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FLOORS, CEILING_HEIGHT } from '../data/floorPlan';
import { getFurnitureDef } from '../data/furniture';
import { useStore } from '../store';

/* ── Room floor tile ── */
function RoomFloor({ room }) {
  return (
    <mesh
      position={[room.x + room.width / 2, -0.03, room.y + room.depth / 2]}
      receiveShadow
    >
      <boxGeometry args={[room.width - 0.04, 0.06, room.depth - 0.04]} />
      <meshStandardMaterial color={room.color3d} roughness={0.9} />
    </mesh>
  );
}

/* ── Room wall outlines (thin strips on room edges) ── */
function RoomWalls({ room }) {
  const h = CEILING_HEIGHT;
  const t = 0.08;
  const segments = [
    // [cx, cy, cz, w, d]
    [room.x + room.width / 2, h / 2, room.y,             room.width, t], // north
    [room.x + room.width / 2, h / 2, room.y + room.depth, room.width, t], // south
    [room.x,                  h / 2, room.y + room.depth / 2, t, room.depth], // west
    [room.x + room.width,     h / 2, room.y + room.depth / 2, t, room.depth], // east
  ];
  return (
    <>
      {segments.map(([cx, cy, cz, sw, sd], i) => (
        <mesh key={i} position={[cx, cy, cz]}>
          <boxGeometry args={[sw, h, sd]} />
          <meshStandardMaterial color="#383838" roughness={0.95} />
        </mesh>
      ))}
    </>
  );
}

/* ── Furniture box ── */
function FurnitureBox({ item, isSelected }) {
  const def = getFurnitureDef(item.catalogId);
  if (!def) return null;

  const rot = item.rotation || 0;
  const swapped = rot === 90 || rot === 270;
  const w = swapped ? def.depth : def.width;
  const d = swapped ? def.width : def.depth;

  const cx = item.x + w / 2;
  const cy = def.height / 2;
  const cz = item.y + d / 2;

  const rotY = -rot * Math.PI / 180;

  return (
    <mesh position={[cx, cy, cz]} rotation={[0, rotY, 0]} castShadow>
      <boxGeometry args={[def.width, def.height, def.depth]} />
      <meshStandardMaterial
        color={def.color}
        roughness={0.7}
        metalness={0.05}
        emissive={isSelected ? '#2244bb' : '#000000'}
        emissiveIntensity={isSelected ? 0.35 : 0}
      />
    </mesh>
  );
}

/* ── Floor grid helper ── */
function FloorGrid({ floor }) {
  const size = Math.max(floor.totalWidth, floor.totalDepth) + 10;
  const divisions = Math.ceil(size);
  const cx = floor.totalWidth / 2;
  const cz = floor.totalDepth / 2;
  return (
    <primitive
      object={new THREE.GridHelper(size, divisions * 2, '#2a2a2a', '#222222')}
      position={[cx, -0.001, cz]}
    />
  );
}

/* ── Scene ── */
function Scene({ floorId }) {
  const floor = FLOORS[floorId];
  const { furniture, selectedId } = useStore();
  const items = furniture.filter(f => f.floor === floorId);

  const camTarget = [floor.totalWidth / 2, 0, floor.totalDepth / 2];

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 14, 10]} intensity={0.9} castShadow />
      <directionalLight position={[-6, 8, -4]} intensity={0.25} />

      <FloorGrid floor={floor} />

      {floor.rooms.map(r => (
        <group key={r.id}>
          <RoomFloor room={r} />
          <RoomWalls room={r} />
        </group>
      ))}

      {items.map(item => (
        <FurnitureBox key={item.id} item={item} isSelected={item.id === selectedId} />
      ))}

      <OrbitControls
        makeDefault
        target={camTarget}
        minDistance={3}
        maxDistance={35}
        maxPolarAngle={Math.PI / 2.1}
        enablePan={true}
      />
    </>
  );
}

export default function View3D() {
  const { currentFloor } = useStore();
  const floor = FLOORS[currentFloor];
  const camX = floor.totalWidth / 2;
  const camZ = floor.totalDepth / 2;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        key={currentFloor}
        camera={{ position: [camX + 6, 9, camZ + 10], fov: 50, near: 0.1, far: 200 }}
        shadows
        gl={{ antialias: true }}
      >
        <Scene floorId={currentFloor} />
      </Canvas>

      <div style={{
        position: 'absolute', bottom: 14, right: 14,
        fontSize: 11, color: '#444',
        pointerEvents: 'none',
      }}>
        3D view — editing in 2D Plan
      </div>
    </div>
  );
}
