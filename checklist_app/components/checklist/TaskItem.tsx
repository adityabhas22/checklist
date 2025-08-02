"use client";

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../utils/cn';

interface TaskItemProps {
  task: {
    _id: Id<"checkListItems">;
    title: string;
    isCompleted: boolean;
    userId: Id<"users">;
  };
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const toggleTask = useMutation(api.checkList.toggleCheckListItem);
  const deleteTask = useMutation(api.checkList.deleteCheckListItem);
  const updateTask = useMutation(api.checkList.updateCheckListItemTitle);

  const handleToggle = async () => {
    try {
      await toggleTask({ id: task._id });
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask({ id: task._id });
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSave = async () => {
    if (editTitle.trim() && editTitle !== task.title) {
      try {
        await updateTask({ id: task._id, title: editTitle.trim() });
      } catch (error) {
        console.error('Failed to update task:', error);
        setEditTitle(task.title); // Reset on error
      }
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={cn(
      `group flex items-center gap-4 p-5 
       bg-[var(--surface)] rounded-[var(--radius-lg)] 
       border border-[var(--surface-border)]
       transition-all duration-200 ease-out
       hover:shadow-[var(--shadow-md)] hover:border-[var(--surface-border-hover)]
       hover:-translate-y-0.5`,
      task.isCompleted && "opacity-75 hover:opacity-90"
    )}>
      {/* Custom Checkbox */}
      <button
        onClick={handleToggle}
        className={cn(
          `flex-shrink-0 w-6 h-6 rounded-[var(--radius-md)] border-2 
           transition-all duration-200 ease-out
           focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2
           relative overflow-hidden`,
          task.isCompleted
            ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-[0_4px_12px_0_rgba(103,126,234,0.3)]"
            : "border-[var(--surface-border-hover)] hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
        )}
      >
        {task.isCompleted && (
          <svg 
            className="w-3.5 h-3.5 absolute inset-0 m-auto animate-[checkmark_0.2s_ease-out]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="text-base font-medium border-0 bg-transparent px-0 py-0 h-auto focus:ring-0 focus:shadow-none"
            autoFocus
          />
        ) : (
          <span
            className={cn(
              `text-base font-medium cursor-pointer 
               transition-all duration-200 ease-out
               hover:text-[var(--primary)] select-none`,
              task.isCompleted 
                ? "line-through text-[var(--foreground-muted)]" 
                : "text-[var(--foreground)]"
            )}
            onClick={handleEdit}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className={cn(
        "flex items-center gap-1 transition-all duration-200 ease-out",
        "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
      )}>
        {isEditing ? (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="accent"
              onClick={handleSave}
              disabled={!editTitle.trim()}
              className="h-8 w-8 p-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-8 w-8 p-0 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEdit}
              className="h-8 w-8 p-0 text-[var(--foreground-light)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-[var(--foreground-light)] hover:text-[var(--error)] hover:bg-[var(--error-light)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 