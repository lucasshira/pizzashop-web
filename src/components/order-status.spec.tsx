// teste unitario do componente OrderStatus
// icone do React laranja indica que eh um teste

import { render } from "@testing-library/react";

import { OrderStatus } from "./order-status";

const renderOrderStatus = (status: OrderStatus) =>
  render(<OrderStatus status={status} />);

// describe serve para CATEGORIZAR os testes: para informar que estamos testando a msm unidade de codigo
describe("Order Status", () => {
  // isso deve mostrar... essa seria a semantica (um caso especifico de teste)
  // Cada it deve conter uma única asserção ou um conjunto lógico de asserções para o comportamento esperado
  it("should display the right text when order status is pending", () => {
    // pending
    const wrapper = renderOrderStatus("pending");

    const statusText = wrapper.getByText("Pendente");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-slate-400");
  });

  // canceled
  it("should display the right text when order status is canceled", () => {
    const wrapper = renderOrderStatus("canceled");

    const statusText = wrapper.getByText("Cancelado");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-rose-500");
  });

  // delivering
  it("should display the right text when order status is delivering", () => {
    const wrapper = renderOrderStatus("delivering");

    const statusText = wrapper.getByText("Em entrega");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  // processing
  it("should display the right text when order status is processing", () => {
    const wrapper = renderOrderStatus("processing");

    const statusText = wrapper.getByText("Em preparo");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-amber-500");
  });

  // delivered
  it("should display the right text when order status is delivered", () => {
    const wrapper = renderOrderStatus("delivered");

    const statusText = wrapper.getByText("Entregue");
    const badgeElement = wrapper.getByTestId("badge");

    expect(statusText).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-emerald-500");
  });
});

// diferenca entre os 3 metodos do wrapper = getByText, findByText, queryByText
// find = retorna uma promise
// get = retorna um erro se nao encontrar
// query = retorna null se nao encontrar
