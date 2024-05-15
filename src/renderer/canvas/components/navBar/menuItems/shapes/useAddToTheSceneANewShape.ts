import {
  ComponentEntity,
  addComponent,
  getDefaultCone,
  getDefaultCube,
  getDefaultCylinder,
  getDefaultSphere,
  getDefaultTorus,
  numberOfGeneratedKeySelector,
} from 'cad-library';
import { useDispatch, useSelector } from 'react-redux';
import { setFocusNotToScene } from '../view/viewItemSlice';

export const useAddToTheSceneANewShape = () => {
  const dispatch = useDispatch();
  const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
  const defaultNamedNew = (entity: ComponentEntity) => {
    if(entity.name !== 'CUBE'){
      entity.name = `${entity.name}_${entity.keyComponent.toString()}`;
    }
    else{
      entity.name = `BRICK_${entity.keyComponent.toString()}`;
    }
    return entity;
  };
  const addToTheSceneANew = (shape: string) => {
    switch (shape) {
      case 'Brick':
        dispatch(
          addComponent(
            defaultNamedNew(getDefaultCube(numberOfGeneratedKey, dispatch)),
          ),
        );
        break;
      case 'Cylinder':
        dispatch(
          addComponent(
            defaultNamedNew(getDefaultCylinder(numberOfGeneratedKey, dispatch)),
          ),
        );
        break;
      case 'Cone':
        dispatch(
          addComponent(
            defaultNamedNew(getDefaultCone(numberOfGeneratedKey, dispatch)),
          ),
        );
        break;
      case 'Sphere':
        dispatch(
          addComponent(
            defaultNamedNew(getDefaultSphere(numberOfGeneratedKey, dispatch)),
          ),
        );
        break;
      case 'Torus':
        dispatch(
          addComponent(
            defaultNamedNew(getDefaultTorus(numberOfGeneratedKey, dispatch)),
          ),
        );
        break;
      default:
        break;
    }
    dispatch(setFocusNotToScene());
  };
  return { addToTheSceneANew };
};

export const baseShapes: string[] = [
  'Brick',
  'Sphere',
  'Cylinder',
  'Torus',
  'Cone',
];
