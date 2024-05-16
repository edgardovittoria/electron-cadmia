import React from 'react';
import { SetUserInfo } from 'cad-library';
import { Navbar } from './components/navBar/NavBar';
import { KeyboardEventMapper } from './components/keyboardEventMapper';
import { CadmiaCanvas } from './components/canvas/cadmiaCanvas';
import { TransformationsToolBar } from './components/transformationsToolbar/transformationsToolbar';
import { BinaryOpsToolbar } from './components/binaryOperationsToolbar/binaryOpsToolbar';
import { MiscToolbar } from './components/miscToolbar/miscToolbar';
import { ShapesToolbar } from './components/navBar/menuItems/shapes/shapeToolbar';
import { Sidebar } from './components/sideBar/Sidebar';
import { StatusBar } from './components/statusBar/statusBar';
import { useCadmiaModalityManager } from './components/cadmiaModality/useCadmiaModalityManager';

export interface CanvasProps {
  setShowCad: (v: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ setShowCad }) => {
  const { useBaseOpactityBasedOnModality } = useCadmiaModalityManager();
  useBaseOpactityBasedOnModality();
  return (
    <div className="m-0 h-[100vh]">
      <SetUserInfo />
      <Navbar setShowCad={setShowCad} />
      <KeyboardEventMapper />
      <div className="w-full p-0 relative">
        <CadmiaCanvas />
        <TransformationsToolBar />
        <BinaryOpsToolbar />
        <MiscToolbar />
        <ShapesToolbar />
        <Sidebar />
      </div>
      <StatusBar />
    </div>
  );
};

export default Canvas;
