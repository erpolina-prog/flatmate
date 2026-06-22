import React from 'react';
import { useStore } from './store';
import Toolbar from './components/Toolbar';
import FurniturePanel from './components/FurniturePanel';
import View2D from './components/View2D';
import View3D from './components/View3D';
import './App.css';

export default function App() {
  const viewMode = useStore(s => s.viewMode);

  return (
    <div className="app">
      <Toolbar />
      <div className="app-body">
        <div className="view-wrap">
          {viewMode === '2d' ? <View2D /> : <View3D />}
        </div>
        <FurniturePanel />
      </div>
    </div>
  );
}
