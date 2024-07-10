import { render } from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom";


test("", ()=>{

    render (<Contact />);

    const heading = screen.getByRole("heading");

    //Assertion
    expect(heading).toBeInTheDocument();
})