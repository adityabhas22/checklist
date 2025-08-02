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
      "group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md",
      task.isCompleted && "opacity-75"
    )}>
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6c47ff] focus:ring-offset-2",
          task.isCompleted
            ? "bg-[#6c47ff] border-[#6c47ff] text-white"
            : "border-gray-300 hover:border-[#6c47ff] dark:border-gray-600"
        )}
      >
        {task.isCompleted && (
          <svg className="w-3 h-3 mx-auto" fill="currentColor" viewBox="0 0 20 20">
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
            className="text-base"
            autoFocus
          />
        ) : (
          <span
            className={cn(
              "text-base text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#6c47ff] transition-colors",
              task.isCompleted && "line-through text-gray-500 dark:text-gray-400"
            )}
            onClick={handleEdit}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={handleSave}
              disabled={!editTitle.trim()}
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEdit}
              className="text-gray-500 hover:text-[#6c47ff]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="text-gray-500 hover:text-red-500"
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