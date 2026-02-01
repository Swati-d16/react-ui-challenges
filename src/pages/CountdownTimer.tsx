import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

type TimerStatus = "idle" | "running" | "paused" | "completed";

interface TimerState {
  initialTime: number;
  remainingTime: number;
  status: TimerStatus;
  lastUpdate: number;
}

const STORAGE_KEY = "countdown_timer_state";

const CountdownTimer = () => {
  const [inputTime, setInputTime] = useState(10);
  const [timerState, setTimerState] = useState<TimerState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as TimerState;
      // If timer was running, calculate remaining time
      if (parsed.status === "running") {
        const elapsed = Date.now() - parsed.lastUpdate;
        const remaining = Math.max(0, parsed.remainingTime - elapsed);
        return {
          ...parsed,
          remainingTime: remaining,
          status: remaining <= 0 ? "completed" : "running",
        };
      }
      return parsed;
    }
    return {
      initialTime: 10000,
      remainingTime: 10000,
      status: "idle",
      lastUpdate: Date.now(),
    };
  });

  const intervalRef = useRef<number | null>(null);

  const saveState = useCallback((state: TimerState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, []);

  const clearInterval = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    clearInterval();
    const newState: TimerState = {
      ...timerState,
      status: "running",
      lastUpdate: Date.now(),
      remainingTime:
        timerState.status === "idle"
          ? inputTime * 1000
          : timerState.remainingTime,
      initialTime:
        timerState.status === "idle" ? inputTime * 1000 : timerState.initialTime,
    };
    setTimerState(newState);
    saveState(newState);

    intervalRef.current = window.setInterval(() => {
      setTimerState((prev) => {
        const elapsed = Date.now() - prev.lastUpdate;
        const remaining = Math.max(0, prev.remainingTime - elapsed);
        const newState: TimerState = {
          ...prev,
          remainingTime: remaining,
          lastUpdate: Date.now(),
          status: remaining <= 0 ? "completed" : "running",
        };
        saveState(newState);
        if (remaining <= 0) {
          clearInterval();
        }
        return newState;
      });
    }, 10);
  };

  const pauseTimer = () => {
    clearInterval();
    const newState: TimerState = {
      ...timerState,
      status: "paused",
      lastUpdate: Date.now(),
    };
    setTimerState(newState);
    saveState(newState);
  };

  const resumeTimer = () => {
    startTimer();
  };

  const resetTimer = () => {
    clearInterval();
    const newState: TimerState = {
      initialTime: inputTime * 1000,
      remainingTime: inputTime * 1000,
      status: "idle",
      lastUpdate: Date.now(),
    };
    setTimerState(newState);
    saveState(newState);
  };

  // Handle running timer on mount
  useEffect(() => {
    if (timerState.status === "running") {
      intervalRef.current = window.setInterval(() => {
        setTimerState((prev) => {
          const elapsed = Date.now() - prev.lastUpdate;
          const remaining = Math.max(0, prev.remainingTime - elapsed);
          const newState: TimerState = {
            ...prev,
            remainingTime: remaining,
            lastUpdate: Date.now(),
            status: remaining <= 0 ? "completed" : "running",
          };
          saveState(newState);
          if (remaining <= 0) {
            clearInterval();
          }
          return newState;
        });
      }, 10);
    }

    return clearInterval;
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const getStatusText = () => {
    switch (timerState.status) {
      case "running":
        return { text: "Running", class: "status-running" };
      case "paused":
        return { text: "Paused", class: "status-paused" };
      case "completed":
        return { text: "Completed", class: "status-completed" };
      default:
        return { text: "Ready", class: "text-muted-foreground" };
    }
  };

  const status = getStatusText();
  const isRunning = timerState.status === "running";
  const isPaused = timerState.status === "paused";
  const isCompleted = timerState.status === "completed";
  const isIdle = timerState.status === "idle";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setInputTime(Math.max(1, value));
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Countdown Timer</h1>
        <p className="text-muted-foreground">
          Precision timer with milliseconds and persistent state
        </p>
      </div>

      <div className="task-card">
        {/* Timer Configuration */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">
            Set Time (seconds)
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              value={inputTime}
              onChange={handleInputChange}
              disabled={isRunning || isPaused}
              className="input-field w-32 text-center"
            />
            <span className="flex items-center text-muted-foreground">seconds</span>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center py-8">
          <div
            className={`timer-display mb-4 ${
              isCompleted ? "text-primary animate-pulse-soft" : "text-foreground"
            }`}
          >
            {formatTime(timerState.remainingTime)}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className={`h-4 w-4 ${status.class}`} />
            <span className={`text-sm font-medium ${status.class}`}>
              {status.text}
            </span>
          </div>
          {isCompleted && (
            <p className="mt-4 text-xl font-semibold text-primary animate-fade-in">
              🎉 Time's up!
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 pt-4">
          {!isCompleted && isIdle && (
            <button onClick={startTimer} className="btn-success gap-2">
              <Play className="h-4 w-4" />
              Start
            </button>
          )}

          {isRunning && (
            <button onClick={pauseTimer} className="btn-warning gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </button>
          )}

          {isPaused && (
            <button onClick={resumeTimer} className="btn-success gap-2">
              <Play className="h-4 w-4" />
              Resume
            </button>
          )}

          {(isPaused || isCompleted) && (
            <button onClick={resetTimer} className="btn-secondary gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>

        {/* Timer Info */}
        {(isRunning || isPaused) && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Initial Time</span>
                <p className="font-medium text-foreground">
                  {(timerState.initialTime / 1000).toFixed(0)}s
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Remaining</span>
                <p className="font-medium text-foreground">
                  {(timerState.remainingTime / 1000).toFixed(2)}s
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
