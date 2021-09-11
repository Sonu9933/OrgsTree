import React from "react";
import { UpdateOrg } from "./UpdateOrg";
import { renderWithContext } from "../Test/TestHelper";
describe("Update Org", () => {
  test("Should render UpdateOrg", () => {
    const component = renderWithContext(<UpdateOrg />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
