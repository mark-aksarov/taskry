import React from "react";
import { Button } from "../Button";
import { SearchField } from "./SearchField";
import { Form } from "react-aria-components";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("SearchField", () => {
  test("renders with label", () => {
    render(<SearchField label="Label" />);

    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();

    const label = screen.getByText("Label");
    expect(label).toBeInTheDocument();
  });

  test("applies default button styles", () => {
    render(<SearchField label="Label" />);

    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "group peer placeholder:text-gray-500 border-gray-300",
    );
  });

  test("applies invalid styles", async () => {
    render(<SearchField label="Label" isInvalid />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("border-red-300 dark:border-red-800");
  });

  test("applies disabled styles", async () => {
    render(<SearchField label="Label" isDisabled />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("text-gray-400 dark:text-gray-500");
  });

  test("applies focus styles", async () => {
    render(<SearchField label="Label" />);

    const user = userEvent.setup();

    await user.tab();

    const input = screen.getByRole("searchbox");
    expect(input).toHaveClass("border-blue-500 dark:border-blue-800");
  });

  test("renders with placeholder", () => {
    render(<SearchField label="Label" placeholder="Placeholder" />);

    const input = screen.getByPlaceholderText("Placeholder");
    expect(input).toBeInTheDocument();
  });

  test("shows error message when invalid", () => {
    render(
      <SearchField label="Label" isInvalid errorMessage="Error message" />,
    );

    const errorMessage = screen.getByText("Error message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(
      <SearchField
        label="Label"
        className="custom-class"
        data-testid="test-searchfield"
      />,
    );

    const searchfield = screen.getByTestId("test-searchfield");
    expect(searchfield).toHaveClass("custom-class");
  });

  test("should use the provided ref for the component", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <SearchField label="Label" data-testid="test-searchfield" ref={ref} />,
    );

    const searchfield = screen.getByTestId("test-searchfield");
    expect(searchfield).toBe(ref.current);
  });

  test("allows typing text", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchField label="Label" onChange={handleChange} />);

    const input = screen.getByRole("searchbox");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  test("should submit when value is valid", async () => {
    const onSubmit = vi.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <SearchField label="Label" isRequired name="search" value="Hello" />
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
    const onSubmit = vi.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <SearchField
          label="Label"
          isRequired
          name="search"
          errorMessage={(validation) =>
            validation.validationDetails.valueMissing ? "Fill in search" : ""
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

    const errorMessage = screen.getByText("Fill in search");
    expect(errorMessage).toBeInTheDocument();
  });
});
