import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { AutocompleteProps } from "../core/autocomplete/autocomplete";
import { ComponentMock } from "./components/component-mock";
import { ContextReader } from "./components/context-reader";

const renderWithProvider = (props: AutocompleteProps = {}) => {
  return render(
    <ComponentMock {...props}>
      <ContextReader />
    </ComponentMock>,
  );
};

describe("Autocomplete Context", () => {
  test("initial state", () => {
    renderWithProvider();

    expect(screen.getByTestId("is-open").textContent).toBe("false");
    expect(screen.getByTestId("is-empty").textContent).toBe("false");
    expect(screen.getByTestId("is-loading").textContent).toBe("false");
    expect(screen.getByTestId("is-error").textContent).toBe("false");
    expect(screen.getByTestId("search-value").textContent).toHaveLength(0);
    expect(screen.getByTestId("selected-value").textContent).toBe("null");
  });

  test("open state", async () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "O");

    expect(screen.getByTestId("is-open").textContent).toBe("true");
  });

  test("loading state", () => {
    renderWithProvider({ isLoading: true });

    expect(screen.getByTestId("is-loading").textContent).toBe("true");
  });

  test("error state", () => {
    renderWithProvider({ isError: true });

    expect(screen.getByTestId("is-error").textContent).toBe("true");
  });

  test("empty state", async () => {
    renderWithProvider();

    const input = screen.getByTestId("search-input");
    await userEvent.type(input, "nonexistent");

    expect(screen.getByTestId("is-empty").textContent).toBe("true");
  });

  test("results state", async () => {
    renderWithProvider();

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "Option");

    expect(screen.getByTestId("results").textContent).toBe(
      JSON.stringify([
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ]),
    );
  });

  test("search functionality", async () => {
    const onSearchMock = vi.fn();
    renderWithProvider({ onSearch: onSearchMock });

    const input = screen.getByRole("combobox");

    await userEvent.type(input, "test");

    expect(onSearchMock).toHaveBeenCalledWith("t");
    expect(onSearchMock).toHaveBeenCalledWith("te");
    expect(onSearchMock).toHaveBeenCalledWith("tes");
    expect(onSearchMock).toHaveBeenCalledWith("test");

    expect(onSearchMock).toHaveBeenCalledTimes(4);

    expect(screen.getByTestId("search-value").textContent).toBe("test");
    expect(screen.getByTestId("is-open").textContent).toBe("true");
  });

  test("selection functionality", async () => {
    const onSelectMock = vi.fn();
    renderWithProvider({ onSelect: onSelectMock });

    // Open dropdown
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "Option");

    // Wait for options to be visible
    await screen.findByText("Option 1");

    // Verify initial state is null
    expect(screen.getByTestId("selected-value").textContent).toBe("null");

    // Find and click an option
    const option = screen.getByText("Option 1");
    await userEvent.click(option);

    // Verify onSelect was called with correct value
    expect(onSelectMock).toHaveBeenCalledWith("1");
    expect(onSelectMock).toHaveBeenCalledTimes(1);

    // Verify context state was updated
    expect(screen.getByTestId("selected-value").textContent).toBe("1");
  });

  test("clear states functionality", async () => {
    renderWithProvider();

    // Open dropdown
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "Option");

    const clearButton = screen.getByTestId("clear-button");
    await userEvent.click(clearButton);

    expect(screen.getByTestId("is-open").textContent).toBe("false");
    expect(screen.getByTestId("selected-value").textContent).toBe("null");
    expect(screen.getByTestId("search-input").textContent).toBe("");
  });

  test("keyboard interaction", async () => {
    renderWithProvider();

    const input = screen.getByTestId("search-input");
    await userEvent.type(input, "test");

    await userEvent.keyboard("{Escape}");

    expect(screen.getByTestId("is-open").textContent).toBe("false");
  });
});
