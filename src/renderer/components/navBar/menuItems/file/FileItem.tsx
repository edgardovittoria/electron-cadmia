import React, { Fragment, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
	ArrowDownTrayIcon,
	ArrowUpTrayIcon,
	ChevronDownIcon,
	CloudArrowDownIcon,
	CloudArrowUpIcon,
} from "@heroicons/react/20/solid";
import {
	addComponent,
	BufferGeometryAttributes,
	CanvasState,
	canvasStateSelector,
	ComponentEntity,
	componentseSelector,
	exportToSTL,
	getNewKeys,
	ImportActionParamsObject,
	ImportCadProjectButton,
	ImportModelFromDBModal,
	importStateCanvas,
	numberOfGeneratedKeySelector,
	TRANSF_PARAMS_DEFAULTS,
} from "cad-library";
import { useDispatch, useSelector } from "react-redux";
import { SaveModelWithNameModal } from "./components/saveModelWithNameModal";
import { useAuth0 } from "@auth0/auth0-react";
import { classNames } from "../../NavBar";
import { s3 } from "./components/s3Config";
import { setUnit } from "../../../statusBar/statusBarSlice";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Vector3 } from "three";
import { Dispatch } from "@reduxjs/toolkit";

interface FileItemProps {
}

export const exportJSONProject = (canvas: CanvasState) => {
	const link = document.createElement("a");
	link.href = `data:application/json;charset=utf-8,${encodeURIComponent(
		JSON.stringify(canvas)
	)}`;
	link.download = "project.json";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const exportToSTLFormat = (components: ComponentEntity[]) => {
	const link = document.createElement("a");
	link.href = `data:model/stl;charset=utf-8,${encodeURIComponent(
		exportToSTL(components)
	)}`;
	link.download = "model.stl";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const FileItem: React.FC<FileItemProps> = () => {
	const dispatch = useDispatch();
	const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
	const canvasState = useSelector(canvasStateSelector);
	const entities = useSelector(componentseSelector);
    const [modalSave, setModalSave] = useState(false);
    const [modalLoad, setModalLoad] = useState(false);
	const {isAuthenticated} = useAuth0()

	const inputRefSTL = useRef(null);
	const onImportSTLClick = () => {
		let input = inputRefSTL.current;
		if (input) {
			(input as HTMLInputElement).click();
		}
	};

	const importFromCadSTL = (STLFile: File, numberOfGeneratedKey: number, dispatch: Dispatch) => {
		let loader = new STLLoader();
	
		STLFile.arrayBuffer().then((value) => {
			let res = loader.parse(value);
			res.computeBoundingBox()
			let center = new Vector3()
			res.boundingBox?.getCenter(center)
			res.center()
			let entity: ComponentEntity = {
				type: 'BUFFER',
				name: 'BUFFER',
				keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
				orbitEnabled: true,
				transformationParams: {...TRANSF_PARAMS_DEFAULTS, position: [center.x, center.y, center.z]},
				previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
				geometryAttributes: {
					positionVertices: res.attributes.position.array,
					normalVertices: res.attributes.normal.array,
					uvVertices: undefined
				} as BufferGeometryAttributes,
				transparency: true,
				opacity: 1
			}
			dispatch(addComponent(entity))
		})
	}
	

	return (
		<>
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							className={classNames(
								open ? "text-gray-900" : "text-gray-500",
								"group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900"
							)}>
							<span>File</span>
							<ChevronDownIcon
								className={classNames(
									open ? "text-gray-600" : "text-gray-400",
									"ml-2 h-5 w-5 group-hover:text-gray-500"
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
							leaveTo="opacity-0 translate-y-1">
							<Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
								<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
										{isAuthenticated ? (
											<span
												className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
												onClick={() => setModalSave(true)}>
												<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
													<div className="flex">
														<CloudArrowDownIcon className="w-[20px] mr-4" />
														<p className="text-base font-medium text-gray-900">
															Save To DB
														</p>
													</div>
													{/*<p className="text-base font-medium text-gray-300">Ctrl + S</p>*/}
												</div>
											</span>
										) : (
											<span className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50">
												<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
													<div className="flex">
														<CloudArrowDownIcon className="w-[20px] mr-4 text-gray-300" />
														<p className="text-base font-medium text-gray-300">
															Save To DB
														</p>
													</div>
													{/*<p className="text-base font-medium text-gray-300">Ctrl + S</p>*/}
												</div>
											</span>
										)}
										{isAuthenticated ? (
											<span
												className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
												onClick={() => setModalLoad(true)}>
												<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
													<div className="flex">
														<CloudArrowUpIcon className="w-[20px] mr-4" />
														<p className="text-base font-medium text-gray-900">
															Load From DB
														</p>
													</div>
													{/*<p className="text-base font-medium text-gray-300">Ctrl + S</p>*/}
												</div>
											</span>
										) : (
											<span className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50">
												<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
													<div className="flex">
														<CloudArrowUpIcon className="w-[20px] mr-4 text-gray-300" />
														<p className="text-base font-medium text-gray-300">
															Load From DB
														</p>
													</div>
													{/*<p className="text-base font-medium text-gray-300">Ctrl + S</p>*/}
												</div>
											</span>
										)}
										<ImportCadProjectButton
											className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
											actionParams={{} as ImportActionParamsObject}
											importAction={importStateCanvas}>
											<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
												<div className="flex">
													<ArrowDownTrayIcon className="w-[20px] mr-4" />
													<p className="text-base font-medium text-gray-900">
														Import Project
													</p>
												</div>
												{/*<p className="text-base font-medium text-gray-300">Ctrl + S</p>*/}
											</div>
										</ImportCadProjectButton>
										<div
											className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
											onClick={onImportSTLClick}>
											<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
												<div className="flex">
													<ArrowDownTrayIcon className="w-[20px] mr-4" />
													<p className="text-base font-medium text-gray-900">
														Import STL File
													</p>
												</div>
												{/*<p className="text-base font-medium text-gray-300">Ctrl + S</p>*/}
											</div>
											<input
												type="file"
												ref={inputRefSTL}
												style={{ display: "none" }}
												accept=".stl"
												onChange={(e) => {
													let STLFiles = e.target.files;
													STLFiles &&
														importFromCadSTL(
															STLFiles[0],
															numberOfGeneratedKey,
															dispatch
														);
												}}
											/>
										</div>
										<span
											className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
											onClick={() => {
												exportJSONProject(canvasState);
											}}>
											<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
												<div className="flex">
													<ArrowUpTrayIcon className="w-[20px] mr-4" />
													<p className="text-base font-medium text-gray-900">
														Export Project
													</p>
												</div>
												<p className="text-base font-medium text-gray-300">
													Ctrl + S
												</p>
											</div>
										</span>
										<span
											className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
											onClick={() => {
												exportToSTLFormat(entities);
											}}>
											<div className="ml-4 flex justify-between w-full hover:cursor-pointer">
												<div className="flex">
													<ArrowUpTrayIcon className="w-[20px] mr-4" />
													<p className="text-base font-medium text-gray-900">
														Export STL Format
													</p>
												</div>
												<p className="text-base font-medium text-gray-300">
													Ctrl + Alt + S
												</p>
											</div>
										</span>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
            {modalSave && <SaveModelWithNameModal showModalSave={setModalSave}/>}
            {modalLoad && (
                        <ImportModelFromDBModal
                            s3Config={s3}
                            bucket={process.env.REACT_APP_AWS_BUCKET_NAME as string}
                            showModalLoad={setModalLoad}
                            importAction={(importActionParams: ImportActionParamsObject) => {
								dispatch(importStateCanvas(importActionParams))
								dispatch(setUnit(importActionParams.unit))
							}}
                            importActionParams={
                                {
                                    canvas: {
                                        numberOfGeneratedKey: 0,
                                        components: [],
                                        lastActionType: "",
                                        selectedComponentKey: 0,
                                    } as CanvasState,
									unit: 'mm'
                                } as ImportActionParamsObject
                            }
                        />
                    )}

		</>
	);
};
