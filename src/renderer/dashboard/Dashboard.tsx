import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  FaunaCadModel,
  getModelsByOwner,
  resetState,
  useFaunaQuery,
} from 'cad-library';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Navbar from './components/navbar/Navbar';
import 'react-contexify/ReactContexify.css';
import MyProject from './components/myProjects/MyProject';
import boxIcon from '../../../assets/document-graphic.png';

export interface DashboardProps {
  showCad: boolean;
  setShowCad: (v: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ showCad, setShowCad }) => {
  const { user } = useAuth0();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('MP');
  const [models, setModels] = useState<FaunaCadModel[]>([]);
  const deleteModel = (model: FaunaCadModel) => {
    setModels(models.filter(m => m.id !== model.id))
  }
  const { execQuery } = useFaunaQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.sub) {
      execQuery(getModelsByOwner, user.sub)
        .then((mods) => {
          setModels(mods);
        })
        .catch((err) => console.log(err));
    }
  }, [user, showCad]);

  return (
    <div className="flex flex-row">
      <Navbar
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
      />
      <div
        className={`w-4/5 h-[100vh] flex ${user ? 'items-start pt-20' : 'items-center justify-center'} relative`}
      >
        {user ? (
          <div className="w-full flex flex-col items-start">
            <div className="w-full px-10 grid grid-cols-5 gap-4">
              {models.map((m) => {
                return (
                  <MyProject
                    model={m}
                    setShowCad={setShowCad}
                    deleteModel={deleteModel}
                  />
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
  );
};

export default Dashboard;
