import { Dispatch } from '@reduxjs/toolkit';
import {
  CanvasState,
  ComponentEntity,
  ImportActionParamsObject,
  importStateCanvas,
} from 'cad-library';
import { s3 } from '../../canvas/components/navBar/menuItems/file/components/s3Config';
import { setUnit } from '../../canvas/components/statusBar/statusBarSlice';
import { s3Config } from './s3Config';
import ReactS3Client from 'react-aws-s3-typescript';

export const openModel = (
  bucket: string,
  fileKey: string,
  dispatch: Dispatch,
  setShowCad: (v: boolean) => void,
) => {
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
    });
  } catch (exception) {
    console.log(exception);
  }
};

export const deleteFileS3 = async (key: string) => {
  const s3Client = new ReactS3Client(s3Config);
  try {
    return await s3Client.deleteFile(key);
  } catch (exception) {
    console.log(exception);
  }
}