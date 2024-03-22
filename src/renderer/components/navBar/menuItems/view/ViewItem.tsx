import React, { Fragment } from 'react';
import { Popover, Switch, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from '../../NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, openSidebar, sidebarVisibilitySelector } from '../../../sideBar/sidebarSlice';
import { binaryOpToolbarVisibilitySelector, closeBinaryOperationsToolbar, openBinaryOperationsToolbar } from '../../../binaryOperationsToolbar/binaryOperationsToolbarSlice';
import { closeTransformationsToolbar, openTransformationsToolbar, transformationsToolbarVisibilitySelector } from '../../../transformationsToolbar/toolbarTransformationSlice';
import { closeMiscToolbar, miscToolbarVisibilitySelector, openMiscToolbar } from '../../../miscToolbar/miscToolbarSlice';
import { closeShapesToolbar, openShapesToolbar, shapesToolbarVisibilitySelector } from '../shapes/shapesToolbarSlice';
import { resetFocusToScene } from './viewItemSlice';

interface ViewItemProps {
}

export const ViewItem: React.FC<ViewItemProps> = () => {
    const dispatch = useDispatch()
    const sideBarChecked = useSelector(sidebarVisibilitySelector)
    const binaryOperationsToolbarChecked = useSelector(binaryOpToolbarVisibilitySelector)
    const transformationsToolbarChecked = useSelector(transformationsToolbarVisibilitySelector)
    const miscToolbarChecked = useSelector(miscToolbarVisibilitySelector)
    const shapesToolbarChecked = useSelector(shapesToolbarVisibilitySelector)
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={classNames(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900'
                        )}
                    >
                        <span>View</span>
                        <ChevronDownIcon
                            className={classNames(
                                open ? 'text-gray-600' : 'text-gray-400',
                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                            )}
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
                        <Popover.Panel
                            className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                            <div
                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    <span>
                                        <div id="viewDropdown">
                                            <div className="flex justify-between">
                                                <span className="text-gray-900 text-base font-medium">Object Details</span>
                                                <p className="text-base font-medium text-gray-300">Ctrl + D</p>
                                                <div>
                                                    <Switch
                                                        checked={sideBarChecked}
                                                        onChange={(checked: boolean) => (checked) ? dispatch(openSidebar()) : dispatch(closeSidebar())}
                                                        className={`${sideBarChecked ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={`${sideBarChecked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                        />
                                                    </Switch>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    <span>
                                        <div id="viewDropdown">
                                            <div className="flex justify-between">
                                                <span className="text-gray-900 text-base font-medium">Binary operations toolbar</span>
                                                {/* <p className="text-base font-medium text-gray-300">Ctrl + D</p> */}
                                                <div>
                                                    <Switch
                                                        checked={binaryOperationsToolbarChecked}
                                                        onChange={(checked: boolean) => (checked) ? dispatch(openBinaryOperationsToolbar()) : dispatch(closeBinaryOperationsToolbar())}
                                                        className={`${binaryOperationsToolbarChecked ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={`${binaryOperationsToolbarChecked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                        />
                                                    </Switch>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    <span>
                                        <div id="viewDropdown">
                                            <div className="flex justify-between">
                                                <span className="text-gray-900 text-base font-medium">Misc toolbar</span>
                                                {/* <p className="text-base font-medium text-gray-300">Ctrl + D</p> */}
                                                <div>
                                                    <Switch
                                                        checked={miscToolbarChecked}
                                                        onChange={(checked: boolean) => (checked) ? dispatch(openMiscToolbar()) : dispatch(closeMiscToolbar())}
                                                        className={`${miscToolbarChecked ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={`${miscToolbarChecked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                        />
                                                    </Switch>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    <span>
                                        <div id="viewDropdown">
                                            <div className="flex justify-between">
                                                <span className="text-gray-900 text-base font-medium">Transformations toolbar</span>
                                                {/* <p className="text-base font-medium text-gray-300">Ctrl + D</p> */}
                                                <div>
                                                    <Switch
                                                        checked={transformationsToolbarChecked}
                                                        onChange={(checked: boolean) => (checked) ? dispatch(openTransformationsToolbar()) : dispatch(closeTransformationsToolbar())}
                                                        className={`${transformationsToolbarChecked ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={`${transformationsToolbarChecked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                        />
                                                    </Switch>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    <span >
                                        <div id="viewDropdown">
                                            <div className="flex justify-between">
                                                <span className="text-gray-900 text-base font-medium">Shapes toolbar</span>
                                                {/* <p className="text-base font-medium text-gray-300">Ctrl + D</p> */}
                                                <div>
                                                    <Switch
                                                        checked={shapesToolbarChecked}
                                                        onChange={(checked: boolean) => (checked) ? dispatch(openShapesToolbar()) : dispatch(closeShapesToolbar())}
                                                        className={`${shapesToolbarChecked ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={`${shapesToolbarChecked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                        />
                                                    </Switch>
                                                </div>

                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    <span>
                                        <div id="viewDropdown">
                                            <div className="flex justify-between cursor-pointer"
                                                onClick={() => {
                                                    dispatch(resetFocusToScene());
                                                }}
                                            >
                                                <span className="text-gray-900 text-base font-medium">Reset Focus To Whole Scene</span>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )

}