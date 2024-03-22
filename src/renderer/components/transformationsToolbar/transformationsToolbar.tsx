import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTransformationActive, transformationsSelector, transformationsToolbarVisibilitySelector } from "./toolbarTransformationSlice";
import TranslationIcon from './style/translationIcon.png'
import RotationIcon from './style/rotationIcon.png'
import ScaleIcon from './style/scaleIcon.png'
import { TransformationType } from './transformationsTypes';


interface TransformationsToolBarProps {
}

export const TransformationsToolBar: React.FC<TransformationsToolBarProps> = () => {
    const getIconFor = (transformationType: TransformationType) => {
        switch (transformationType) {
            case 'translate':
                return TranslationIcon
            case 'rotate':
                return RotationIcon
            case 'scale':
                return ScaleIcon
            default:
                break;
        }
    }
    const transformations = useSelector(transformationsSelector)
    const dispatch = useDispatch();
    const transformationsToolbarVisible = useSelector(transformationsToolbarVisibilitySelector)
    return (
        <>
            {transformationsToolbarVisible &&
                <div className="absolute left-[15px] top-[10px] w-[150px] text-center shadow grid grid-cols-3">
                    {transformations.map((transformation, index) => {
                        return (
                            <div key={index} className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group hover:bg-gray-300 hover:cursor-pointer
                             ${transformation.active ? 'bg-gray-300' : 'bg-white'}`}
                                onClick={() => dispatch(setTransformationActive(transformation.type))}
                            >
                                <img src={getIconFor(transformation.type)} alt={transformation.type}
                                    className="text-black w-7 h-7"
                                />
                                <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                                    <span className="relative z-10 p-2 leading-none uppercase text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">{transformation.type}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}