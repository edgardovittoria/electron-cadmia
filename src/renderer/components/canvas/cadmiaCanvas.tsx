import React, {FC, ReactNode, useEffect, useState} from "react";
import { Provider, ReactReduxContext, useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  componentseSelector,
  FactoryShapes,
  keySelectedComponenteSelector,
} from "cad-library";
import { CanvasObject } from "./components/canvasObject";
import { Controls } from "./components/controls";
import { meshesWithBordersVisibleSelector } from "../sideBar/sidebarSlice";
import { Bounds, useBounds } from "@react-three/drei";
import { focusToSceneSelector } from "../navBar/menuItems/view/viewItemSlice";

interface CadmiaCanvasProps {
}

export const CadmiaCanvas: React.FC<CadmiaCanvasProps> = () => {
  const bordersVisible = useSelector(meshesWithBordersVisibleSelector)
  const components = useSelector(componentseSelector);
  const keySelectedComponent = useSelector(keySelectedComponenteSelector);
  const [meshSelected, setMeshSelected] = useState<THREE.Mesh | undefined>(
    undefined
  );

  return (
    <div className="h-[93vh]">
      <ReactReduxContext.Consumer>
        {({ store }) => (

          <>
            <Canvas
              className="w-full h-full"
              style={{ backgroundColor: "whitesmoke" }}
              camera={{
                position: [0, 50, 0],
                fov: 20,
                far: 1000,
                near: 0.1,
              }}
            >
              <Provider store={store}>
                <pointLight position={[100, 100, 100]} intensity={1.8} />
                <pointLight position={[-100, -100, 100]} intensity={1.8} />
                <hemisphereLight
                  color="#ffffff"
                  groundColor={new THREE.Color("#b9b9b9")}
                  position={[-7, 25, 13]}
                  intensity={1.85}
                />
                <Bounds fit clip observe margin={1.2}>
                  <CommonObjectsActions>
                    {components.map((component) => {
                      return (
                        <CanvasObject
                          setMeshRef={setMeshSelected}
                          key={component.keyComponent}
                          keyComponent={component.keyComponent}
                          transformationParams={
                            component.transformationParams
                          }
                          borderVisible={bordersVisible.filter(mb => mb === component.keyComponent).length > 0}
                        >
                          <FactoryShapes entity={component} color={component.material ? component.material.color : "#63cbf7"} />
                        </CanvasObject>
                      );
                    })}
                  </CommonObjectsActions>
                </Bounds>
                {/* <PointerIntersectionOnMeshSurface /> */}
                <Controls
                  keySelectedComponent={keySelectedComponent}
                  mesh={meshSelected}
                />
                <gridHelper
                  args={[500, 100, new THREE.Color('red'), new THREE.Color('#1a1818')]}
                  scale={[1, 1, 1]}
                />
              </Provider>
            </Canvas>
          </>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

const CommonObjectsActions: FC<{children: ReactNode}> = ({ children }) => {
  const bounds = useBounds()
  const focusToScene = useSelector(focusToSceneSelector)
  useEffect(() => {
    focusToScene && bounds.refresh().clip().fit()
  }, [focusToScene])
  
  return (
    <group>
      {children}
    </group>
  )
}