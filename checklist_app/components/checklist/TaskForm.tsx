"use client";

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TaskFormProps {
  onTaskCreated?: () => void;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createTask = useMutation(api.checkList.createCheckList);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await createTask({ title: title.trim() });
      setTitle('');
      onTaskCreated?.();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your task here..."
            disabled={isSubmitting}
            className="text-base placeholder:text-[var(--foreground-light)]"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!title.trim() || isSubmitting}
            isLoading={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </Button>
          {title.trim() && (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => setTitle('')}
              disabled={isSubmitting}
              className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          )}
        </div>
      </div>
      
      {/* Quick Tips */}
      <div className="flex items-center gap-3 text-xs text-[var(--foreground-light)]">
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-[var(--surface-hover)] border border-[var(--surface-border)] rounded text-[10px] font-mono">Enter</kbd>
          <span>to add task</span>
        </div>
        <div className="w-1 h-1 bg-[var(--foreground-light)] rounded-full"></div>
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-[var(--surface-hover)] border border-[var(--surface-border)] rounded text-[10px] font-mono">Esc</kbd>
          <span>to clear</span>
        </div>
      </div>
    </form>
  );
} 