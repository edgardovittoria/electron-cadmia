import React from 'react';
import { useSelector } from 'react-redux';
import {
  baseShapes,
  useAddToTheSceneANewShape,
} from './useAddToTheSceneANewShape';
import { shapesToolbarVisibilitySelector } from './shapesToolbarSlice';
import { iconForA } from './shapes';

export const ShapesToolbar: React.FC = () => {
  const shapesToolbarVisible = useSelector(shapesToolbarVisibilitySelector);
  const { addToTheSceneANew } = useAddToTheSceneANewShape();
  return (
    <>
      {shapesToolbarVisible && (
        <div className="absolute left-[15px] top-[200px] w-[50px] text-center shadow">
          {baseShapes.map((shape) => (
            <div
              className="relative p-3 group bg-white hover:bg-black hover:text-white hover:cursor-pointer h-[50px]"
              onClick={() => {
                addToTheSceneANew(shape);
              }}
              key={shape}
            >
              {iconForA(shape)}
              <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                <span className="relative z-10 p-2  leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md uppercase">
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
