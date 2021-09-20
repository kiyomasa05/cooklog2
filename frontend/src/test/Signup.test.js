import React from 'react'
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Signup } from "../containers/Signup"

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("http://localhost:3000/api/v1/signup", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(
      {
        logged_in: true,
      }
    ));
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
    render(<Signup />)
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByPlaceholderText("name")).toBeTruthy();
    expect(screen.getByPlaceholderText("email")).toBeTruthy();
    expect(screen.getByPlaceholderText("password")).toBeTruthy();
    expect(screen.getByPlaceholderText("password_cofirmation")).toBeTruthy();
    expect(screen.getByRole("img")).toBeTruthy();
    expect(screen.getByLabelText("アバター写真")).toBeTruthy();
    expect(screen.getByPlaceholderText("画像アップロード")).toBeTruthy();
    expect(screen.getByDisplayValue("新規登録")).toBeTruthy();
    
  })
})
describe("Input form onChange event", () => {
  it("Should update email input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("email");
    userEvent.type(inputValue, "test");
    expect(inputValue.value).toBe("test");
  })
  it("Should update password input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("password");
    userEvent.type(inputValue, "1234");
    expect(inputValue.value).toBe("1234");
  })
  it("Should update name input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("name");
    userEvent.type(inputValue, "aaaaa");
    expect(inputValue.value).toBe("aaaaa");
  })
  it("Should update password_confirmation input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("password_cofirmation");
    userEvent.type(inputValue, "aaaaa");
    expect(inputValue.value).toBe("aaaaa");
  })
})
describe('FileUploadField', () => {
  it('should not show preview if no image has been selected', () => {
    render(<Signup />)
    expect(screen.getByRole("img").src).toContain('https://via.placeholder.com/250');
  });
});
//アップロードテスト
describe('readFileAsDataURL()', () => {
  it('upload file', () => {
    const file = new File(['hello'], 'hello.png', {type: 'image/png'})
    render(<Signup />)
    
    const input = screen.getByLabelText("アバター写真")
    userEvent.upload(input, file)
    //定義ずみのfileをラベルを押してupload
  
    expect(input.files[0]).toStrictEqual(file)
    //構造が同じか確認
    expect(input.files.item(0)).toStrictEqual(file)
    expect(input.files).toHaveLength(1)
    //一つの画像か確認
    });
});
describe("Check for errors before fetch API", () => {
  it("Should password space error",async() => {
    render(<Signup />)
    userEvent.click(screen.getByDisplayValue("新規登録"))
    await expect(screen.findByText("名前は必須です")).toBeTruthy();
    await expect(screen.findByText("パスワードは必須です")).toBeTruthy();
    await expect(screen.findByText("emailは必須です")).toBeTruthy();
  })
  it("Should password format error",async() => {
    render(<Signup />)
    const inputName = screen.getByPlaceholderText("name");
    const inputPassword = screen.getByPlaceholderText("password");
    const inputEmail = screen.getByPlaceholderText("email");
    userEvent.type(inputName, `${"a"*51}`);
    userEvent.type(inputPassword, "123");
    userEvent.type(inputEmail, "aaaa@");
    userEvent.click(screen.getByDisplayValue("新規登録"))
    expect(screen.findByText("名前は50文字以内で入力して下さい")).toBeTruthy();
    expect(screen.findByText("パスワードは4文字以上です")).toBeTruthy();
    expect(screen.findByText("正しく入力して下さい")).toBeTruthy();
  })
  //password check
})
