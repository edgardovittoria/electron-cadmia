import React from 'react';
import { closeSidebar, openSidebar, sidebarVisibilitySelector } from '../sideBar/sidebarSlice';
import { useDispatch, useSelector } from 'react-redux';

export interface LabelsProps{

}

const Labels: React.FC<LabelsProps> = ({}) => {

  const dispatch = useDispatch()
  const sidebarVisibility = useSelector(sidebarVisibilitySelector)
    return(
      <div className="absolute bottom-0 left-0 flex flex-row gap-1">
        <div className={` font-semibold ${sidebarVisibility ? 'text-black bg-white' : 'text-white bg-black'} z-50 rounded-tr-xl px-3 w-fit hover:cursor-pointer hover:bg-white hover:text-black`}
             onClick={() => {
               if(sidebarVisibility){
                 dispatch(closeSidebar())
               }else {
                 dispatch(openSidebar())
               }
             }}
        >Object Details</div>
        <div className={` font-semibold text-white bg-black z-50 rounded-tr-xl rounded-tl-xl px-3 w-fit hover:cursor-pointer hover:bg-white hover:text-black`}
        >Material Details</div>
      </div>

    )
}

export default Labels
