import React, { FC, Fragment } from 'react';
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { baseShapes, useAddToTheSceneANewShape } from './useAddToTheSceneANewShape';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const Shapes: FC = () => {
    const { addToTheSceneANew, iconForA } = useAddToTheSceneANewShape()
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                  <Popover.Button
                    className="group inline-flex items-center rounded-md bg-white text-base text-black font-medium hover:text-gray-900"
                  >
                    <span>Shapes</span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-black group-hover:text-gray-500"
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
                            className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                            <div
                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    {baseShapes.map(shape =>
                                        <div onClick={() => { addToTheSceneANew(shape) }} key={shape}>
                                            <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                                                <img src={iconForA(shape)} alt={"Add " + shape} className="mr-5 w-[15px]" />
                                                <span className="text-gray-900 text-base font-medium">{shape}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
