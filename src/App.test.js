import { render, screen } from "@testing-library/react";
import App from "./App";
import { OrganizationContextProvider } from "./Components/Context/Context";

test("App Render Test", () => {
  render(
    <OrganizationContextProvider>
      <App />
    </OrganizationContextProvider>
  );

  const heading = screen.getByText(/Organization Chart/i);
  expect(heading).toBeInTheDocument();
});
