import {TransformationParams, updateTransformationParams} from "cad-library";
import {FC} from "react";
import {useDispatch} from "react-redux";

export const Transformations: FC<{ transformationParams: TransformationParams }> = ({transformationParams}) => {
    const dispatch = useDispatch()

    return (
        <>
            <div className="flex mt-2">
                <div className="flex justify-center mx-[10px] ml-[70px] w-full">
                    <div className="text-black w-1/3 text-center font-bold mb-1 text-xs">X</div>
                    <div className="text-black w-1/3 text-center font-bold mb-1 text-xs">Y</div>
                    <div className="text-black w-1/3 text-center font-bold mb-1 text-xs">Z</div>
                </div>
            </div>
            {Object.entries(transformationParams).map(([type, value]) =>
                <div key={type} className="flex justify-between">
                    <span className="text-black w-[15%] text-xs">{type}</span>
                    <div className="flex mb-[5px] justify-between pr-[15px] w-[83%]">
                        {value.map((paramValue, index) =>
                            <input key={index}
                                   type="number"
                                   step="0.1"
                                   className="border border-black rounded shadow w-[30%] text-black text-xs px-1"
                                   autoComplete="off"
                                   value={paramValue}
                                   onChange={(e) => {
                                       dispatch(updateTransformationParams(Object.keys(transformationParams).reduce((newTransfParams, typeTransf) => {
                                           newTransfParams[typeTransf as keyof TransformationParams] = [...newTransfParams[typeTransf as keyof TransformationParams]]
                                           if (typeTransf === type) {
                                               newTransfParams[typeTransf as keyof TransformationParams][index] = parseFloat(e.target.value) || 0
                                           }
                                           return newTransfParams
                                       }, {...transformationParams})))
                                   }}
                            />
                        )}
                    </div>
                </div>
            )}

        </>

    )
}