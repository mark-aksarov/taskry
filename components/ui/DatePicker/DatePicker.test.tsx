import "@testing-library/jest-dom";

import React from "react";
import { DatePicker } from "./DatePicker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "react-aria-components";
import { Button } from "../Button";
import { CalendarDate } from "@internationalized/date";

describe("DatePicker", () => {
  test("renders with default props", () => {
    render(<DatePicker label="Label" />);

    const group = screen.getByRole("group");
    expect(group).toBeInTheDocument();

    const segments = screen.getAllByRole("spinbutton");
    expect(segments[0]).toHaveTextContent("mm");
    expect(segments[1]).toHaveTextContent("dd");
    expect(segments[2]).toHaveTextContent("yyyy");
  });

  test("applies default group styles", () => {
    render(<DatePicker label="Label" value={new CalendarDate(1980, 1, 1)} />);

    const group = screen.getByRole("group");
    expect(group).toHaveClass("group border-gray-300 dark:border-gray-600");

    const segments = screen.getAllByRole("spinbutton");
    const monthSegment = segments[0];
    expect(monthSegment).toHaveClass("text-black dark:text-white");
  });

  test("applies focus-visible styles", async () => {
    render(<DatePicker label="Label" />);

    const user = userEvent.setup();

    await user.tab();

    const group = screen.getByRole("group");
    expect(group).toHaveClass("border-blue-500 dark:border-blue-800");
  });

  test("applies invalid styles", async () => {
    render(<DatePicker label="Label" isInvalid />);

    const group = screen.getByRole("group");
    expect(group).toHaveClass("border-red-300 dark:border-red-800");
  });

  test("applies disabled styles", async () => {
    render(<DatePicker label="Label" isDisabled />);

    const group = screen.getByRole("group");
    expect(group).toHaveClass("text-gray-400 dark:text-gray-500");

    const segments = screen.getAllByRole("spinbutton");
    const monthSegment = segments[0];
    expect(monthSegment).toHaveClass("text-gray-400 dark:text-gray-500");
  });

  test("applies placeholder styles", async () => {
    render(<DatePicker />);

    const segments = screen.getAllByRole("spinbutton");
    const monthSegment = segments[0];
    expect(monthSegment).toHaveClass("text-gray-500 dark:text-gray-400");
  });

  test("applies custom className", () => {
    render(<DatePicker label="Label" className="custom-class" />);

    const input = screen.getByTestId("datepicker");
    expect(input).toHaveClass("custom-class");
  });

  test("should use the provided ref for the component", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<DatePicker label="Label" ref={ref} />);

    const datepicker = screen.getByTestId("datepicker");
    expect(datepicker).toBe(ref.current);
  });

  test("allows typing date", async () => {
    const handleChange = jest.fn();

    render(<DatePicker label="Label" onChange={handleChange} />);

    const user = userEvent.setup();

    const segments = screen.getAllByRole("spinbutton");

    const monthSegment = segments[0];
    expect(monthSegment).toHaveTextContent("mm");
    await user.click(monthSegment);
    expect(monthSegment).toHaveFocus();
    await user.keyboard("12");
    expect(monthSegment).toHaveTextContent("12");

    const daySegment = segments[1];
    expect(daySegment).toHaveTextContent("dd");
    expect(daySegment).toHaveFocus();
    await user.keyboard("31");
    expect(daySegment).toHaveTextContent("31");

    const yearSegment = segments[2];
    expect(yearSegment).toHaveTextContent("yyyy");
    expect(yearSegment).toHaveFocus();
    await user.keyboard("2025");
    expect(yearSegment).toHaveTextContent("2025");

    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleChange).toHaveBeenCalledWith(new CalendarDate(2025, 12, 31));
  });

  test("should pick a date", async () => {
    const handleChange = jest.fn();

    render(
      <DatePicker
        label="Label"
        placeholderValue={new CalendarDate(1980, 1, 1)}
        onChange={handleChange}
      />,
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button");

    await user.click(button);
    const popover = await screen.findByRole("dialog");
    expect(popover).toBeInTheDocument();
    const nextButton = screen.getByRole("button", { name: "Next" });
    await user.click(nextButton);
    const dateButton = screen.getByRole("button", {
      name: "Friday, February 15, 1980",
    });
    expect(dateButton).toBeInTheDocument();
    await user.click(dateButton);
    expect(popover).not.toBeInTheDocument();

    const segments = screen.getAllByRole("spinbutton");
    const monthSegment = segments[0];
    expect(monthSegment).toHaveTextContent("2");
    const daySegment = segments[1];
    expect(daySegment).toHaveTextContent("15");
    const yearSegment = segments[2];
    expect(yearSegment).toHaveTextContent("1980");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(new CalendarDate(1980, 2, 15));
  });

  test("should open popover when overlayType is popover", async () => {
    render(<DatePicker label="Label" overlayType="popover" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);
    const popover = await screen.getByTestId("popover");
    expect(popover).toBeInTheDocument();
  });

  test("should open bottom sheet when overlayType is bottomsheet", async () => {
    render(<DatePicker label="Label" overlayType="bottomsheet" />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);
    const bottomSheet = screen.getByTestId("bottom-sheet");
    expect(bottomSheet).toBeInTheDocument();
  });

  test("should submit selected date", async () => {
    const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <DatePicker label="Label" isRequired />
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
      </Form>,
    );

    const user = userEvent.setup();

    const segments = screen.getAllByRole("spinbutton");

    const monthSegment = segments[0];
    expect(monthSegment).toHaveTextContent("mm");
    await user.click(monthSegment);
    expect(monthSegment).toHaveFocus();
    await user.keyboard("12");

    const daySegment = segments[1];
    expect(daySegment).toHaveTextContent("dd");
    await user.click(daySegment);
    expect(daySegment).toHaveFocus();
    await user.keyboard("31");

    const yearSegment = segments[2];
    expect(yearSegment).toHaveTextContent("yyyy");
    await user.click(yearSegment);
    expect(yearSegment).toHaveFocus();
    await user.keyboard("2025");

    const submit = screen.getByTestId("submit");
    await user.click(submit);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("should not submit if required and date is not selected", async () => {
    const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());

    render(
      <Form onSubmit={onSubmit}>
        <DatePicker label="Label" isRequired />
        <Button data-testid="submit" type="submit">
          Submit
        </Button>
      </Form>,
    );

    const user = userEvent.setup();
    const submit = screen.getByTestId("submit");
    await user.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
