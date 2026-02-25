import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
  describe("Rendering", () => {
    it("should render a checkbox input", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should render with label", () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("should render circular indicator", () => {
      const { container } = render(<Checkbox />);
      const indicator = container.querySelector("[aria-hidden='true']");
      expect(indicator).toHaveClass("rounded-full");
    });

    it("should apply custom className to wrapper", () => {
      const { container } = render(<Checkbox className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Label Association", () => {
    it("should associate label with checkbox via htmlFor", () => {
      render(<Checkbox label="Accept" id="terms" />);
      expect(screen.getByLabelText("Accept")).toBeInTheDocument();
    });

    it("should generate unique id if not provided", () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("id");
    });
  });

  describe("States", () => {
    it("should be checked when checked prop is true", () => {
      render(<Checkbox checked onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("should show check icon when checked", () => {
      const { container } = render(<Checkbox checked onChange={() => {}} />);
      const indicator = container.querySelector("[aria-hidden='true']");
      expect(indicator).toHaveClass("bg-accent-600");
      expect(indicator?.querySelector("svg")).toBeInTheDocument();
    });

    it("should show unchecked circle when not checked", () => {
      const { container } = render(<Checkbox />);
      const indicator = container.querySelector("[aria-hidden='true']");
      expect(indicator).toHaveClass("border", "border-gray-400");
      expect(indicator?.querySelector("svg")).not.toBeInTheDocument();
    });

    it("should be disabled when disabled prop is true", () => {
      render(<Checkbox disabled />);
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("should have disabled styling on indicator", () => {
      const { container } = render(<Checkbox disabled />);
      const indicator = container.querySelector("[aria-hidden='true']");
      expect(indicator).toHaveClass("opacity-50");
    });

    it("should support indeterminate state", () => {
      render(<Checkbox indeterminate />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });

    it("should show indeterminate icon", () => {
      const { container } = render(<Checkbox indeterminate />);
      const indicator = container.querySelector("[aria-hidden='true']");
      expect(indicator).toHaveClass("bg-accent-600");
      expect(indicator?.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Events", () => {
    it("should call onChange when clicked", () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);
      fireEvent.click(screen.getByRole("checkbox"));
      expect(handleChange).toHaveBeenCalled();
    });

    it("should not call onChange when disabled", () => {
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);
      fireEvent.click(screen.getByRole("checkbox"));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should toggle internal state for uncontrolled checkbox", () => {
      const { container } = render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      const indicator = container.querySelector("[aria-hidden='true']");

      expect(indicator).toHaveClass("border");
      fireEvent.click(checkbox);
      expect(indicator).toHaveClass("bg-accent-600");
    });
  });

  describe("TextField", () => {
    it("should not show text field when withTextField is false", () => {
      render(<Checkbox checked onChange={() => {}} />);
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("should not show text field when unchecked", () => {
      render(<Checkbox withTextField />);
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("should show text field when withTextField and checked", () => {
      render(<Checkbox withTextField checked onChange={() => {}} />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should show text field placeholder", () => {
      render(
        <Checkbox
          withTextField
          checked
          onChange={() => {}}
          textFieldPlaceholder="기타 내용을 입력해주세요."
        />,
      );
      expect(
        screen.getByPlaceholderText("기타 내용을 입력해주세요."),
      ).toBeInTheDocument();
    });

    it("should call onTextFieldChange when text field value changes", () => {
      const handleTextChange = vi.fn();
      render(
        <Checkbox
          withTextField
          checked
          onChange={() => {}}
          onTextFieldChange={handleTextChange}
          textFieldPlaceholder="입력"
        />,
      );
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      expect(handleTextChange).toHaveBeenCalled();
    });

    it("should apply error styling when textFieldError is true", () => {
      render(
        <Checkbox
          withTextField
          checked
          onChange={() => {}}
          textFieldError
          textFieldPlaceholder="입력"
        />,
      );
      const textField = screen.getByRole("textbox");
      expect(textField).toHaveClass("border-b-error-600", "text-error-600");
    });

    it("should apply normal styling when no error", () => {
      render(
        <Checkbox
          withTextField
          checked
          onChange={() => {}}
          textFieldPlaceholder="입력"
        />,
      );
      const textField = screen.getByRole("textbox");
      expect(textField).toHaveClass("border-b-accent-600");
    });

    it("should show text field when uncontrolled checkbox is clicked", () => {
      render(<Checkbox withTextField label="기타" />);
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("checkbox"));
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have checkbox role", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should support aria-label", () => {
      render(<Checkbox aria-label="Toggle feature" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "aria-label",
        "Toggle feature",
      );
    });

    it("should hide indicator from screen readers", () => {
      const { container } = render(<Checkbox />);
      const indicator = container.querySelector("[aria-hidden='true']");
      expect(indicator).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("should pass through name attribute", () => {
      render(<Checkbox name="terms" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute("name", "terms");
    });

    it("should pass through value attribute", () => {
      render(<Checkbox value="agreed" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute("value", "agreed");
    });

    it("should pass through data-testid", () => {
      render(<Checkbox data-testid="custom-checkbox" />);
      expect(screen.getByTestId("custom-checkbox")).toBeInTheDocument();
    });
  });
});
