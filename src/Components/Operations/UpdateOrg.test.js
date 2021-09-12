import React from "react";
import { UpdateOrg } from "./UpdateOrg";
import { renderWithContext } from "../Test/TestHelper";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("Update Org", () => {
  test("Should render UpdateOrg", () => {
    const component = renderWithContext(
      <BrowserRouter>
        <UpdateOrg />
      </BrowserRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Check render elements UpdateOrg", () => {
    const { container } = render(
      <BrowserRouter>
        <UpdateOrg />
      </BrowserRouter>
    );

    const containerClass = container.querySelector(".container");
    expect(containerClass).toBeDefined();
  });

  test("Check UpdateOrg content", () => {
    const component = renderWithContext(
      <BrowserRouter>
        <UpdateOrg />
      </BrowserRouter>
    );

    const valueElement = component.root.find(
      (el) => el.type === "b" && el.props.className === "b1"
    );

    console.log(valueElement.props);

    expect(valueElement.props.children).toEqual("Upload JSON here!!");
  });
});
