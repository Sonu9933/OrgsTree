import { AppReducer } from "./Reducer";
import { ActionTypes } from "./ActionTypes";

describe("Reducer Test Cases", () => {
  test("UPDATE_JSONDATA Action", () => {
    const state = { jsonData: {}, isValid: false, jsonUpdate: false };

    const action = {
      type: ActionTypes.UPDATE_JSONDATA,
      payload: { data: {}, jsonUpdate: true },
    };

    const result = AppReducer(state, action);
    expect(result.jsonUpdate).toEqual(true);
    expect(result.isValid).toEqual(false);
  });
  test("UPDATE Action", () => {
    const state = { organization: [], isValid: false };
    let orgGraphData = [];
    orgGraphData.push(1);

    const action = {
      type: ActionTypes.UPDATE,
      payload: { orgData: orgGraphData, isValid: true },
    };

    const result = AppReducer(state, action);
    expect(result.organization.length).toEqual(1);
  });

  test("Error Action", () => {
    const state = { isValid: false, error: false };

    const action = {
      type: ActionTypes.ERROR,
      payload: {
        error: true,
      },
    };

    const result = AppReducer(state, action);
    expect(result.error).toEqual(true);
    expect(result.isValid).toEqual(false);
  });
});
