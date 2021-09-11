import React from "react";
import { ViewOrg } from "./ViewOrg";
import { renderWithContext } from "../Test/TestHelper";
describe("View Org", () => {
  test("Should render ViewOrg", () => {
    const component = renderWithContext(<ViewOrg />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
