// import React from 'react'
// import { render, screen, cleanup } from "@testing-library/react"
// import userEvent from "@testing-library/user-event";
// import { Login } from "../containers/Login"

// import { rest } from "msw";
// import { setupServer } from "msw/node";

// // const server = setupServer(
// //   rest.post("http://localhost:3000/api/v1/login", (req, res, ctx) => {
// //     return res(ctx.status(200), ctx.json(
// //       {
// //         logged_in: true,
// //         user: {
// //           user_id: 1
// //         }
// //       }
// //     ));
// //   })
// // );

// // beforeAll(() => server.listen());
// // afterEach(() => {
// //   server.resetHandlers();
// //   cleanup();
// // });
// // afterAll(() => server.close());

// // afterEach(() => cleanup());

// describe("Rendering", () => {
//   it("Should render all elements correctly", () => {
//     // render(<Login />)
//     // expect(screen.getByRole("heading")).toBeTruthy();
//     // expect(screen.getByPlaceholderText("email")).toBeTruthy();
//     // expect(screen.getByPlaceholderText("password")).toBeTruthy();
//     // expect(screen.getByDisplayValue("ログイン")).toBeTruthy();
    
//   })
// })
// // describe("Input form onChange event", () => {
// //   it("Should update email input value correctly", () => {
// //     render(<Login />)
// //     const inputValue = screen.getByPlaceholderText("email");
// //     userEvent.type(inputValue, "test");
// //     expect(inputValue.value).toBe("test");
// //   })
// //   it("Should update password input value correctly", () => {
// //     render(<Login />)
// //     const inputValue = screen.getByPlaceholderText("password");
// //     userEvent.type(inputValue, "1234");
// //     expect(inputValue.value).toBe("1234");
// //   })
// // })
// // describe("Check for errors before fetch API", () => {
// //   it("Should email pattern error", () => {
// //     render(<Login />)
// //     const inputValue = screen.getByPlaceholderText("email");
// //     userEvent.type(inputValue, "m230549@gmail.com");
// //     expect(inputValue.value).toMatch(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
// //   })
// //   it("Should password space error",async() => {
// //     render(<Login />)
// //     userEvent.click(screen.getByDisplayValue("ログイン"))
// //     await expect(screen.findByText("パスワードは必須です")).toBeTruthy();
// //     await expect(screen.findByText("emailは必須です")).toBeTruthy();
// //   })
// //   it("Should password format error",async() => {
// //     render(<Login />)
// //     const inputPassword = screen.getByPlaceholderText("password");
// //     const inputEmail = screen.getByPlaceholderText("email");
// //     userEvent.type(inputPassword, "123");
// //     userEvent.type(inputEmail, "aaaa@");
// //     userEvent.click(screen.getByDisplayValue("ログイン"))
// //     expect(screen.findByText("パスワードは4文字以上です")).toBeTruthy();
// //     expect(screen.findByText("正しく入力して下さい")).toBeTruthy();
// //   })
// // })
