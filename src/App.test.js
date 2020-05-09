import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "./App.js";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the App", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.children[0].className).toBe('App');
});