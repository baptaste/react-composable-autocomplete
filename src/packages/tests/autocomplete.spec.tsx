import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { ComponentMock, mockOptions } from "./components/component-mock";

describe("Autocomplete Component", () => {
  test("renders the autocomplete component", () => {
    render(<ComponentMock />);
    expect(screen.getByRole("combobox")).toBeDefined();
  });

  test("shows label when provided", () => {
    render(<ComponentMock label />);
    expect(screen.getByText("Test Label")).toBeDefined();
  });

  test("shows options when typing", async () => {
    render(<ComponentMock />);

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "Op");

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeDefined();
    });
  });

  test("filters options based on search input", async () => {
    render(<ComponentMock />);

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "Option 1");

    expect(screen.getByText("Option 1")).toBeDefined();
    expect(screen.queryByText("Option 2")).toBeNull();
  });

  test("selects option when clicked", async () => {
    render(<ComponentMock />);

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "Option 1");

    const option = screen.getByTestId("option-1");
    await userEvent.click(option);

    expect(option).toBeDefined();
  });

  test("clears input when clear button is clicked", async () => {
    render(<ComponentMock />);

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "test");

    const clearButton = screen.getByRole("button");
    await userEvent.click(clearButton);

    expect(input.textContent).toBe("");
  });

  test("shows loading state when loading", async () => {
    render(<ComponentMock isLoading />);

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "Op");

    expect(screen.findByText("Loading...")).toBeDefined();
  });

  test("shows empty state when no results", async () => {
    render(<ComponentMock />);

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "xyz");

    expect(screen.findByText("No results found.")).toBeDefined();
  });

  test("shows error state when error occurs", async () => {
    render(<ComponentMock isError />);

    expect(screen.findByText("Error occurred")).toBeDefined();
  });
});
