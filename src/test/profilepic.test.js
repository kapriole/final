// profilepictest
import React from "react";
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";

test('renders img with src set to url prop', () => {
    const { container } = render(<ProfilePic url="/dog.png" />);
    expect(container.querySelector('img').getAttribute('src').toBe('/dog.png')
    );
});

// the name of container is required and a reference from a dom / always use the name container!
// container is the DOM (like the document in the old times)
// the test returns the DOM


test("renders img with src set to default when no img was passed", () => {
    const { container } = render(<ProfilePic/>);
    expect(
        container.querySelector("img").getAttribute("src").toBe("/default.png")
    );
});

// check the file structure

// two more tests

test("renders first and last props in alt attributes", () => {
    const { container } = render(<ProfilePic first="so" last="sa" />);
    expect(container.querySelector("img").getAttribute("alt").toBe("so sa"));
});

test("onClick prop gets called when the image is called", () => {
    const myMockOnClick = jest.fn();
    const { container } = render(<ProfilePic onClick={myMockOnClick} />);
    fireEvent.click(container.querySelector("img"));
    expect(myMockOnClick.mock.calls.length.toBe(1));
});

// use mockfunction here: 