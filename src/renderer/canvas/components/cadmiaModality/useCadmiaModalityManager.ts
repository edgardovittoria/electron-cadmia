import { useDispatch, useSelector } from "react-redux";
import { cadmiaModalitySelector, setModality } from "./cadmiaModalitySlice";
import { Material, componentseSelector, removeComponent, removeComponentMaterial, selectComponent, selectedComponentSelector, setComponentMaterial, setComponentsOpacity } from "cad-library";
import { binaryOpEntitiesKeysSelector, toggleEntitySelectionForBinaryOp } from "../binaryOperationsToolbar/binaryOperationsToolbarSlice";
import { multipleSelectionEntitiesKeysSelector, toggleEntitySelectionForMultipleSelection } from "../miscToolbar/miscToolbarSlice";
import { useEffect } from "react";

export const useCadmiaModalityManager = () => {
    const modality = useSelector(cadmiaModalitySelector)
    const dispatch = useDispatch()
    const selectedComponent = useSelector(selectedComponentSelector)
    const multipleSelectionEntityKeys = useSelector(multipleSelectionEntitiesKeysSelector)
    const binaryOpsEntityKeys = useSelector(binaryOpEntitiesKeysSelector)

    const canvasObjectOpsBasedOnModality = {
        onClickAction: (keyComponent: number) => {
            if (modality === 'NormalSelection') {
                (!selectedComponent || selectedComponent.keyComponent !== keyComponent) &&
                    dispatch(selectComponent(keyComponent));
            } else if (modality === 'BinaryOperation') {
                dispatch(toggleEntitySelectionForBinaryOp(keyComponent));
            }
            else if (modality === 'MultipleSelection') {
                dispatch(toggleEntitySelectionForMultipleSelection(keyComponent))
            }
        }
    }

    const miscToolbarOpsBasedOnModality = {
        iconStyles: {
            singleSelectionBackground: modality === "NormalSelection" ? 'bg-gray-400' : 'bg-white',
            multipleSelectionBackground: modality === "MultipleSelection" ? 'bg-gray-400' : 'bg-white'
        }
    }

    const sideBarOptsBasedOnModality = {
        elementsVisibility: {
            transformations: modality !== 'MultipleSelection' ? true : false,
            geometryParams: modality !== 'MultipleSelection' ? true : false,
            borders: modality !== 'MultipleSelection' ? true : false
        },
        outliner: {
            onClickItemAction: (keyComponent: number) => {
                if (modality === 'NormalSelection') {
                    return () => {
                        (!selectedComponent || selectedComponent.keyComponent !== keyComponent) &&
                            dispatch(selectComponent(keyComponent))
                    };
                } else if (modality === 'BinaryOperation') {
                    return () => { dispatch(toggleEntitySelectionForBinaryOp(keyComponent)) };
                }
                else if (modality === 'MultipleSelection') {
                    return () => { dispatch(toggleEntitySelectionForMultipleSelection(keyComponent)) }
                }
            },
            isItemSelected: (keyComponent: number) => {
                if (modality === 'NormalSelection') {
                    return selectedComponent ? selectedComponent.keyComponent === keyComponent : false
                } else if (modality === 'BinaryOperation') {
                    return binaryOpsEntityKeys.filter(key => key === keyComponent).length > 0
                }
                else if (modality === 'MultipleSelection') {
                    return multipleSelectionEntityKeys.filter(key => key === keyComponent).length > 0
                }
            },
            renameIconVisibility: modality === 'NormalSelection' ? true : false
        },
        deleteButton: {
            messages: modality !== 'MultipleSelection'
                ? { popup: `Sei sicuro di voler eliminare il componente ${(selectedComponent) ? selectedComponent.name : ''} ?`, buttonLabel: `Delete ${(selectedComponent) ? selectedComponent.name : ''}` }
                : { popup: `Sei sicuro di voler eliminare i componenti selezionati?`, buttonLabel: 'Delete components' },
            onClickAction: () => {
                if (modality !== 'MultipleSelection') {
                    (selectedComponent) && dispatch(removeComponent(selectedComponent.keyComponent))
                } else {
                    multipleSelectionEntityKeys.forEach(key => dispatch(removeComponent(key)))
                }
                dispatch(setModality('NormalSelection'))
            }
        },
        material: {
            setMaterial: (material: Material) =>
                (modality !== 'MultipleSelection') ?
                    dispatch(
                        setComponentMaterial({
                            key: selectedComponent.keyComponent,
                            material: material,
                        })) :
                    multipleSelectionEntityKeys.forEach(key => dispatch(setComponentMaterial({ key: key, material: material }))),
            unsetMaterial: () =>
                (modality !== 'MultipleSelection') ?
                    dispatch(removeComponentMaterial({ keyComponent: selectedComponent.keyComponent }))
                    :
                    multipleSelectionEntityKeys.forEach(key => dispatch(removeComponentMaterial({ keyComponent: key })))
        }
    }

    const useBaseOpactityBasedOnModality = () => {
        const modality = useSelector(cadmiaModalitySelector)
        const components = useSelector(componentseSelector)
        useEffect(() => {
            let componentKeys = components.reduce(
                (keys: number[], component) => {
                    keys.push(component.keyComponent);
                    return keys;
                },
                []
            );
            if (modality !== 'NormalSelection') {
                dispatch(setComponentsOpacity({ keys: componentKeys, opacity: 0.3 }));
            } else {
                dispatch(setComponentsOpacity({ keys: componentKeys, opacity: 1 }));
            }
        }, [modality]);
    }

    return {
        canvasObjectOpsBasedOnModality, miscToolbarOpsBasedOnModality,
        sideBarOptsBasedOnModality, useBaseOpactityBasedOnModality
    }
}