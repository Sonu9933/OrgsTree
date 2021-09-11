import { useContext, useEffect } from "react";
import { OrganizationContext } from "../Context/Context";
import { Link } from "react-router-dom";
import { ActionTypes } from "../Context/ActionTypes";
import axios from "axios";
import Collapsible from "react-collapsible";
const orgGraphData: any[] = [];
const reg = new RegExp("^[0-9]+$");

const traverseJSON = (data: any) => {
  for (let k in data) {
    if (data[k] instanceof Object) {
      if (
        !reg.test(Object.keys(data).toString()) &&
        Object.keys(data).length <= 1
      ) {
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

  orgData.map((data: any, i: any) => {
    if (data.element === "<ul>") {
      element += "<ul>";
    } else if (data.element === "<li>") {
      element += `<li>
      <span className="node bold">${orgData[i].name} - ${orgData[i].position}</span>
    </li>`;
    }
  });
  return element;
};

export const ViewOrg = () => {
  const { state, dispatch } = useContext(OrganizationContext);
  const { organization, jsonData } = { ...state };

  useEffect(() => {
    if (organization.length === 0) {
      axios
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
        });
    } else {
      traverseJSON(jsonData);
      dispatch({
        type: ActionTypes.UPDATE,
        payload: { orgData: orgGraphData, jsonUpdate: false },
      });
      dispatch({
        type: ActionTypes.ERROR,
        payload: {
          error: false,
        },
      });
    }
  }, []);

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center">
            <h1 className="text-center display-4 py-2 text-truncate text-primary text-underline">
              <b>Organization Chart</b>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-10 mx-auto">
            <p className="mx-auto text-center Info link ">
              <b>
                {" "}
                Below data is based on the date received from end point
                (https://jsonkeeper.com/b/OGAU). To update the it, please upload
                new json by clicking on Upload JSON link{" "}
              </b>
            </p>
            <div
              className="p-4 rounded"
              style={{ minHeight: 200, border: "1px solid black" }}
            >
              <Collapsible trigger="Click to view">
                <ul
                  id="org-tree"
                  dangerouslySetInnerHTML={{
                    __html: getTreeStructure(organization),
                  }}
                />
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
          Click here to Update hierarchy :
          <b>
            <Link to="/UpdateOrg" className="px-2">
              Upload JSON
            </Link>
          </b>
        </div>
      </div>
    </>
  );
};
