import React from "react";
import {
  OrganizationContext,
  OrganizationContextProvider,
} from "../Context/Context";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

export const renderWithContext = (component: any, value: any) => {
  return value
    ? render(
        <OrganizationContext.Provider
          value={{
            dispatch: jest.fn(),
            ...value,
          }}
        >
          {component}
        </OrganizationContext.Provider>
      )
    : renderer.create(
        <OrganizationContextProvider>{component}</OrganizationContextProvider>
      );
};
