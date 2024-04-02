import './App.css';
import React, { useState } from 'react';
import Dashboard from './dashboard/components/Dashboard';
import Canvas from './canvas/Canvas';

export default function App() {
  const [showCad, setShowCad] = useState<boolean>(false);
  return (
    <div>
      {showCad ? (
        <Canvas setShowCad={setShowCad} />
      ) : (
        <Dashboard showCad={showCad} setShowCad={setShowCad} />
      )}
    </div>
  );
}
