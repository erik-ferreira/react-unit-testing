import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { List } from "./List";

describe("List Component", () => {
  it("should render list items", async () => {
    const { getByText, queryByText, rerender, unmount } = render(
      <List initialNames={["Erik", "Leticia", "David", "Vanessa", "Daniel"]} />
    );

    expect(getByText("Erik")).toBeInTheDocument();
    expect(getByText("Leticia")).toBeInTheDocument();
    expect(getByText("David")).toBeInTheDocument();
    expect(getByText("Vanessa")).toBeInTheDocument();
    expect(getByText("Daniel")).toBeInTheDocument();

    unmount();
    rerender(<List initialNames={["Julia"]} />);

    expect(getByText("Julia")).toBeInTheDocument();
    expect(queryByText("Erik")).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(
      <List initialNames={[]} />
    );

    const inputElement = getByPlaceholderText("Novo nome");
    const addButton = getByText("Adicionar");

    await userEvent.type(inputElement, "Vanusa");
    userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("Vanusa")).toBeInTheDocument();
    });
  });

  it("should be able to remove item to the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialNames={["Erik"]} />
    );

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Erik")).not.toBeInTheDocument();
    });
  });
});
