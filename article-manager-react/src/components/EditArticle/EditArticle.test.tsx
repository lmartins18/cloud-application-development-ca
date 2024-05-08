import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import EditArticle from "./EditArticle";

jest.mock("axios");

describe("EditArticle", () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => { });
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockedNavigate);
  });

  it("should render Edit Article form", async () => {
    const mockedArticle = {
      id: "1",
      title: "Test Article",
      body: "Test body",
      published: true,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockedArticle,
    });

    render(<EditArticle />);

    expect(screen.getByText("Edit Article")).toBeInTheDocument();
    expect(screen.getByLabelText("Title:")).toBeInTheDocument();
    expect(screen.getByLabelText("Body:")).toBeInTheDocument();
    expect(screen.getByText("Published")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Article")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test body")).toBeInTheDocument();
  });

  it("should update article on form submission", async () => {
    const mockedArticle = {
      id: "1",
      title: "Test Article",
      body: "Test body",
      published: true,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockedArticle,
    });
    (
      axios.patch as jest.MockedFunction<typeof axios.patch>
    ).mockResolvedValueOnce({});

    render(<EditArticle />);

    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "Updated Title" },
    });
    fireEvent.change(screen.getByLabelText("Body:"), {
      target: { value: "Updated Body" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith("/articles/1", {
        title: "Updated Title",
        body: "Updated Body",
        published: true,
      });
    });
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/articles/1");
    });

  });

  it("should cancel editing and navigate back to article details", async () => {
    const mockedArticle = {
      id: "1",
      title: "Test Article",
      body: "Test body",
      published: true,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockedArticle,
    });

    render(<EditArticle />);

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/articles/1");
    });
  });
});
