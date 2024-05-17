import './App.css';
import { useState } from 'react';
import Dashboard from './dashboard/Dashboard';
import CAD from './canvas/CAD';

export default function App() {
  const [showCad, setShowCad] = useState<boolean>(false);
  return (
    <div>
      {showCad ? (
        <CAD setShowCad={setShowCad} />
      ) : (
        <Dashboard showCad={showCad} setShowCad={setShowCad} />
      )}
    </div>
  );
}
