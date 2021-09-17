/* eslint-disable array-callback-return */
//import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { OrganizationContext } from "../Context/Context";
import { ActionTypes } from "../Context/ActionTypes";
const mockData = require("../MockJSON/mockOrg.json");
const reg = new RegExp("^[0-9]+$");
let isLoaded: boolean = false;
let orgGraphData: any[] = [];
let uniqeName: any[] = [];

const traverseJSON = (data: any) => {
  for (let k in data) {
    if (data[k] instanceof Object) {
      if (
        !reg.test(Object.keys(data).toString()) &&
        Object.keys(data).length <= 1
      ) {
        uniqeName.push(Object.keys(data).toString());
        orgGraphData.push({
          name: Object.keys(data).toString(),
          position: data[k].position,
          element: "<li>",
        });
        orgGraphData.push({
          element: "<ul>",
        });
      } else {
        traverseJSON(data[k]);
      }
      traverseJSON(data[k].employees);
    } else {
      if (data instanceof Object) {
        uniqeName.push(data.name);
        orgGraphData.push({
          name: data.name,
          position: data.position,
          element: "<li>",
        });
        data++;
      }
    }
  }
};

const getTreeStructure = (orgData: any) => {
  let element: string = "";
  isLoaded = false;
  orgData.map((data: any, i: any) => {
    if (data.element === "<ul>") {
      element += "<ul class='nested'>";
    } else if (data.element === "<li>") {
      element += `<li class="caret">
        <span>${orgData[i].name} - ${orgData[i].position}</span>
      </li>`;
    }
  });

  return element;
};

const checkLoops = (employeeName: any[]) =>
  employeeName.filter(
    (item: any, index: any) => employeeName.indexOf(item) !== index
  );

export const ViewOrg = () => {
  const { state, dispatch } = useContext(OrganizationContext);
  const { organization, jsonData, duplicateFound } = { ...state };

  useEffect(() => {
    if (organization.length === 0) {
      traverseJSON(mockData);
      dispatch({
        type: ActionTypes.UPDATE_JSONDATA,
        payload: { data: mockData, jsonUpdate: false },
      });
      dispatch({
        type: ActionTypes.UPDATE,
        payload: { orgData: orgGraphData, jsonUpdate: false },
      });
      /*axios
          .get("https://jsonkeeper.com/b/OGAU")
          .then((response) => {
            traverseJSON(response.data);
            dispatch({
              type: ActionTypes.UPDATE_JSONDATA,
              payload: { data: response.data, jsonUpdate: false },
            });
            dispatch({
              type: ActionTypes.UPDATE,
              payload: { orgData: orgGraphData, jsonUpdate: false },
            });
          })
          .catch(() => {
            dispatch({
              type: ActionTypes.ERROR,
              payload: {
                error: true,
              },
            });
          });*/
    } else {
      if (state.jsonUpdate) {
        orgGraphData = [];
        uniqeName = [];
        traverseJSON(JSON.parse(jsonData));
        dispatch({
          type: ActionTypes.UPDATE,
          payload: { orgData: orgGraphData, jsonUpdate: false },
        });
      }
      dispatch({
        type: ActionTypes.ERROR,
        payload: {
          error: false,
        },
      });
    }

    //check loops & multiple “managers”
    if ([...new Set(checkLoops(uniqeName))].length > 0) {
      dispatch({
        type: ActionTypes.DUPLICATE,
        payload: {
          duplicate: true,
        },
      });
    } else {
      dispatch({
        type: ActionTypes.DUPLICATE,
        payload: {
          duplicate: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      const toggler = document.getElementsByTagName("li");
      for (let i = 0; i < toggler.length; i++) {
        isLoaded = true;
        toggler[i].addEventListener("click", function () {
          toggler[i]?.parentElement
            ?.querySelector(".nested")
            ?.classList.toggle("active");
          toggler[i]?.classList.toggle("caret-down");
        });
      }
    }
  });

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center">
            <h1 className="text-center display-4 py-2 text-truncate text-primary text-underline">
              <b className="b1">Organization Chart</b>
            </h1>
          </div>
        </div>
        {duplicateFound ? (
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-10 mx-auto">
              <p className="mx-auto text-center text-danger">
                <b className="b2">
                  Oops!!! Loops or multiple “managers” detected due to{" "}
                  {[...new Set(checkLoops(uniqeName))][0]}
                </b>
              </p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-10 mx-auto">
              <p className="mx-auto text-center Info link ">
                <b className="b2">
                  Below data is based on the date received from end point
                  (https://jsonkeeper.com/b/OGAU). To update the it, please
                  upload new json by clicking on Upload JSON link
                </b>
              </p>
              <div
                className="p-4 rounded"
                style={{ minHeight: 200, border: "1px solid black" }}
              >
                <ul
                  id="org-tree"
                  dangerouslySetInnerHTML={{
                    __html: getTreeStructure(organization),
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
          Update hierarchy :
          <b>
            <Link to="/UpdateOrg" className="px-2">
              Upload JSON
            </Link>
          </b>{" "}
        </div>
      </div>
    </>
  );
};
