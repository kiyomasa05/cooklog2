// import React from 'react'
// import { render, screen, cleanup,} from "@testing-library/react"
// import userEvent from "@testing-library/user-event";
// import axios from 'axios';
// import { createMemoryHistory } from 'history'
// import { Router } from 'react-router-dom';

// import { act, renderHook ,HookResult,} from "@testing-library/react-hooks";
// import { rest } from "msw";
// import { setupServer } from "msw/node";

// import { useSignup } from '../hooks/useSignup';
// import { Signup } from '../containers/Signup';

// // jest.mock('axios');

// // ダミーの関数
// // const mockHistoryPush = jest.fn();

// // jest.mock('react-router-dom', () => ({
// //   useHistory: () => ({
// //     push: mockHistoryPush, // pushメソッドをダミー関数で上書きする。
// //   }),
// // }));

// const Post_USER = {
//   user: {
//     name: "test1",
//     email: "sample@sample.com",
//     password: 1234,
//     password_confirmation: 1234,
//     avatar:
//     {
//       data: '',
//       name: "photo"
//     }
//   }
// }
  
// const server = setupServer(
//     rest.post("http://localhost:3000/api/v1/signup", (req, res, ctx) => {
//         return res(
//           ctx.status(200),
//           ctx.json({
//               user:{id:1},
//               status:'created'
//             })//jsonオブジェクトを返す
//         )
//     }))
//       //10/8 ここpostにしてあるけど、どのデータを送るかわかっているのか？なんでもいいからpost通信受けたらレスポンスを返すのか？
// //server起動
// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();//決まり
//   cleanup();
// });
// afterAll(() => server.close());

// //hooksを呼ぶ
// describe('Login', () => {
//   it('Signinが成功時に画面にshowmessage（新規登録しました）が出るか', async () => {
//     //一旦itの中に入れているが後で外だしするかも
//     //hooksを呼ぶ　そこに定義したデータを引数として入れる
//     //引数を入れて関数を呼んだ瞬間axios通信してくれるのか？
//     const { result } = renderHook(() => useSignup(Post_USER));
//     //loadingがtrueになる
//     //1秒止めないとloading：trueにならなそう
//     // expect(result.current.loading).toBeTruthy();
//     await expect(result.current.loading).toBe(false);
//     //showmessegeはいちいちhooksを呼ばなくても勝手に表示される？//renderだと違うページに表示されてしまうかもしれないから、render以外で確認できるのが良い
//     //先にhistryのテストをするか？
    
//   })
//   it("submitを押した時に関数呼ばれるか,ページ遷移するか", async () => {
//     //つまりまくったので、一旦ここは保留にし、別のエラーを直す
//     const history = createMemoryHistory();
//     render(
//       <Router history={history}>
//       <Signup />
//       </Router>
//     )
//     const inputPassword = screen.getByPlaceholderText("password");
//     const inputPassword_cofirmation = screen.getByPlaceholderText("password(確認用)");
//     const inputName = screen.getByPlaceholderText("name");
//     const inputEmail = screen.getByPlaceholderText("email");
    
//     act(() => {
//       userEvent.type(inputName, "test");
//       userEvent.type(inputEmail, "sample@sample.com");
//       userEvent.type(inputPassword, "1234");
//       userEvent.type(inputPassword_cofirmation, "1234");
//       userEvent.click(screen.getByDisplayValue("新規登録"))
//     });
//     // await expect(screen.findByText("新規登録しました")).toBeTruthy()
//     // await expect(mockHistoryPush).toBeCalledWith('/users/1');
//     // await expect(mockHistoryPush).toHaveBeenCalledTimes(1);
//     // expect(await screen.findByText("投稿レシピ")).toBeTruthy()
//     //responseの値はどこに行った？
//     // const user_id = user.id
//     // expect(history.location.pathname).toEqual(`/users/${user_id}`);
//     // expect(history.location.pathname).toEqual("/users/1");//ここがうまく行ってない
//     // await expect(history.location.pathname).toBe("/users/1");//ここがうまく行ってない
//     // expect(history).toHaveBeenCalledTimes(1);
//     // expect(history.length).toBe(2);
//     //マッチャー全部エラー吐いている
//   })
//   })

// //customHookとserverの2つのテスト
// // describe("useSignup custom Hook", () => {
// //   afterEach(() => jest.restoreAllMocks())
// //   it("Should post data to api", async() => {
// //     (axios.get).mockResolvedValue('')
//  //ここにuserやログインのレスポンスがあればいけるのでは？
//  //postのテストというよりaxiosがきちんと動いているかのtestかな
//   //   const data = await get()
//   //   expect(data).toEqual('')
//   //  });
//   // it("Should post data to api", () => {
//   //   const user={name:"aaaa",email:"aaaa@aaaa.com"}
//   //   axios.post.mockImplementationOnce(() =>
//   //     Promise.resolve({ data: { user } })
//   //   );
//     //
    
//     // expect(result.current.loading).toBeTruthy();
//   // });
//   // it("Should post data to api", () => {
//   //   (axios.get as jest.Mock).mockResolvedValue({ data: mock })
// //data:に定義したmock:message（hello world）を関数が呼ばれるたびに受け取り、返す
// //mockResolvedValueはモック関数が呼ばれるたびに返す値を受け取る②
//     // await act(async () => {
//     //   const data = (await result.current.fetchMessage()) ;
// //       expect(data.type).toBe(FETCH_MESSAGE_RESPONSE_TYPE.success);
// // //それのtypeがsuccessか確認
// //       expect(data.message).toBe(mock.message);
//     // const { result } = renderHook(() => useSignup());
//     // act(() => {
//     //   result.current.signup();
//     // });
//     //api通信を行って、レスポンスが返ってくるかのテスト
//     //引数をちゃんと送っているかのテスト
//     //レスポンスをshowmessageやsetLoginUserに格納するかのテスト
//     // expect(result.current.loading).toBeTruthy();
// //   });
  
// // })//describe
