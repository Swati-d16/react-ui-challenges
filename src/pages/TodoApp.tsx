import { useState, useEffect } from "react";
import { Plus, Trash2, Check, Flag } from "lucide-react";

type Priority = "high" | "medium" | "low";
type Filter = "all" | "active" | "completed";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

const priorityColors: Record<Priority, string> = {
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
};

const priorityLabels: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Todo App</h1>
        <p className="text-muted-foreground">
          Manage your tasks with priorities and filters
        </p>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="task-card mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="input-field flex-1"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="input-field sm:w-32"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button type="submit" className="btn-primary gap-2">
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${
                filter === f ? "filter-btn-active" : "filter-btn-inactive"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{activeCount} active</span>
          <span>{completedCount} completed</span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="task-card text-center py-12">
            <p className="text-muted-foreground">
              {filter === "all"
                ? "No tasks yet. Add one above!"
                : `No ${filter} tasks`}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card animate-fade-in ${priorityColors[task.priority]} ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-success border-success text-success-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {task.completed && <Check className="h-4 w-4" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-foreground ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.text}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`badge ${
                      task.priority === "high"
                        ? "badge-destructive"
                        : task.priority === "medium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    {priorityLabels[task.priority]}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;
