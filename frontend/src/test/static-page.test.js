import React from 'react'
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Home } from "../containers/static_page"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Should render all elements correctly", () => {
    render(<Home />)
    // screen.debug();//画面全体
    //header
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByText("COOKLOG")).toBeTruthy();
    expect(screen.getAllByRole("list")[0]).toBeTruthy();
    
    expect(screen.getByText("お気に入りのレシピを投稿しよう")).toBeTruthy();
    expect(screen.getByText("新規登録")).toBeTruthy();
    //まだログインしてないからマイページとかは出ない
    expect(screen.getByText("ログイン")).toBeTruthy();
    //main
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    expect(screen.getAllByRole("button")[2]).toBeTruthy();
    //("button")[0] がmenuIconButton
  })
})

describe("button conditionally triggered", () => {
  it("Should click Signup button render signup component", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
      <Home />
      </Router>
    )
    //Routerがないとエラーとなるので注意
    //onclick関数が呼び出されるかテストしたい
    // const onClickSignup = jest.fn();
    userEvent.click(screen.getAllByRole("button")[1])
    expect(history.length).toBe(2);
    //histrory配列の長さ
    expect(history.location.pathname).toBe('/signup');
  // expect(history.location.pathname).toBe('/login');
    // expect(onClickSignup).toHaveBeenCalled();
  });
  it("Should click login button render login component", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
      <Home />
      </Router>
    )
    userEvent.click(screen.getAllByRole("button")[2])
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/login');
  });
});
