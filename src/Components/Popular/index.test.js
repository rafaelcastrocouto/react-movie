import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import Popular from "./index.js";

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

it("renders user data", async () => {
  const fakeData = {
    page: 1,
    total_pages: 1,
    results: [{
      id: 1234,
      title: "Fake Movie",
      release_date: "9/9/9",
      vote_count: 1,
      popularity: 1.5
    }]
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<MemoryRouter><Popular /></MemoryRouter>, container);
  });

  expect(container.querySelector(".title").textContent).toBe(fakeData.results[0].title);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});