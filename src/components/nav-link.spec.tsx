// Teste unitario para o componente NavLink

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { NavLink } from "./nav-link";

describe("NavLink", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
          );
        },
      },
    );

    // verifica se o wrapper que possui o texto About possui um data current = true
    expect(wrapper.getByText("About").dataset.current).toEqual("true");
    expect(wrapper.getByText("Home").dataset.current).toEqual("false");
  });
});
