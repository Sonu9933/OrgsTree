import React from "react";
import { ViewOrg } from "./ViewOrg";
import { renderWithContext } from "../Test/TestHelper";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("View Org", () => {
  test("Should render View Org", () => {
    const component = renderWithContext(
      <BrowserRouter>
        <ViewOrg />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toBeDefined();
  });

  test("Check render elements View org", () => {
    const { container } = render(
      <BrowserRouter>
        <ViewOrg />
      </BrowserRouter>
    );

    const containerClass = container.querySelector(".container");
    expect(containerClass).toBeDefined();
  });

  test("Check View Org content-1", () => {
    const component = renderWithContext(
      <BrowserRouter>
        <ViewOrg />
      </BrowserRouter>
    );

    const valueElement = component.root.find(
      (el) => el.type === "b" && el.props.className === "b1"
    );

    expect(valueElement.props.children).toEqual("Organization Chart");
  });

  test("Check View Org content-2", () => {
    const component = renderWithContext(
      <BrowserRouter>
        <ViewOrg />
      </BrowserRouter>
    );

    const valueElement = component.root.find(
      (el) => el.type === "b" && el.props.className === "b2"
    );

    expect(valueElement.props.children).toEqual(
      "Below data is based on the date received from end point (https://jsonkeeper.com/b/OGAU). To update the it, please upload new json by clicking on Upload JSON link"
    );
  });
});
