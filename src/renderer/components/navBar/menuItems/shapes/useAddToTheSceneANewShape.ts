import { ComponentEntity, addComponent, getDefaultCone, getDefaultCube, getDefaultCylinder, getDefaultSphere, getDefaultTorus, numberOfGeneratedKeySelector } from "cad-library";
import { useDispatch, useSelector } from "react-redux";
import cubeIcon from "./style/cube.png"
import torusIcon from "./style/torus.png"
import cylinderIcon from "./style/cylinder.png"
import sphereIcon from "./style/sphere.png"
import coneIcon from "./style/cone.png"
import { setFocusNotToScene } from "../view/viewItemSlice";

export const useAddToTheSceneANewShape = () => {
    const dispatch = useDispatch()
    const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
    const addToTheSceneANew = (shape: string) => {
        switch (shape) {
            case "Cube":
                dispatch(addComponent(defaultNamedNew(getDefaultCube(numberOfGeneratedKey, dispatch))))
                break;
            case "Cylinder":
                dispatch(addComponent(defaultNamedNew(getDefaultCylinder(numberOfGeneratedKey, dispatch))))
                break;
            case "Cone":
                dispatch(addComponent(defaultNamedNew(getDefaultCone(numberOfGeneratedKey, dispatch))))
                break;
            case "Sphere":
                dispatch(addComponent(defaultNamedNew(getDefaultSphere(numberOfGeneratedKey, dispatch))))
                break;
            case "Torus":
                dispatch(addComponent(defaultNamedNew(getDefaultTorus(numberOfGeneratedKey, dispatch))))
                break;
            default:
                break;
        }
        dispatch(setFocusNotToScene())
    }

    const defaultNamedNew = (entity: ComponentEntity) => {
        entity.name = entity.name + "_" + entity.keyComponent.toString()
        return entity
    }

    const iconForA = (shape: string) => {
        switch (shape) {
            case "Cube": return cubeIcon
            case "Cylinder": return cylinderIcon
            case "Cone": return coneIcon
            case "Sphere": return sphereIcon
            case "Torus": return torusIcon
            default:
                break;
        }
    }
    return {addToTheSceneANew, iconForA}
}

export const baseShapes : string[] = ["Cube", "Sphere", "Cylinder", "Torus", "Cone"]