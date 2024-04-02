import {CubeGeometryAttributes} from "cad-library";
import {FC} from "react";
import {GeometryParamsGeneralProps} from "./geometryParams";

export const CubeGeometryParams: FC<GeometryParamsGeneralProps> = ({entity, updateParams}) => {
    return (
        <>
            <div key="width" className="flex">
                <span className="text-black w-[40%] text-left text-xs">width</span>
                <div className="flex mb-[5px]">
                    <input key="width"
                           type="number"
                           step="0.1"
                           className="border border-black rounded shadow px-1 w-[50%] text-black text-left text-xs"
                           autoComplete="off"
                           value={(entity.geometryAttributes as CubeGeometryAttributes).width}
                           onChange={(e) => updateParams({
                               ...entity.geometryAttributes,
                               width: parseFloat(e.target.value) || 0
                           } as CubeGeometryAttributes)}
                    />
                </div>
            </div>
            <div key="heigth" className="flex">
                <span className="text-black w-[40%] text-left text-xs">heigth</span>
                <div className="flex mb-[5px]">
                    <input key="height"
                           type="number"
                           step="0.1"
                           className="border border-black rounded shadow px-1 w-[50%] text-black text-left text-xs"
                           autoComplete="off"
                           value={(entity.geometryAttributes as CubeGeometryAttributes).height}
                           onChange={(e) => updateParams({
                               ...entity.geometryAttributes,
                               height: parseFloat(e.target.value) || 0
                           } as CubeGeometryAttributes)}
                    />
                </div>
            </div>
            <div key="depth" className="flex">
                <span className="text-black w-[40%] text-left text-xs">depth</span>
                    <div className="flex mb-[5px]">
                        <input key="depth"
                               type="number"
                               step="0.1"
                               className="border border-black rounded shadow px-1 w-[50%] text-black text-left text-xs"
                               autoComplete="off"
                               value={(entity.geometryAttributes as CubeGeometryAttributes).depth}
                               onChange={(e) => updateParams({
                                   ...entity.geometryAttributes,
                                   depth: parseFloat(e.target.value) || 0
                               } as CubeGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="width_segments" className="flex">
                <span className="text-black w-[40%] text-left text-xs">width segments</span>
                    <div className="flex mb-[5px]">
                        <input key="width_segments"
                               type="number"
                               step="1"
                               className="border border-black rounded shadow px-1 w-[50%] text-black text-left text-xs"
                               autoComplete="off"
                               value={(entity.geometryAttributes as CubeGeometryAttributes).widthSegments}
                               onChange={(e) => updateParams({
                                   ...entity.geometryAttributes,
                                   widthSegments: parseFloat(e.target.value) || 0
                               } as CubeGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="heigth_segments" className="flex">
                <span className="text-black w-[40%] text-left text-xs">heigth segments</span>
                    <div className="flex mb-[5px]">
                        <input key="height_segments"
                               type="number"
                               step="1"
                               className="border border-black rounded shadow px-1 w-[50%] text-black text-left text-xs"
                               autoComplete="off"
                               value={(entity.geometryAttributes as CubeGeometryAttributes).heigthSegments}
                               onChange={(e) => updateParams({
                                   ...entity.geometryAttributes,
                                   heigthSegments: parseFloat(e.target.value) || 0
                               } as CubeGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="depth_segments" className="flex">
                <span className="text-black w-[40%] text-left text-xs">depth segments</span>
                    <div className="flex mb-[5px]">
                        <input key="depth_segments"
                               type="number"
                               step="1"
                               className="border border-black rounded shadow px-1 w-[50%] text-black text-left text-xs"
                               autoComplete="off"
                               value={(entity.geometryAttributes as CubeGeometryAttributes).depthSegments}
                               onChange={(e) => updateParams({
                                   ...entity.geometryAttributes,
                                   depthSegments: parseFloat(e.target.value) || 0
                               } as CubeGeometryAttributes)}
                        />
                    </div>
            </div>
        </>
    )
}