import { ComponentEntity, updateName } from 'cad-library';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { invisibleMeshesSelector } from '../objectsDetailsSlice';
import { useCadmiaModalityManager } from '../../cadmiaModality/useCadmiaModalityManager';
import { CubeIcon } from '@heroicons/react/24/outline';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { BiRename } from 'react-icons/bi';

interface OutlinerProps {
    components: ComponentEntity[],
    selectedComponent: ComponentEntity
}

export const Outliner: FC<OutlinerProps> = ({components, selectedComponent}) => {
  const invisibleMeshes = useSelector(invisibleMeshesSelector)
    return (
        <>
            <div className="h-fit max-h-[150px] border-2 border-amber-400 rounded p-1 overflow-scroll bg-gradient-to-r from-white to-slate-200">
                <div className="border-2 border-transparent text-black w-1/2 text-left pl-2 text-[11px] font-bold">
                    COMPONENTS
                </div>
                {components.map(component => {
                    return (
                        <OutlinerItem key={component.keyComponent + component.name} keyComponent={component.keyComponent} nameComponent={component.name}
                            isVisible={invisibleMeshes.filter(key => key === component.keyComponent).length === 0}/>
                    )
                })}
            </div>
        </>
    )

}

interface OutlinerItemProps {
  keyComponent: number,
  nameComponent: string,
  isVisible: boolean
}

const OutlinerItem: FC<OutlinerItemProps> = ({ keyComponent, nameComponent, isVisible }) => {

  const [outlinerItemVisibility, setOutlinerItemVisibility] = useState(true);
  const dispatch = useDispatch()
  const { sideBarOptsBasedOnModality } = useCadmiaModalityManager()
  const isSelelctedComponent = sideBarOptsBasedOnModality.outliner.isItemSelected(keyComponent)

  useEffect(() => {
      !isSelelctedComponent && setOutlinerItemVisibility(true)
  }, [isSelelctedComponent])


  return (
      <>
          {!isSelelctedComponent ?
              <div
                  key={keyComponent}
                  className="border-2 border-transparent text-black text-[9px] font-bold text-left pl-4 flex w-1/2"
                  onClick={sideBarOptsBasedOnModality.outliner.onClickItemAction(keyComponent)}
              >
                  <CubeIcon className="w-[10px] mr-2" />
                  {nameComponent}
              </div>
              : (
                  outlinerItemVisibility ?
                      <div className="flex items-center border-2 border-amber-400 rounded w-1/2 justify-between">
                          <div
                              key={keyComponent}
                              className="text-black text-[9px] font-bold text-left pl-4 flex items-center"
                              onClick={sideBarOptsBasedOnModality.outliner.onClickItemAction(keyComponent)}
                          >
                              <CubeIcon className="w-[10px] mr-2" />
                              {nameComponent}
                          </div>
                          {sideBarOptsBasedOnModality.outliner.hidingIconVisibility &&
                              <div className="tooltip" data-tip="Hide/Show">
                                  {isVisible
                                  ? <IoMdEye className="w-[17px] pr-1 text-black hover:cursor-pointer" onClick={() => {}} />
                                  : <IoMdEyeOff className="w-[17px] pr-1 text-black hover:cursor-pointer" onClick={() => {}} />}
                              </div>
                          }
                          {sideBarOptsBasedOnModality.outliner.renameIconVisibility &&
                              <div className="tooltip" data-tip="Rename">
                                  <BiRename className="w-[17px] pr-1 text-black" onClick={() => { setOutlinerItemVisibility(false) }} />
                              </div>
                          }
                      </div>
                      :
                      <div key={keyComponent + "_input"} className="text-left">
                          <input
                              type="text"
                              className="border-2 border-amber-400 text-black text-[9px] font-bold w-1/3 rounded text-left pl-4"
                              defaultValue={nameComponent}
                              onBlur={(e) => {
                                  dispatch(updateName({ key: keyComponent, name: e.currentTarget.value }))
                                  setOutlinerItemVisibility(true)
                              }}
                          />
                      </div>
              )
          }
      </>

  )
}
