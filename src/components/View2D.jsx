import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FLOORS } from '../data/floorPlan';
import { getFurnitureDef } from '../data/furniture';
import { useStore } from '../store';
import './View2D.css';

const INIT_ZOOM = 54;
const MIN_ZOOM  = 18;
const MAX_ZOOM  = 200;

export default function View2D() {
  const svgRef = useRef(null);
  const {
    currentFloor, furniture, selectedId,
    selectItem, deselectItem, moveFurniture, rotateFurniture, deleteFurniture,
    measureMode, toggleMeasure,
  } = useStore();

  const [zoom, setZoom] = useState(INIT_ZOOM);
  const [pan,  setPan]  = useState({ x: 40, y: 30 });
  const [drag, setDrag] = useState(null);
  // drag.moved tracks whether pointer moved significantly (to distinguish click vs drag)
  const dragMoved = useRef(false);

  // Measure state
  const [mPtA,   setMPtA]   = useState(null); // {x,y} metres
  const [mPtB,   setMPtB]   = useState(null); // {x,y} metres
  const [mHover, setMHover] = useState(null); // cursor metres while placing B

  const floor      = FLOORS[currentFloor];
  const floorItems = furniture.filter(f => f.floor === currentFloor);

  // Metre → SVG pixel
  const px = (mx) => pan.x + mx * zoom;
  const py = (my) => pan.y + my * zoom;

  // Client coords → metre coords
  const clientToMeter = useCallback((cx, cy) => {
    const r = svgRef.current.getBoundingClientRect();
    return { x: (cx - r.left - pan.x) / zoom, y: (cy - r.top - pan.y) / zoom };
  }, [pan, zoom]);

  // Reset measure when switching floors or leaving measure mode
  useEffect(() => {
    setMPtA(null); setMPtB(null); setMHover(null);
  }, [currentFloor, measureMode]);

  // Escape clears measure or exits measure mode
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (measureMode) {
          if (mPtA) { setMPtA(null); setMPtB(null); setMHover(null); }
          else toggleMeasure();
        }
      }
      if (!measureMode) {
        if ((e.key === 'r' || e.key === 'R') && selectedId) rotateFurniture(selectedId);
        if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
          e.preventDefault();
          deleteFurniture(selectedId);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, rotateFurniture, deleteFurniture, measureMode, mPtA, toggleMeasure]);

  /* ── Pointer handlers ── */
  const onBgDown = (e) => {
    if (e.button !== 0) return;
    dragMoved.current = false;
    if (!measureMode) deselectItem();
    setDrag({ type: 'pan', cx: e.clientX, cy: e.clientY, px: pan.x, py: pan.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onItemDown = (e, id) => {
    if (e.button !== 0 || measureMode) return; // ignore furniture in measure mode
    e.stopPropagation();
    selectItem(id);
    const item = furniture.find(f => f.id === id);
    dragMoved.current = false;
    setDrag({ type: 'item', id, cx: e.clientX, cy: e.clientY, ix: item.x, iy: item.y });
    svgRef.current.setPointerCapture(e.pointerId);
  };

  const onMove = useCallback((e) => {
    if (drag) {
      const dx = e.clientX - drag.cx;
      const dy = e.clientY - drag.cy;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved.current = true;

      if (drag.type === 'pan') {
        setPan({ x: drag.px + dx, y: drag.py + dy });
      } else {
        moveFurniture(drag.id, drag.ix + dx / zoom, drag.iy + dy / zoom);
      }
    }
    // Live hover preview in measure mode (while placing point B)
    if (measureMode && mPtA && !mPtB) {
      setMHover(clientToMeter(e.clientX, e.clientY));
    }
  }, [drag, zoom, moveFurniture, measureMode, mPtA, mPtB, clientToMeter]);

  const onUp = useCallback((e) => {
    // Measure click (only if pointer barely moved = true click, not a drag)
    if (measureMode && drag?.type === 'pan' && !dragMoved.current) {
      const pt = clientToMeter(e.clientX, e.clientY);
      if (!mPtA || mPtB) {
        // Start new measurement
        setMPtA(pt);
        setMPtB(null);
        setMHover(null);
      } else {
        // Complete measurement
        setMPtB(pt);
        setMHover(null);
      }
    }
    setDrag(null);
  }, [drag, measureMode, mPtA, mPtB, clientToMeter]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const r = svgRef.current.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    setZoom(prev => {
      const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev * factor));
      const scale = next / prev;
      setPan(p => ({ x: cx - (cx - p.x) * scale, y: cy - (cy - p.y) * scale }));
      return next;
    });
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  /* ── Render helpers ── */
  const renderRoom = (room) => {
    const sx = px(room.x), sy = py(room.y);
    const sw = room.width * zoom, sh = room.depth * zoom;
    const fs = Math.max(8, Math.min(14, zoom * 0.22));
    return (
      <g key={room.id}>
        <rect x={sx} y={sy} width={sw} height={sh}
          fill={room.color2d} stroke="#9a9a9a" strokeWidth="1.5" />
        {sw > 50 && sh > 30 && (
          <>
            <text x={sx + sw / 2} y={sy + sh / 2 - fs * 0.5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={fs} fill="#444" style={{ pointerEvents: 'none', userSelect: 'none' }}>
              {room.name}
            </text>
            <text x={sx + sw / 2} y={sy + sh / 2 + fs * 0.9}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={fs * 0.78} fill="#aaa" style={{ pointerEvents: 'none', userSelect: 'none' }}>
              {room.width}×{room.depth}m
            </text>
          </>
        )}
      </g>
    );
  };

  const renderItem = (item) => {
    const def = getFurnitureDef(item.catalogId);
    if (!def) return null;
    const sel = !measureMode && item.id === selectedId;
    const swapped = item.rotation === 90 || item.rotation === 270;
    const w = swapped ? def.depth : def.width;
    const d = swapped ? def.width : def.depth;
    const sx = px(item.x), sy = py(item.y);
    const sw = w * zoom, sh = d * zoom;
    const fs = Math.max(6, Math.min(11, zoom * 0.16));

    return (
      <g key={item.id}
        onPointerDown={(e) => onItemDown(e, item.id)}
        style={{ cursor: measureMode ? 'crosshair' : (drag?.id === item.id ? 'grabbing' : 'grab') }}>
        <rect x={sx} y={sy} width={sw} height={sh}
          fill={def.color} fillOpacity={0.88}
          stroke={sel ? '#5599ff' : 'rgba(0,0,0,0.3)'}
          strokeWidth={sel ? 2 : 0.8} rx={2} />
        {sw > 28 && sh > 18 && (
          <text x={sx + sw / 2} y={sy + sh / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={fs} fill="#fff" fontWeight="500"
            style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {def.name}
          </text>
        )}
        {sel && (
          <rect x={sx - 3} y={sy - 3} width={sw + 6} height={sh + 6}
            fill="none" stroke="#5599ff" strokeWidth={1.5}
            strokeDasharray="5 3" rx={3} />
        )}
      </g>
    );
  };

  /* ── Measure overlay ── */
  const renderMeasure = () => {
    if (!mPtA) return null;
    const endPt = mPtB || mHover;
    const ax = px(mPtA.x), ay = py(mPtA.y);
    const bx = endPt ? px(endPt.x) : ax;
    const by = endPt ? py(endPt.y) : ay;

    const dist = endPt
      ? Math.sqrt((endPt.x - mPtA.x) ** 2 + (endPt.y - mPtA.y) ** 2)
      : 0;

    const midX = (ax + bx) / 2;
    const midY = (ay + by) / 2;
    const label = dist.toFixed(2) + ' m';
    const labelW = label.length * 7.2 + 16;

    // Perpendicular tick marks at endpoints (architectural style)
    const angle = Math.atan2(by - ay, bx - ax);
    const perpX = Math.sin(angle) * 8;
    const perpY = -Math.cos(angle) * 8;

    return (
      <g style={{ pointerEvents: 'none' }}>
        {/* Main line */}
        {endPt && (
          <line x1={ax} y1={ay} x2={bx} y2={by}
            stroke="#f0c040" strokeWidth={1.5} strokeDasharray="6 3" />
        )}

        {/* Endpoint ticks */}
        <line x1={ax - perpX} y1={ay - perpY} x2={ax + perpX} y2={ay + perpY}
          stroke="#f0c040" strokeWidth={2} />
        {endPt && (
          <line x1={bx - perpX} y1={by - perpY} x2={bx + perpX} y2={by + perpY}
            stroke="#f0c040" strokeWidth={2} />
        )}

        {/* Point A dot */}
        <circle cx={ax} cy={ay} r={4} fill="#f0c040" />

        {/* Point B dot (if finalized) */}
        {mPtB && <circle cx={bx} cy={by} r={4} fill="#f0c040" />}

        {/* Preview dot (hover) */}
        {!mPtB && mHover && (
          <circle cx={bx} cy={by} r={3} fill="none" stroke="#f0c040" strokeWidth={1.5} />
        )}

        {/* Distance label pill */}
        {endPt && dist > 0.01 && (
          <>
            <rect
              x={midX - labelW / 2} y={midY - 11}
              width={labelW} height={22} rx={5}
              fill="#1a1a00" stroke="#f0c040" strokeWidth={1}
            />
            <text x={midX} y={midY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={11} fontWeight={600} fill="#f0c040"
              fontFamily="'SF Mono', 'Fira Mono', Consolas, monospace"
              style={{ userSelect: 'none' }}>
              {label}
            </text>
          </>
        )}

        {/* Instruction while placing A */}
        {!endPt && (
          <text x={ax + 10} y={ay - 10}
            fontSize={10} fill="#f0c040"
            fontFamily="'SF Mono', 'Fira Mono', Consolas, monospace"
            style={{ userSelect: 'none' }}>
            Click to set point B
          </text>
        )}
      </g>
    );
  };

  const cursorStyle = measureMode ? 'crosshair' : (drag?.type === 'pan' ? 'grabbing' : 'default');

  const resetView = () => { setZoom(INIT_ZOOM); setPan({ x: 40, y: 30 }); };

  return (
    <div className="view2d">
      <svg ref={svgRef} className="plan-svg"
        onPointerDown={onBgDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        style={{ cursor: cursorStyle }}>

        <defs>
          <pattern id="g1" width={zoom * 0.5} height={zoom * 0.5} patternUnits="userSpaceOnUse"
            x={pan.x % (zoom * 0.5)} y={pan.y % (zoom * 0.5)}>
            <path d={`M${zoom * 0.5} 0L0 0 0 ${zoom * 0.5}`}
              fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
          </pattern>
          <pattern id="g5" width={zoom} height={zoom} patternUnits="userSpaceOnUse"
            x={pan.x % zoom} y={pan.y % zoom}>
            <path d={`M${zoom} 0L0 0 0 ${zoom}`}
              fill="none" stroke="#323232" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#1a1a1a" />
        <rect width="100%" height="100%" fill="url(#g1)" />
        <rect width="100%" height="100%" fill="url(#g5)" />

        {floor.rooms.map(renderRoom)}
        {floorItems.map(renderItem)}
        {renderMeasure()}
      </svg>

      {measureMode && mPtA && !mPtB && (
        <div className="measure-hint">
          Нажмите чтобы установить вторую точку · Esc — сбросить
        </div>
      )}
      {measureMode && !mPtA && (
        <div className="measure-hint">
          Нажмите чтобы установить первую точку · Esc — выйти из режима
        </div>
      )}

      <div className="hud-bottom-right">
        <span>{Math.round(zoom)}px/m</span>
        <button onClick={resetView}>Reset view</button>
      </div>
    </div>
  );
}
