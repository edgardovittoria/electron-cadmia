import React from 'react';
import { useSelector } from 'react-redux';
import {
  baseShapes,
  useAddToTheSceneANewShape,
} from './useAddToTheSceneANewShape';
import { shapesToolbarVisibilitySelector } from './shapesToolbarSlice';
import { iconForA } from './shapes';
import { toolbarIconsHeight, toolbarIconsWidth, toolbarsHintStyle } from '../../../../../config/styles';

export const ShapesToolbar: React.FC = () => {
  const shapesToolbarVisible = useSelector(shapesToolbarVisibilitySelector);
  const { addToTheSceneANew } = useAddToTheSceneANewShape();
  return (
    <>
      {shapesToolbarVisible && (
        <div className={`absolute flex flex-row left-[390px] top-[10px] text-center shadow ${toolbarIconsWidth}`}>
          {baseShapes.map((shape) => (
            <div
              className={`relative flex px-1 items-center justify-center group bg-white hover:bg-black hover:text-white hover:cursor-pointer ${toolbarIconsHeight}`}
              onClick={() => {
                addToTheSceneANew(shape);
              }}
              key={shape}
            >
              {iconForA(shape)}
              <div className={toolbarsHintStyle}>
                <span className="relative z-10 p-2 leading-none text-white whitespace-no-wrap bg-black rounded-md uppercase">
                  Add {shape}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
