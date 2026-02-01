import { useState } from "react";
import { Plus, X } from "lucide-react";

interface InputItem {
  id: string;
  value: number;
}

const ProgressBar = () => {
  const [inputs, setInputs] = useState<InputItem[]>([
    { id: crypto.randomUUID(), value: 25 },
    { id: crypto.randomUUID(), value: 50 },
    { id: crypto.randomUUID(), value: 75 },
  ]);

  const addInput = () => {
    setInputs((prev) => [...prev, { id: crypto.randomUUID(), value: 50 }]);
  };

  const removeInput = (id: string) => {
    if (inputs.length > 1) {
      setInputs((prev) => prev.filter((input) => input.id !== id));
    }
  };

  const updateValue = (id: string, rawValue: string) => {
    let value = parseInt(rawValue) || 0;
    value = Math.max(0, Math.min(100, value));
    setInputs((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const totalProgress = inputs.length > 0
    ? Math.round(inputs.reduce((sum, input) => sum + input.value, 0) / inputs.length)
    : 0;

  const getProgressColor = (value: number) => {
    if (value < 40) return "bg-destructive";
    if (value < 70) return "bg-warning";
    return "bg-success";
  };

  const getProgressGradient = (value: number) => {
    if (value < 40) return "var(--gradient-danger)";
    if (value < 70) return "var(--gradient-warning)";
    return "var(--gradient-success)";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Progress Bar</h1>
        <p className="text-muted-foreground">
          Dynamic progress bar with multiple inputs and color coding
        </p>
      </div>

      {/* Main Progress Bar */}
      <div className="task-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Total Progress</h2>
          <span
            className={`text-2xl font-bold ${
              totalProgress < 40
                ? "text-destructive"
                : totalProgress < 70
                ? "text-warning"
                : "text-success"
            }`}
          >
            {totalProgress}%
          </span>
        </div>
        <div className="progress-bar h-6">
          <div
            className="progress-fill animate-progress"
            style={{
              width: `${totalProgress}%`,
              background: getProgressGradient(totalProgress),
            }}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Average of {inputs.length} input{inputs.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Sub Progress Bars */}
      <div className="task-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Individual Progress</h2>
          <button
            onClick={addInput}
            className="btn-secondary gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Input
          </button>
        </div>

        <div className="space-y-4">
          {inputs.map((input, index) => (
            <div
              key={input.id}
              className="animate-fade-in p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm font-medium text-muted-foreground min-w-[60px]">
                  Input {index + 1}
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={input.value}
                  onChange={(e) => updateValue(input.id, e.target.value)}
                  className="input-field w-24 text-center"
                />
                <span className="text-sm text-muted-foreground">%</span>
                <div className="flex-1" />
                <span
                  className={`text-lg font-bold ${
                    input.value < 40
                      ? "text-destructive"
                      : input.value < 70
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  {input.value}%
                </span>
                {inputs.length > 1 && (
                  <button
                    onClick={() => removeInput(input.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${getProgressColor(input.value)}`}
                  style={{ width: `${input.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Legend */}
      <div className="task-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">Color Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-destructive" />
            <span className="text-sm text-muted-foreground">0-39% (Low)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning" />
            <span className="text-sm text-muted-foreground">40-69% (Medium)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success" />
            <span className="text-sm text-muted-foreground">70-100% (High)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
