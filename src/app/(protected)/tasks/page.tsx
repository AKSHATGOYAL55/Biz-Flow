"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  ListTodo,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ---------------- TYPES ---------------- */

type TaskStatus = "todo" | "in_progress" | "done";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date?: string;
  assigned_to_name?: string;
}

/* ---------------- STATUS CONFIG ---------------- */

const statusConfig: Record<TaskStatus, any> = {
  todo: {
    label: "To Do",
    icon: ListTodo,
    variant: "default",
  },
  in_progress: {
    label: "In Progress",
    icon: Clock,
    variant: "info",
  },
  done: {
    label: "Done",
    icon: CheckCircle2,
    variant: "success",
  },
};

/* ================= PAGE ================= */

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  /* -------- FETCH TASKS -------- */

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ================= RENDER ================= */

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your team work
          </p>
        </div>

        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Tasks"
          value={tasks.length}
          icon={ListTodo}
        />
        <StatCard
          label="In Progress"
          value={tasks.filter((t) => t.status === "in_progress").length}
          icon={Clock}
        />
        <StatCard
          label="Completed"
          value={tasks.filter((t) => t.status === "done").length}
          icon={CheckCircle2}
        />
      </div>

      {/* Task List */}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-sm text-muted-foreground">
          No tasks yet. Create your first task 🚀
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => {
            const config = statusConfig[task.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    {task.description && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <Badge variant={config.variant}>
                    <StatusIcon className="mr-1 h-3.5 w-3.5" />
                    {config.label}
                  </Badge>
                </div>

                <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {task.assigned_to_name ?? "Unassigned"}
                  </div>

                  {task.due_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {task.due_date}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create Task Modal */}
      <AnimatePresence>
        {open && (
          <CreateTaskModal
            onClose={() => setOpen(false)}
            onCreated={fetchTasks}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= MODAL ================= */

function CreateTaskModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!title) return alert("Title is required");

    try {
      setLoading(true);

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          projectId: "PASTE_REAL_PROJECT_UUID",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      onClose();
      onCreated();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Task</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <input
            placeholder="Task title"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description (optional)"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: any;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}
