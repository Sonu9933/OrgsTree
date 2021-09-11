import React, { ReactNode, createContext, useReducer } from "react";
import { AppReducer } from "./Reducer";
import { InitialState } from "./InitialState";

interface OrganizationContextType {
  organization: any;
  jsonData: any;
  error: boolean;
  isValid: boolean;
  jsonUpdate: boolean;
}

interface IProps {
  children: ReactNode;
}

export const OrganizationContext = createContext<{
  state: OrganizationContextType;
  dispatch: React.Dispatch<any>;
}>({ state: InitialState, dispatch: () => ({}) });

export const OrganizationContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AppReducer, InitialState);

  return (
    <OrganizationContext.Provider value={{ state, dispatch }}>
      {children}
    </OrganizationContext.Provider>
  );
};
