import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  SyncStatus,
  SyncStatusIndicator,
  SyncStatusText,
  AutoSaveIndicator,
} from "./SyncStatus";

describe("SyncStatus Component", () => {
  describe("SyncStatus", () => {
    it("should render container", () => {
      render(<SyncStatus status="synced" data-testid="sync" />);
      expect(screen.getByTestId("sync")).toBeInTheDocument();
    });

    it("should show synced state", () => {
      render(<SyncStatus status="synced" />);
      expect(screen.getByText(/saved/i)).toBeInTheDocument();
    });

    it("should show syncing state", () => {
      render(<SyncStatus status="syncing" />);
      expect(screen.getByText(/saving/i)).toBeInTheDocument();
    });

    it("should show error state", () => {
      render(<SyncStatus status="error" />);
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    it("should show offline state", () => {
      render(<SyncStatus status="offline" />);
      expect(screen.getByText(/offline/i)).toBeInTheDocument();
    });
  });

  describe("SyncStatusIndicator", () => {
    it("should render indicator dot", () => {
      render(<SyncStatusIndicator status="synced" data-testid="indicator" />);
      expect(screen.getByTestId("indicator")).toBeInTheDocument();
    });

    it("should have green color when synced", () => {
      render(<SyncStatusIndicator status="synced" data-testid="indicator" />);
      expect(screen.getByTestId("indicator")).toHaveClass("bg-success-500");
    });

    it("should have yellow color when syncing", () => {
      render(<SyncStatusIndicator status="syncing" data-testid="indicator" />);
      expect(screen.getByTestId("indicator")).toHaveClass("bg-warning-500");
    });

    it("should have red color when error", () => {
      render(<SyncStatusIndicator status="error" data-testid="indicator" />);
      expect(screen.getByTestId("indicator")).toHaveClass("bg-error-500");
    });

    it("should have gray color when offline", () => {
      render(<SyncStatusIndicator status="offline" data-testid="indicator" />);
      expect(screen.getByTestId("indicator")).toHaveClass("bg-gray-400");
    });

    it("should animate when syncing", () => {
      render(<SyncStatusIndicator status="syncing" data-testid="indicator" />);
      expect(screen.getByTestId("indicator")).toHaveClass("animate-pulse");
    });
  });

  describe("SyncStatusText", () => {
    it("should render status text", () => {
      render(<SyncStatusText status="synced" />);
      expect(screen.getByText("All changes saved")).toBeInTheDocument();
    });

    it("should render custom text", () => {
      render(<SyncStatusText status="synced" text="Custom message" />);
      expect(screen.getByText("Custom message")).toBeInTheDocument();
    });
  });

  describe("AutoSaveIndicator", () => {
    it("should render when enabled", () => {
      render(<AutoSaveIndicator enabled data-testid="autosave" />);
      expect(screen.getByTestId("autosave")).toBeInTheDocument();
    });

    it("should show enabled state", () => {
      render(<AutoSaveIndicator enabled />);
      expect(screen.getByText(/auto-save on/i)).toBeInTheDocument();
    });

    it("should show disabled state", () => {
      render(<AutoSaveIndicator enabled={false} />);
      expect(screen.getByText(/auto-save off/i)).toBeInTheDocument();
    });

    it("should show last saved time", () => {
      render(<AutoSaveIndicator enabled lastSaved={new Date()} />);
      expect(screen.getByText(/saved/i)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-live for status updates", () => {
      render(<SyncStatus status="synced" data-testid="sync" />);
      expect(screen.getByTestId("sync")).toHaveAttribute("aria-live", "polite");
    });
  });
});
