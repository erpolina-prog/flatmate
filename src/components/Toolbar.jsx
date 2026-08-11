import React from 'react';
import { useStore } from '../store';
import './Toolbar.css';

export default function Toolbar() {
  const { currentFloor, setFloor, viewMode, setViewMode, selectedId, rotateFurniture, deleteFurniture, measureMode, toggleMeasure } = useStore();

  return (
    <header className="toolbar">
      <div className="toolbar-brand">flatmate</div>

      <div className="toolbar-group">
        <button
          className={`tb-btn ${currentFloor === 'first' ? 'active' : ''}`}
          onClick={() => setFloor('first')}
        >First Floor</button>
        <button
          className={`tb-btn ${currentFloor === 'second' ? 'active' : ''}`}
          onClick={() => setFloor('second')}
        >Second Floor</button>
      </div>

      <div className="toolbar-group">
        <button
          className={`tb-btn ${viewMode === '2d' ? 'active' : ''}`}
          onClick={() => setViewMode('2d')}
        >2D Plan</button>
        <button
          className={`tb-btn ${viewMode === '3d' ? 'active' : ''}`}
          onClick={() => setViewMode('3d')}
        >3D View</button>
      </div>

      {viewMode === '2d' && (
        <div className="toolbar-group">
          <button
            className={`tb-btn ${measureMode ? 'active measure-active' : ''}`}
            onClick={toggleMeasure}
            title="Measure distance between two points"
          >
            ⟷ Measure
          </button>
        </div>
      )}

      {selectedId && !measureMode && (
        <div className="toolbar-group toolbar-actions">
          <button className="tb-btn" onClick={() => rotateFurniture(selectedId)}>
            ↻ Rotate
          </button>
          <button className="tb-btn danger" onClick={() => deleteFurniture(selectedId)}>
            ✕ Delete
          </button>
        </div>
      )}

      <div className="toolbar-hint">
        {measureMode
          ? 'Click point A → click point B — measure distance · Esc to cancel'
          : viewMode === '2d'
            ? 'Drag furniture · R rotate · Del delete · Scroll zoom'
            : 'Drag to orbit · Scroll zoom · Edit in 2D view'}
      </div>
    </header>
  );
}
