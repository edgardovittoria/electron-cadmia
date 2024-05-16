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
  const dispatch = useDispatch();
  const { sideBarOptsBasedOnModality } = useCadmiaModalityManager();

  return (
    <>
      {sideBarVisibility ? (
        <div
          className={`absolute bottom-0 left-0 w-[18vw] bg-white p-[20px] text-white text-center
                ${
            sideBarVisibility
              ? 'translate-x-0 transition '
              : 'translate-x-full transition'
          }
            `}
        >
          <div className='flex items-center mb-[10px]'>
            <TiArrowLeft
              className='text-black w-6 h-6 hover:cursor-pointer'
              onClick={() => dispatch(closeSidebar())}
            />
            <h2 className='text-xl text-black text-sm mx-auto font-bold'>
              Object Details
            </h2>
          </div>
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

        <div className='absolute bottom-0 font-semibold left-0 text-black bg-white border border-b-0 border-black rounded-r-xl px-3 w-[140px] hover:cursor-pointer hover:bg-black hover:text-white'
             onClick={() => dispatch(openSidebar())}
        >Object Details</div>

      )}
    </>
  );
};
