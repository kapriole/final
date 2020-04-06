// bio.test.js

import React from "react";
import BioEditor from "./bioeditor";
import { render, waitForElement } from "@testing-library/react";

import axios from "./axios";
jest.mock("./axios"); // automatic mock - I'm telling Jest to mock axios for me
// when Jest does this it will create a dumb copy of axios
// that includes dumb methods of all the methods of axios I need (like get)

test("BioEditor shows nothing at first", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "so",
            last: "sa",
            bio: null,
            imgUrl: "/default.png",
        },
    });
    const { container } = render(<BioEditor />);

    expect(container.children.length).toBe(0);

    await waitForElement(() => container.querySelector("div"));

    expect(container.children.length).toBe(1);
});


// 1. When no bio is passed to it, an "Add" button is rendered.

test("Changes after no bio", () => {
    const { container } = render(<BioEditor />);

    expect(container.querySelector("div").children.length).toBe(0);

    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("div").innerHTML).toContain("Add");
});


// 2. When a bio is passed to it, an "Edit" button is rendered.


test("Changes after a bio", () => {
    const { container } = render(<BioEditor />);

    expect(container.querySelector("div").innerHTML).toContain({ bio });

    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("div").innerHTML).toContain("Edit");
});

// 3. Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.

test("Changes after add or edit button click", () => {

    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("div").innerHTML).toContain(
        container.querySelector("textarea") && container.querySelector("save")
    );
});


// 4. Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.


test("Save button fires ajax", async () => {
    fireEvent.click(expect(container.querySelector("button").innerHTML).toContain("save"));

    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "so",
            last: "sa",
            bio: null,
            imgUrl: "/default.png",
        },
    });
    const { container } = render(<BioEditor bio={props.bio}/>);

    expect(container.children.length).toBe(0);

    await waitForElement(() => container.querySelector("div"));

    expect(container.children.length).toBe(1);
});

// how many children?

// 5. When the mock request is successful, the function that was passed as a prop to the component gets called.

// check the last part when bioeditor works properly
