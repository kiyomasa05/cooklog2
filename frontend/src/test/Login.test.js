import React from 'react'
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Login } from "../containers/Login"
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

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

