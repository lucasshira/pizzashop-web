// teste unitario do componente de paginação

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./pagination";

// const renderPagination = () =>
//   render(
//     <Pagination
//       pageIndex={0}
//       totalCount={200}
//       perPage={10}
//       onPageChange={() => {}}
//     />,
//   );

// spie para captar o evento
const onPageChangeCallback = vi.fn();

describe("Pagination", () => {
  // limpando chamadas entre os testes
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it("should display the right number of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("should be able to navigate to the next page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    // procurando por um botao onde o conteudo dela seja Proxima pagina
    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima página",
    });

    // clicando no botao para captar o evento
    await user.click(nextPageButton);

    // espero que nosso onPageChangeCallback tenha sido chamado com o parametro 1
    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it("should be able to navigate to the previous page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const previousPageButton = wrapper.getByRole("button", {
      name: "Página anterior",
    });

    await user.click(previousPageButton);

    // setei que estou na pagina 5, com o click da funcao acima irei testar se foi pra pagina 4
    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it("should be able to navigate to the first page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const firstPageButton = wrapper.getByRole("button", {
      name: "Primeira página",
    });

    await user.click(firstPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it("should be able to navigate to the last page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    const lastPageButton = wrapper.getByRole("button", {
      name: "Última página",
    });

    await user.click(lastPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});
