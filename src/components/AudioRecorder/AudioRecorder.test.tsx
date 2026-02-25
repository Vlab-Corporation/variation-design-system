import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  AudioRecorder,
  RecordButton,
  RecordingTimer,
  RecordingWaveform,
  TranscriptionDisplay,
} from "./AudioRecorder";

describe("AudioRecorder Component", () => {
  describe("AudioRecorder", () => {
    it("should render recorder container", () => {
      render(<AudioRecorder data-testid="recorder" />);
      expect(screen.getByTestId("recorder")).toBeInTheDocument();
    });

    it("should show record button", () => {
      render(<AudioRecorder />);
      expect(
        screen.getByRole("button", { name: /record/i }),
      ).toBeInTheDocument();
    });

    it("should start recording on button click", () => {
      const onStart = vi.fn();
      render(<AudioRecorder onRecordingStart={onStart} />);

      fireEvent.click(screen.getByRole("button", { name: /record/i }));
      expect(onStart).toHaveBeenCalled();
    });

    it("should stop recording on button click when recording", () => {
      const onStop = vi.fn();
      render(<AudioRecorder isRecording onRecordingStop={onStop} />);

      fireEvent.click(screen.getByRole("button", { name: /stop/i }));
      expect(onStop).toHaveBeenCalled();
    });
  });

  describe("RecordButton", () => {
    it("should render record button", () => {
      render(<RecordButton onClick={() => {}} data-testid="btn" />);
      expect(screen.getByTestId("btn")).toBeInTheDocument();
    });

    it("should show stop icon when recording", () => {
      render(<RecordButton isRecording onClick={() => {}} data-testid="btn" />);
      expect(screen.getByTestId("btn")).toHaveClass("bg-error-500");
    });

    it("should have pulse animation when recording", () => {
      render(<RecordButton isRecording onClick={() => {}} data-testid="btn" />);
      expect(screen.getByTestId("btn")).toHaveClass("animate-pulse");
    });
  });

  describe("RecordingTimer", () => {
    it("should render timer", () => {
      render(<RecordingTimer duration={0} data-testid="timer" />);
      expect(screen.getByTestId("timer")).toBeInTheDocument();
    });

    it("should display formatted time", () => {
      render(<RecordingTimer duration={65} />);
      expect(screen.getByText("01:05")).toBeInTheDocument();
    });

    it("should display hours when over 60 minutes", () => {
      render(<RecordingTimer duration={3665} />);
      expect(screen.getByText("01:01:05")).toBeInTheDocument();
    });
  });

  describe("RecordingWaveform", () => {
    it("should render waveform container", () => {
      render(<RecordingWaveform data-testid="waveform" />);
      expect(screen.getByTestId("waveform")).toBeInTheDocument();
    });

    it("should have animation when recording", () => {
      render(<RecordingWaveform isActive data-testid="waveform" />);
      expect(screen.getByTestId("waveform")).toHaveClass("animate-pulse");
    });

    it("should show bars", () => {
      render(<RecordingWaveform data-testid="waveform" />);
      const waveform = screen.getByTestId("waveform");
      expect(waveform.children.length).toBeGreaterThan(0);
    });
  });

  describe("TranscriptionDisplay", () => {
    it("should render transcription container", () => {
      render(<TranscriptionDisplay text="" data-testid="transcription" />);
      expect(screen.getByTestId("transcription")).toBeInTheDocument();
    });

    it("should display transcription text", () => {
      render(
        <TranscriptionDisplay text="Hello, this is a test transcription." />,
      );
      expect(
        screen.getByText("Hello, this is a test transcription."),
      ).toBeInTheDocument();
    });

    it("should show loading state", () => {
      render(<TranscriptionDisplay text="" isLoading />);
      expect(screen.getByText(/transcribing/i)).toBeInTheDocument();
    });

    it("should show placeholder when empty", () => {
      render(<TranscriptionDisplay text="" placeholder="Start speaking..." />);
      expect(screen.getByText("Start speaking...")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have accessible record button", () => {
      render(<AudioRecorder />);
      const button = screen.getByRole("button", { name: /record/i });
      expect(button).toHaveAttribute("aria-label");
    });

    it("should have live region for transcription", () => {
      render(<TranscriptionDisplay text="Test" data-testid="transcription" />);
      expect(screen.getByTestId("transcription")).toHaveAttribute(
        "aria-live",
        "polite",
      );
    });
  });
});
