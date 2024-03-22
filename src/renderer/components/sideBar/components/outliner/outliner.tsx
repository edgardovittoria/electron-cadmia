import { ComponentEntity } from 'cad-library';
import React, {} from 'react';
import { OutlinerItem } from './outlinerItem';

interface OutlinerProps {
    components: ComponentEntity[],
    selectedComponent: ComponentEntity
}

export const Outliner: React.FC<OutlinerProps> = ({components, selectedComponent}) => {
    return (
        <>
            <div className="h-[300px] max-h-[300px] border-2 border-amber-400 rounded p-1 overflow-scroll bg-gradient-to-r from-white to-slate-200">
                <div className="border-2 border-transparent text-black w-1/2 text-left pl-2 text-[11px] font-bold">
                    CANVAS
                </div>
                {components.map(component => {
                    return (
                        <OutlinerItem key={component.keyComponent + component.name} keyComponent={component.keyComponent} nameComponent={component.name}/>
                    )
                })}
            </div>
        </>
    )

}