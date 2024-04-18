import React from 'react';
import { Popover } from '@headlessui/react';
import { MdDashboard } from 'react-icons/md';
import { FileItem } from './menuItems/file/FileItem';
import { ViewItem } from './menuItems/view/ViewItem';
import { EditItem } from './menuItems/edit/EditItem';
import { Shapes } from './menuItems/shapes/shapes';
import { LoginLogout } from './menuItems/loginLogout';
import { useAuth0 } from '@auth0/auth0-react';

interface NavbarProps {
  setShowCad: (v: boolean) => void;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar: React.FC<NavbarProps> = ({ setShowCad }) => {

  const { user } = useAuth0()

  return (
    <Popover className="relative bg-white h-[4vh]">
      <div className="mx-auto w-full h-full px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex justify-start w-0 flex-1 items-center gap-5">
            <span className="text-2xl font-semibold">CADmIA</span>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <FileItem />
            <ViewItem />
            <EditItem />
            <Shapes />
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <div
              className="flex flex-row items-center gap-2 px-2 py-1 rounded-xl hover:bg-black hover:text-white hover:cursor-pointer"
              onClick={() => setShowCad(false)}
            >
              <MdDashboard size={25} />
              <span className="font-semibold">{user?.nickname}&apos;s Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};
