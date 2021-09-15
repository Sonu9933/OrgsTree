import { ActionTypes } from "./ActionTypes";

export const AppReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case ActionTypes.UPDATE:
      return {
        ...state,
        organization: payload.orgData,
        isValid: true,
        jsonUpdate: payload.jsonUpdate,
      };

    case ActionTypes.UPDATE_JSONDATA:
      return {
        ...state,
        jsonData: payload.data,
        jsonUpdate: payload.jsonUpdate,
      };

    case ActionTypes.ERROR:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return {
        ...state,
        error: true,
      };
  }
};
