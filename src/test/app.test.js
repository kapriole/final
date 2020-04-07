// app test js

import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import Axios from "axios";

// make a copy of axios // an automatic mock

jest.mock("./axios");

// talk about axios

test('App shows nothing at first', () => {
    Axios.get.mockedResolvedValue({
        data: {
            userId: 1,
            first: "so",
            last: "sa",
            imgUrl: "./default.png"}
    });
    const { container } = render(<App />);

    expect(container.children.length.toBe(0));

    await waitForElement(() => container.querySelector("div"));
    
    expect(container.children.length.toBe(1));


});

// we tell the test to sit and wait for a change in the DOM

// look at the app what is passed to setState (here: data) and put it in here
// 