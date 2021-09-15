import React, { useContext } from "react";
import { OrganizationContext } from "../Context/Context";
import { ActionTypes } from "../Context/ActionTypes";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const UpdateOrg = () => {
  const { state, dispatch } = useContext(OrganizationContext);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        dispatch({
          type: ActionTypes.ERROR,
          payload: {
            error: true,
          },
        });
      } else if (
        acceptedFiles[0].path
          .substr(acceptedFiles[0].path.lastIndexOf("\\") + 1)
          .split(".")[0] !== "json"
      ) {
        dispatch({
          type: ActionTypes.ERROR,
          payload: {
            error: true,
          },
        });
      } else {
        acceptedFiles.forEach((file: any) => {
          const reader = new FileReader();

          reader.onabort = () =>
            dispatch({
              type: ActionTypes.ERROR,
              payload: {
                error: true,
              },
            });
          reader.onerror = () =>
            dispatch({
              type: ActionTypes.ERROR,
              payload: {
                error: true,
              },
            });
          reader.onload = () => {
            const binaryStr = reader.result;
            dispatch({
              type: ActionTypes.UPDATE_JSONDATA,
              payload: { data: binaryStr, jsonUpdate: true },
            });
          };
          reader.readAsText(file);
        });
      }
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { jsonUpdate, error } = { ...state };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
          <h1 className="text-center display-4 py-2 text-truncate text-primary">
            <b className="b1">Upload JSON here!!</b>
          </h1>
        </div>
      </div>
      {!error ? (
        <>
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-10 mx-auto text-center form p-4">
              {jsonUpdate ? (
                <h4 className="display-4 py-2 text-success">
                  JSON uploded successfully!! Click on GoTo Home link to update
                  organization chart
                </h4>
              ) : (
                <h4 className="display-4 py-2 border border-primary text-info rounded">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    Drag 'n' drop some files here, or click to select files
                  </div>
                </h4>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
              Go back to Home
              <b>
                <Link to="/" className="Info link px-2">
                  Goto Home
                </Link>
              </b>
            </div>
          </div>
        </>
      ) : (
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
            <b>
              Oops you cant upload more than 1 file or file is not in json
              format!!!
              <Link to="/" className="Danger link px-2">
                click here ToGo Home
              </Link>
            </b>
          </div>
        </div>
      )}
    </div>
  );
};
