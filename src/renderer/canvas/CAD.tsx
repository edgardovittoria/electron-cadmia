import React from 'react';
import { SetUserInfo } from 'cad-library';
import { Navbar } from './components/navBar/NavBar';
import { KeyboardEventMapper } from './components/keyboardEventMapper';
import { CadmiaCanvas } from './components/canvas/cadmiaCanvas';
import { TransformationsToolBar } from './components/transformationsToolbar/transformationsToolbar';
import { BinaryOpsToolbar } from './components/binaryOperationsToolbar/binaryOpsToolbar';
import { MiscToolbar } from './components/miscToolbar/miscToolbar';
import { ShapesToolbar } from './components/navBar/menuItems/shapes/shapeToolbar';
import { ObjectsDetails } from './components/objectsDetailsBar/ObjectsDetails';
import { StatusBar } from './components/statusBar/statusBar';
import { useCadmiaModalityManager } from './components/cadmiaModality/useCadmiaModalityManager';
import Labels from './components/labels/Labels';

export interface CanvasProps {
  setShowCad: (v: boolean) => void;
}

const CAD: React.FC<CanvasProps> = ({ setShowCad }) => {
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
        <Labels/>
        <ObjectsDetails />
      </div>
      <StatusBar />
    </div>
  );
};

export default CAD;
