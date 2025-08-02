"use client";

import { TaskItem } from './TaskItem';
import { Id } from '../../convex/_generated/dataModel';

interface Task {
  _id: Id<"checkListItems">;
  title: string;
  isCompleted: boolean;
  userId: Id<"users">;
}

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
}

export function TaskList({ tasks, isLoading }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">Your Tasks</h2>
          <p className="text-sm text-[var(--foreground-muted)]">Loading your tasks...</p>
        </div>
        
        {/* Loading skeleton */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 p-5 bg-[var(--surface-hover)] rounded-[var(--radius-lg)] border border-[var(--surface-border)] animate-pulse"
          >
            <div className="w-6 h-6 bg-[var(--surface-border-hover)] rounded-[var(--radius-md)]"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[var(--surface-border-hover)] rounded w-3/4"></div>
              <div className="h-3 bg-[var(--surface-border)] rounded w-1/2"></div>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-[var(--surface-border-hover)] rounded-[var(--radius-md)]"></div>
              <div className="w-8 h-8 bg-[var(--surface-border-hover)] rounded-[var(--radius-md)]"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-8">
          <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-light)] flex items-center justify-center">
            <svg className="h-12 w-12 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h4.125M8.25 8.25V6.108" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
          Ready to get started?
        </h3>
        <p className="text-[var(--foreground-muted)] mb-8 max-w-md mx-auto leading-relaxed">
          Create your first task above and start organizing your day with style. 
          Every great journey begins with a single step.
        </p>
        <div className="bg-[var(--surface-hover)] rounded-[var(--radius-lg)] p-4 max-w-sm mx-auto">
          <div className="flex items-center gap-3 text-sm text-[var(--foreground-muted)]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
              <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m4.5 0a12.06 12.06 0 000-9.956 12.06 12.06 0 00-4.5 0m4.5 0L16.5 9m-4.5 0V5.25A2.25 2.25 0 0114.25 3h-4.5A2.25 2.25 0 007.5 5.25V9" />
              </svg>
            </div>
            <span>Click on tasks to edit them, and use the buttons to manage your list</span>
          </div>
        </div>
      </div>
    );
  }

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-1">Your Tasks</h2>
          <p className="text-sm text-[var(--foreground-muted)]">
            {pendingTasks.length > 0 
              ? `${pendingTasks.length} remaining • ${completionRate}% complete`
              : "All tasks completed! 🎉"
            }
          </p>
        </div>
        
        {/* Progress Ring */}
        {tasks.length > 0 && (
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[var(--surface-border)]"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[var(--primary)]"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${completionRate}, 100`}
                strokeLinecap="round"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-[var(--foreground)]">{completionRate}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider">
              Active Tasks
            </h3>
            <div className="flex-1 h-px bg-[var(--surface-border)]"></div>
            <span className="text-xs font-medium text-[var(--foreground-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full">
              {pendingTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
              Completed
            </h3>
            <div className="flex-1 h-px bg-[var(--surface-border)]"></div>
            <span className="text-xs font-medium text-[var(--foreground-muted)] bg-[var(--success-light)] text-[var(--success)] px-2 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 