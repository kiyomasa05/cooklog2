import React from 'react'
import {render,screen,cleanup}from "@testing-library/react"
import { Home } from "../containers/static_page"

describe("Rendering", () => {
  it("Should render all elements correctly", () => {
    render(<Home />)
    screen.debug();//画面全体
    expect(screen.getByRole("heading")).toBeTruthy();
  })
})
