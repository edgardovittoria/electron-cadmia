import React, { FC, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  baseShapes,
  useAddToTheSceneANewShape,
} from './useAddToTheSceneANewShape';
import cubeIcon from './style/cube.png';
import cylinderIcon from './style/cylinder.png';
import coneIcon from './style/cone.png';
import sphereIcon from './style/sphere.png';
import torusIcon from './style/torus.png';
import { IoCubeOutline } from 'react-icons/io5';
import { BiCylinder } from 'react-icons/bi';
import { TbCone, TbSphere } from 'react-icons/tb';
import { GiRing } from 'react-icons/gi';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const iconForA = (shape: string) => {
  switch (shape) {
    case 'Cube':
      return <IoCubeOutline size={25} />;
    case 'Cylinder':
      return <BiCylinder size={25} />;
    case 'Cone':
      return <TbCone size={25} />;
    case 'Sphere':
      return <TbSphere size={25} />;
    case 'Torus':
      return <GiRing size={25} />;
    default:
      break;
  }
};

export const Shapes: FC = () => {
  const { addToTheSceneANew } = useAddToTheSceneANewShape();
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="group inline-flex items-center rounded-md bg-white text-base text-black font-medium p-1 hover:bg-black hover:text-white hover:cursor-pointer">
            <span>Shapes</span>
            <ChevronDownIcon
              className="ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {baseShapes.map((shape) => (
                    <div
                      onClick={() => {
                        addToTheSceneANew(shape);
                      }}
                      key={shape}
                    >
                      <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-black hover:text-white hover:cursor-pointer">
                        {/* <img
                          src={iconForA(shape)}
                          alt={`Add ${shape}`}
                          className="mr-5 w-[15px]"
                        /> */}
                        {iconForA(shape)}
                        <span className="text-base font-medium">
                          {shape}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
