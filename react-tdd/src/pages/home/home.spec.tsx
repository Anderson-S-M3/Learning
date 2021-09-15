import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { mockCepApiSucess, mockCepApiErro } from "./mock";
import Home from ".";

const CEP_INVALID = "12345678";
const handles = [
  rest.get(`https://viacep.com.br/ws/${CEP_INVALID}/json/`, mockCepApiErro),
  rest.get("https://viacep.com.br/ws/*/json/", mockCepApiSucess),
];

const server = setupServer(...handles);
describe("<Home />", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it("should write something in the input and response on click button", async () => {
    render(<Home />);
    expect.assertions(3);

    expect(screen.queryByTestId(/responseAPICEP/i)).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText("Digite um CEP");
    const value = "35588000";

    userEvent.type(input, value);
    expect(input).toHaveValue(value);

    userEvent.click(screen.getByRole("button", { name: /Consultar/i }));
    expect(await screen.findByTestId(/responseAPICEP/i)).toBeInTheDocument();
  });

  it("should render response error TYPE ERROR and INVALID CEP", async () => {
    render(<Home />);

    expect.assertions(3);

    let value = "abc";
    const input = screen.getByPlaceholderText("Digite um CEP");

    userEvent.type(input, value);

    userEvent.click(screen.getByRole("button", { name: /Consultar/i }));
    expect(
      await screen.findByText(/DIGITE APENAS NÚMEROS/i)
    ).toBeInTheDocument();

    value = "1234567";
    userEvent.clear(input);
    userEvent.type(input, value);

    userEvent.click(screen.getByRole("button", { name: /Consultar/i }));
    expect(
      await screen.findByText(/DIGITE O CEP CORRETAMENTE/i)
    ).toBeInTheDocument();

    userEvent.clear(input);
    userEvent.type(input, CEP_INVALID);

    userEvent.click(screen.getByRole("button", { name: /Consultar/i }));
    expect(await screen.findByText(/CEP INVALIDO/i)).toBeInTheDocument();
  });
});
