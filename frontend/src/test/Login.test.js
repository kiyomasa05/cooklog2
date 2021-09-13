import React from 'react'
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Login } from "../containers/Login"

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:3000/api/v1/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ logged_in: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Should render all elements correctly", () => {
    render(<Login />)
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByPlaceholderText("email")).toBeTruthy();
    expect(screen.getByPlaceholderText("password")).toBeTruthy();
    expect(screen.getByDisplayValue("ログイン")).toBeTruthy();
    
  })
})
describe("Input form onChange event", () => {
  it("Should update email input value correctly", () => {
    render(<Login />)
    const inputValue = screen.getByPlaceholderText("email");
    userEvent.type(inputValue, "test");
    expect(inputValue.value).toBe("test");
  })
  it("Should update password input value correctly", () => {
    render(<Login />)
    const inputValue = screen.getByPlaceholderText("password");
    userEvent.type(inputValue, "1234");
    expect(inputValue.value).toBe("1234");
  })
  //次はエラーのテスト
  //apiへの送信テスト
})
describe("Check for errors before fetch API", () => {
  it("Should email pattern error", () => {
    render(<Login />)
    const inputValue = screen.getByPlaceholderText("email");
    userEvent.type(inputValue, "m230549@gmail.com");
    expect(inputValue.value).toMatch(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
  })
  it("Should password space error",() => {
    render(<Login />)
    userEvent.click(screen.getByDisplayValue("ログイン"))
    expect(screen.findByText("パスワードは必須です")).toBeTruthy();
    expect(screen.findByText("emailは必須です")).toBeTruthy();
  })
  it("Should password 桁数 error",() => {
    render(<Login />)
    const inputPassword = screen.getByPlaceholderText("password");
    userEvent.type(inputPassword, "123");
    userEvent.click(screen.getByDisplayValue("ログイン"))
    expect(screen.findByText("パスワードは4文字以上です")).toBeTruthy();
    // expect(screen.findByText("emailは必須です")).toBeTruthy();
  })
})
