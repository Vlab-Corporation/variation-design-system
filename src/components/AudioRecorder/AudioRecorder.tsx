import {
  forwardRef,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "@/components/Spinner";

/* MicIcon */
const MicIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-5 w-5", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const StopIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-5 w-5", className)}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

/* AudioRecorder */
export interface AudioRecorderProps extends HTMLAttributes<HTMLDivElement> {
  isRecording?: boolean;
  duration?: number;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
}

export const AudioRecorder = forwardRef<HTMLDivElement, AudioRecorderProps>(
  (
    {
      isRecording = false,
      duration = 0,
      onRecordingStart,
      onRecordingStop,
      className,
      ...props
    },
    ref,
  ) => {
    const handleClick = () => {
      if (isRecording) {
        onRecordingStop?.();
      } else {
        onRecordingStart?.();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200",
          className,
        )}
        {...props}
      >
        <RecordButton isRecording={isRecording} onClick={handleClick} />
        {isRecording && (
          <>
            <RecordingWaveform isActive />
            <RecordingTimer duration={duration} />
          </>
        )}
      </div>
    );
  },
);

AudioRecorder.displayName = "AudioRecorder";

/* RecordButton */
export interface RecordButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRecording?: boolean;
}

export const RecordButton = forwardRef<HTMLButtonElement, RecordButtonProps>(
  ({ isRecording = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full transition-all",
          isRecording
            ? "bg-error-500 text-white animate-pulse"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500",
          className,
        )}
        {...props}
      >
        {isRecording ? <StopIcon /> : <MicIcon />}
      </button>
    );
  },
);

RecordButton.displayName = "RecordButton";

/* RecordingTimer */
export interface RecordingTimerProps extends HTMLAttributes<HTMLSpanElement> {
  duration: number;
}

export const RecordingTimer = forwardRef<HTMLSpanElement, RecordingTimerProps>(
  ({ duration, className, ...props }, ref) => {
    const formatTime = (seconds: number): string => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      const pad = (n: number) => n.toString().padStart(2, "0");

      if (hrs > 0) {
        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
      }
      return `${pad(mins)}:${pad(secs)}`;
    };

    return (
      <span
        ref={ref}
        className={cn("font-mono text-sm text-gray-600", className)}
        {...props}
      >
        {formatTime(duration)}
      </span>
    );
  },
);

RecordingTimer.displayName = "RecordingTimer";

/* RecordingWaveform */
export interface RecordingWaveformProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  bars?: number;
}

export const RecordingWaveform = forwardRef<
  HTMLDivElement,
  RecordingWaveformProps
>(({ isActive = false, bars = 5, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-0.5 h-6",
        isActive && "animate-pulse",
        className,
      )}
      {...props}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all",
            isActive ? "bg-error-400" : "bg-gray-300",
          )}
          style={{
            height: isActive ? `${40 + Math.random() * 60}%` : "40%",
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
});

RecordingWaveform.displayName = "RecordingWaveform";

/* TranscriptionDisplay */
export interface TranscriptionDisplayProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  isLoading?: boolean;
  placeholder?: string;
}

export const TranscriptionDisplay = forwardRef<
  HTMLDivElement,
  TranscriptionDisplayProps
>(
  (
    {
      text,
      isLoading = false,
      placeholder = "Transcription will appear here...",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        aria-live="polite"
        className={cn(
          "p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[100px]",
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Spinner size="sm" />
            <span className="text-sm">Transcribing...</span>
          </div>
        ) : text ? (
          <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">{placeholder}</p>
        )}
      </div>
    );
  },
);

TranscriptionDisplay.displayName = "TranscriptionDisplay";
