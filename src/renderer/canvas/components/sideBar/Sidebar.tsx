import React from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import { componentseSelector, selectedComponentSelector } from 'cad-library';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Transformations } from './components/transformations';
import { GeometryParams } from './components/geometryParams/geometryParams';
import { MaterialSelection } from './components/materialSelection/materialSelection';
import { Outliner } from './components/outliner/outliner';
import { BordersMeshOption } from './components/bordersMeshOption';
import {
  closeSidebar,
  openSidebar,
  sidebarVisibilitySelector
} from './sidebarSlice';
import { useCadmiaModalityManager } from '../cadmiaModality/useCadmiaModalityManager';
import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';

interface SidebarProps {
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const canvasComponents = useSelector(componentseSelector);
  const selectedComponent = useSelector(selectedComponentSelector);
  const sideBarVisibility = useSelector(sidebarVisibilitySelector);
  const { sideBarOptsBasedOnModality } = useCadmiaModalityManager();

  return (
    <>
      {sideBarVisibility ? (
        <div
          className={`absolute bottom-0 z-10 left-0 w-[18vw] bg-white px-[20px] pt-[20px] pb-[50px] text-white text-center translate-y-0 transition`}
        >
          <div className='h-full max-h-[800px] overflow-scroll'>
            <Outliner
              components={canvasComponents}
              selectedComponent={selectedComponent}
            />
            {selectedComponent && (
              <div className='text-left'>
                {sideBarOptsBasedOnModality.elementsVisibility
                  .transformations && (
                  <>
                    <h6 className='text-black mt-[10px] text-sm font-bold'>
                      Transformation Params
                    </h6>
                    <hr className='border-amber-500 mt-1' />
                    <Transformations
                      transformationParams={
                        selectedComponent.transformationParams
                      }
                    />
                  </>
                )}
                {sideBarOptsBasedOnModality.elementsVisibility
                  .geometryParams && (
                  <>
                    <h6 className='text-black mt-[10px] text-sm font-bold'>
                      Geometry Params
                    </h6>
                    <hr className='border-amber-500 mb-2 mt-1' />
                    <GeometryParams entity={selectedComponent} />
                  </>
                )}
                <MaterialSelection
                  defaultMaterial={selectedComponent.material}
                  setMaterial={sideBarOptsBasedOnModality.material.setMaterial}
                  unsetMaterial={
                    sideBarOptsBasedOnModality.material.unsetMaterial
                  }
                />
                {sideBarOptsBasedOnModality.elementsVisibility.borders && (
                  <>
                    <h6 className='text-black mt-[10px] text-sm font-bold'>
                      Visualization
                    </h6>
                    <hr className='border-amber-500 mb-2 mt-1' />
                    <BordersMeshOption />
                  </>
                )}
                <button
                  type='button'
                  className='rounded bg-red-500 shadow p-2 mt-[20px] w-full'
                  onClick={() => {
                    if (
                      window.confirm(
                        sideBarOptsBasedOnModality.deleteButton.messages.popup
                      )
                    ) {
                      sideBarOptsBasedOnModality.deleteButton.onClickAction();
                    }
                  }}
                >
                  {sideBarOptsBasedOnModality.deleteButton.messages.buttonLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
