import './App.css';
import {
  CanvasState,
  ComponentEntity,
  FaunaCadModel,
  getModelsByOwner,
  ImportActionParamsObject, importStateCanvas, resetState,
  SetUserInfo,
  useFaunaQuery
} from 'cad-library';
import React, { useEffect, useState } from 'react';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { useAuth0 } from '@auth0/auth0-react';
import { PiFolderUserFill } from 'react-icons/pi';
import { IoShareSocial } from 'react-icons/io5';
import { GiCubeforce } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import AWS from 'aws-sdk';
import { useCadmiaModalityManager } from './components/cadmiaModality/useCadmiaModalityManager';
import boxIcon from '../../assets/document-graphic.png';
import { Navbar } from './components/navBar/NavBar';
import { KeyboardEventMapper } from './components/keyboardEventMapper';
import { CadmiaCanvas } from './components/canvas/cadmiaCanvas';
import { TransformationsToolBar } from './components/transformationsToolbar/transformationsToolbar';
import { BinaryOpsToolbar } from './components/binaryOperationsToolbar/binaryOpsToolbar';
import { MiscToolbar } from './components/miscToolbar/miscToolbar';
import { ShapesToolbar } from './components/navBar/menuItems/shapes/shapeToolbar';
import { Sidebar } from './components/sideBar/Sidebar';
import { StatusBar } from './components/statusBar/statusBar';
import { s3 } from './components/navBar/menuItems/file/components/s3Config';
import { setUnit } from './components/statusBar/statusBarSlice';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';

export default function App() {
  const { useBaseOpactityBasedOnModality } = useCadmiaModalityManager();
  useBaseOpactityBasedOnModality();
  const { loginWithPopup, user } = useAuth0();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('MP');
  const [models, setModels] = useState<FaunaCadModel[]>([]);
  const [showCad, setShowCad] = useState<boolean>(false);
  const { execQuery } = useFaunaQuery();
  const dispatch = useDispatch()
  useEffect(() => {
    if (user && user.sub) {
      execQuery(getModelsByOwner, user.sub)
        .then((mods) => {
          setModels(mods);
        })
        .catch((err) => console.log(err));
    }
  }, [user, showCad]);
  const getFileS3 = async (bucket: string, fileKey: string) => {
    try {
      const params = {
        Bucket: bucket,
        Key: fileKey,
      };
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err);
        }
        const model = JSON.parse(data.Body?.toString() as string) as {
          components: ComponentEntity[];
          unit: string;
        };
        const importActionParams = {
          canvas: {
            numberOfGeneratedKey: 0,
            components: model.components,
            lastActionType: '',
            selectedComponentKey: 0,
          } as CanvasState,
          unit: model.unit,
        } as ImportActionParamsObject;
        dispatch(importStateCanvas(importActionParams));
        dispatch(setUnit(importActionParams.unit));
        setShowCad(true);
        return model;
      });
    } catch (exception) {
      console.log(exception);
      const result: {
        components: ComponentEntity[];
        unit: string;
      } = {
        components: [],
        unit: '',
      };
      return result;
    }
  };
  return (
    <div>
      {showCad ? (
        <div className="m-0 h-full">
          <SetUserInfo />
          <Navbar setShowCad={setShowCad} />
          <KeyboardEventMapper />
          <div className="w-full p-0 relative">
            <CadmiaCanvas />
            <TransformationsToolBar />
            <BinaryOpsToolbar />
            <MiscToolbar />
            <ShapesToolbar />
            <Sidebar />
          </div>
          <StatusBar />
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="w-1/5 bg-black h-[100vh] relative flex flex-col text-white items-center py-5">
            <span className="text-4xl font-semibold">CADmIA</span>
            <hr className="w-full border border-white mt-3" />
            <div
              className={`flex flex-col py-2 gap-2 mt-5 w-full items-start pl-5 hover:bg-white hover:text-black hover:cursor-pointer ${selectedMenuItem === 'MP' ? 'bg-white text-black' : 'text-white'}`}
              onClick={() => setSelectedMenuItem('MP')}
            >
              <div className="flex flex-row items-center gap-2">
                <PiFolderUserFill size={25} />
                <span className="text-xl">My Projects</span>
              </div>
            </div>
            <div
              className={`flex flex-col py-2 gap-2 mt-1 w-full items-start pl-5 hover:bg-white hover:text-black hover:cursor-pointer ${selectedMenuItem === 'MSP' ? 'bg-white text-black' : 'text-white'}`}
              onClick={() => setSelectedMenuItem('MSP')}
            >
              <div className="flex flex-row items-center gap-2">
                <IoShareSocial size={25} />
                <span className="text-xl">Shared With Me</span>
              </div>
            </div>
            <div
              className={`flex flex-col py-2 gap-2 mt-1 w-full items-start pl-5 hover:bg-white hover:text-black hover:cursor-pointer ${selectedMenuItem === 'L' ? 'bg-white text-black' : 'text-white'}`}
              onClick={() => setSelectedMenuItem('L')}
            >
              <div className="flex flex-row items-center gap-2">
                <GiCubeforce size={25} />
                <span className="text-xl">Library</span>
              </div>
            </div>
            <div
              className={`flex flex-col py-2 gap-2 mt-1 w-full items-start pl-5 hover:bg-white hover:text-black hover:cursor-pointer ${selectedMenuItem === 'P' ? 'bg-white text-black' : 'text-white'}`}
              onClick={() => setSelectedMenuItem('P')}
            >
              <div className="flex flex-row items-center gap-2">
                <CgProfile size={25} />
                <span className="text-xl">Profile</span>
              </div>
            </div>
            {user ? (
              <div
                className="absolute bottom-10 flex flex-col gap-5 w-3/4 items-center px-10 py-2 border border-white rounded-xl hover:bg-white hover:text-black hover:cursor-pointer"
                onClick={() => {
                  window.electron.ipcRenderer.sendMessage('logout', [
                    process.env.REACT_APP_AUTH0_DOMAIN,
                  ]);
                }}
              >
                <div className="flex flex-row justify-between items-center gap-2">
                  <IoMdLogOut size={25} />
                  <span className="text-xl font-semibold">Logout</span>
                </div>
              </div>
            ) : (
              <div
                className="absolute bottom-10 flex flex-col gap-5 w-3/4 items-center px-10 py-2 border border-white rounded-xl hover:bg-white hover:text-black hover:cursor-pointer"
                onClick={() => loginWithPopup()}
              >
                <div className="flex flex-row justify-between items-center gap-2">
                  <IoMdLogIn size={25} />
                  <span className="text-xl font-semibold">Login</span>
                </div>
              </div>
            )}
          </div>
          <div
            className={`w-4/5 h-[100vh] flex ${user ? 'items-start pt-20' : 'items-center justify-center'} relative`}
          >
            {user ? (
              <div className="w-full flex flex-col items-start">
                <div className="w-full px-10 grid grid-cols-5 gap-4">
                  {models.map((m) => {
                    return (
                      <div
                        className="px-10 py-12 relative rounded-xl border border-black flex flex-col items-center hover:bg-black hover:text-white hover:cursor-pointer hover:shadow-2xl"
                        onClick={() => {
                          dispatch(resetState());
                          dispatch(ActionCreators.clearHistory());
                          getFileS3(
                            process.env.REACT_APP_AWS_BUCKET_NAME as string,
                            m.components,
                          ).then((res) => {
                            console.log(res);
                          });
                        }}
                      >
                        <GiCubeforce size={75} />
                        <span className="absolute bottom-2 font-semibold">
                          {m.name}
                        </span>
                      </div>
                    );
                  })}
                  <div
                    className="px-10 py-12 relative rounded-xl border border-dashed border-black flex flex-col items-center hover:bg-black hover:text-white hover:cursor-pointer hover:shadow-2xl"
                    onClick={() => {
                      dispatch(resetState());
                      dispatch(ActionCreators.clearHistory());
                      setShowCad(true);
                    }}
                  >
                    <AiOutlineAppstoreAdd size={75} />
                    <span className="absolute bottom-2 font-semibold">
                      New Blank Project
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <img src={boxIcon} alt="box icon" />
                <span className="text-xl font-semibold">
                  Login/Register and create your first project
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
