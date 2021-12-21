import React from 'react'
import { render, screen, cleanup,waitFor,act} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Signup } from "../containers/Signup"
// import { act, renderHook } from "@testing-library/react-hooks";
// import { act } from 'react-dom/test-utils';
import { rest } from "msw";
import { setupServer } from "msw/node";

//こっちはボタンを押してsignup関数hooksが起動するかまでのテストの役割
//実際にapiに通信するのは、hooksテストで役割を持つ
const server = setupServer(
  rest.post("http://localhost:3000/api/v1/signup", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(
      {
        logged_in: true,
      }
    ));
  })
);
const mockSignin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

afterEach(() => cleanup());

//10／9コメントアウト戻したらワーニングでた。この何処かに原因あり
describe("Rendering", () => {
  it("Should render all elements correctly", () => {
    render(<Signup />)
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByPlaceholderText("name")).toBeTruthy();
    expect(screen.getByPlaceholderText("email")).toBeTruthy();
    expect(screen.getByPlaceholderText("password")).toBeTruthy();
    expect(screen.getByPlaceholderText("password(確認用)")).toBeTruthy();
    expect(screen.getByRole("img")).toBeTruthy();
    expect(screen.getByLabelText("アバター写真")).toBeTruthy();
    expect(screen.getByPlaceholderText("画像アップロード")).toBeTruthy();
    expect(screen.getByDisplayValue("新規登録")).toBeTruthy();
  })
})
//ここまで問題なし
describe("Input form onChange event", () => {
  it("Should update email input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("email");
    act(() => {
      userEvent.type(inputValue, "test");
    });
    expect(inputValue.value).toBe("test");
  })
  //ここまで問題なし
  it("Should update password input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("password");
    act(() => {
      userEvent.type(inputValue, "1234");
    });
    expect(inputValue.value).toBe("1234");
  })
  //ここまで問題なし
  it("Should update name input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("name");
    act(() => {
      userEvent.type(inputValue, "aaaaa");
    });
    expect(inputValue.value).toBe("aaaaa");
  })
  it("Should update password_confirmation input value correctly", () => {
    render(<Signup />)
    const inputValue = screen.getByPlaceholderText("password(確認用)");
    act(() => {
      userEvent.type(inputValue, "aaaaa");
    });
    expect(inputValue.value).toBe("aaaaa");
  })
})
//ここまで問題なし
describe('FileUploadField', () => {
  it('should not show preview if no image has been selected', () => {
    render(<Signup />)
    expect(screen.getByRole("img").src).toContain('https://via.placeholder.com/250');
  });
});
//ここまで問題なし
// //アップロードテスト
describe('readFileAsDataURL()',() => {
  it('upload file', async() => {
    render(<Signup />)
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = screen.getByLabelText("アバター写真")
    await act(async() => {
      userEvent.upload(input, file);
    });
    // 定義ずみのfileをラベルを押してupload
    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file)
      // 構造が同じか確認
      expect(input.files.item(0)).toStrictEqual(file)
      expect(input.files).toHaveLength(1)
      // 一つの画像か確認
    });
  });
});
//ここで詰まる　ワーニングが出る
describe("Check for errors before fetch API", () => {
  it("Should require  error",async() => {
    render(<Signup />)
    expect(screen.queryByText(/名前は必須です/)).toBeNull()
    expect(screen.queryByText(/パスワードは必須です/)).toBeNull()
    expect(screen.queryByText(/emailは必須です/)).toBeNull()
    await act(async() => {
      userEvent.click(screen.getByDisplayValue("新規登録"))
    });
    await waitFor(() => {
      expect(screen.findByText(/名前は必須です/)).toBeTruthy();
      expect(screen.findByText(/パスワードは必須です/)).toBeTruthy();
      expect(screen.findByText(/emailは必須です/)).toBeTruthy();
    })
  })
//   it("Should  format error",async() => {
//     render(<Signup />)
//     const inputName = screen.getByPlaceholderText("name");
//     const inputPassword = screen.getByPlaceholderText("password");
//     const inputEmail = screen.getByPlaceholderText("email");
//     act(() => {
//       userEvent.type(inputName, `${"a"*51}`);
//     userEvent.type(inputPassword, "123");
//     userEvent.type(inputEmail, "aaaa@");
//     userEvent.click(screen.getByDisplayValue("新規登録"))
//     });
//     expect(mockSignin).not.toBeCalled();
//     await expect(screen.findByText("名前は50文字以内で入力して下さい")).toBeTruthy();
//     await  expect(screen.findByText("パスワードは4文字以上です")).toBeTruthy();
//     await expect(screen.findByText("正しく入力して下さい")).toBeTruthy();
//   })
//   //password check
})
