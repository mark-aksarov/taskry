import React from "react";
import "@testing-library/jest-dom";
import { Button } from "../Button";
import { TextField } from "./TextField";
import { Form } from "react-aria-components";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("TextField", () => {
  test("renders with label", () => {
    render(<TextField label="Label" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const label = screen.getByText("Label");
    expect(label).toBeInTheDocument();
  });

  test("applies default input styles", () => {
    render(<TextField label="Label" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "group placeholder:text-gray-500 border-gray-300",
    );
  });

  test("applies invalid styles", async () => {
    render(<TextField label="Label" isInvalid />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-red-300 dark:border-red-800");
  });

  test("applies disabled styles", async () => {
    render(<TextField label="Label" isDisabled />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("text-gray-400 dark:text-gray-500");
  });

  test("applies focus styles", async () => {
    render(<TextField label="Label" />);

    const user = userEvent.setup();

    await user.tab();

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-blue-500 dark:border-blue-800");
  });

  test("renders with placeholder", () => {
    render(<TextField label="Label" placeholder="Placeholder" />);

    const input = screen.getByPlaceholderText("Placeholder");
    expect(input).toBeInTheDocument();
  });

  test("renders multiline text area when multiline=true", () => {
    render(<TextField label="Label" multiline />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  test("shows error message when invalid", () => {
    render(<TextField label="Label" isInvalid errorMessage="Error message" />);

    const errorMessage = screen.getByText("Error message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <TextField
        label="Label"
        className="custom-class"
        data-testid="test-textfield"
      />,
    );

    const textfield = screen.getByTestId("test-textfield");
    expect(textfield).toHaveClass("custom-class");
  });

  test("should use the provided ref for the component", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<TextField label="Label" data-testid="test-textfield" ref={ref} />);

    const textfield = screen.getByTestId("test-textfield");
    expect(textfield).toBe(ref.current);
  });

  test("allows typing text", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<TextField label="Label" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  test("should submit when value is valid", async () => {
    const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <TextField label="Label" isRequired name="text" value="Hello" />
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
      </Form>,
    );

    const user = userEvent.setup();
    const submit = screen.getByTestId("submit");
    await user.click(submit);
    expect(onSubmit).toHaveBeenCalled();
  });

  test("supports custom validation errors", async () => {
    const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <TextField
          label="Label"
          isRequired
          name="name"
          errorMessage={(validation) =>
            validation.validationDetails.valueMissing ? "Name is required" : ""
          }
        />
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
      </Form>,
    );

    const user = userEvent.setup();
    const submit = screen.getByTestId("submit");
    await user.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();

    const errorMessage = screen.getByText("Name is required");
    expect(errorMessage).toBeInTheDocument();
  });
});
