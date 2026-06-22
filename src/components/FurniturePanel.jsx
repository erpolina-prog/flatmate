import React, { useState } from 'react';
import { FURNITURE_CATEGORIES, getFurnitureDef } from '../data/furniture';
import { FLOORS } from '../data/floorPlan';
import { useStore } from '../store';
import './FurniturePanel.css';

export default function FurniturePanel() {
  const [expanded, setExpanded] = useState({ seating: true, beds: true });
  const { currentFloor, selectedId, furniture, addFurniture, rotateFurniture, deleteFurniture } = useStore();

  const selectedItem = selectedId ? furniture.find(f => f.id === selectedId) : null;
  const selectedDef  = selectedItem ? getFurnitureDef(selectedItem.catalogId) : null;

  const handleAdd = (catalogId) => {
    const floor = FLOORS[currentFloor];
    addFurniture(catalogId, currentFloor, floor.totalWidth / 2 - 0.5, floor.totalDepth / 2 - 0.5);
  };

  const toggle = (catId) => setExpanded(p => ({ ...p, [catId]: !p[catId] }));

  return (
    <aside className="panel">
      <div className="panel-title">Furniture</div>

      <div className="panel-scroll">
        {FURNITURE_CATEGORIES.map(cat => (
          <div key={cat.id} className="cat">
            <button className="cat-head" onClick={() => toggle(cat.id)}>
              <span>{cat.name}</span>
              <span className="cat-arrow">{expanded[cat.id] ? '▾' : '▸'}</span>
            </button>

            {expanded[cat.id] && (
              <div className="cat-items">
                {cat.items.map(item => (
                  <button
                    key={item.id}
                    className="item-btn"
                    onClick={() => handleAdd(item.id)}
                    title={`${item.width}m × ${item.depth}m × ${item.height}m h`}
                  >
                    <span className="item-dot" style={{ background: item.color }} />
                    <span className="item-label">{item.name}</span>
                    <span className="item-dim">{item.width}×{item.depth}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedItem && selectedDef && (
        <div className="panel-sel">
          <div className="sel-label">Selected</div>
          <div className="sel-name">{selectedDef.name}</div>
          <div className="sel-info">{selectedDef.width}m × {selectedDef.depth}m × {selectedDef.height}m h</div>
          <div className="sel-pos">
            x {selectedItem.x.toFixed(2)} · y {selectedItem.y.toFixed(2)} · {selectedItem.rotation}°
          </div>
          <div className="sel-btns">
            <button onClick={() => rotateFurniture(selectedItem.id)}>↻ Rotate 90°</button>
            <button className="btn-del" onClick={() => deleteFurniture(selectedItem.id)}>✕ Delete</button>
          </div>
        </div>
      )}
    </aside>
  );
}
