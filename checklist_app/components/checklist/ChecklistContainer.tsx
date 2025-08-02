"use client";

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export function ChecklistContainer() {
  const { user, isLoaded } = useUser();
  
  // Get user info from Convex
  const userInfo = useQuery(api.users.getCurrentUserInfo);
  
  // Auto-create user mutation
  const createCurrentUser = useMutation(api.users.createCurrentUser);
  
  // Get checklist items - the query handles user authentication internally  
  const tasks = useQuery(
    api.checkList.getCheckListItems,
    userInfo && !('needsCreation' in userInfo) ? {} : "skip"
  );

  // Auto-create user if needed
  useEffect(() => {
    if (userInfo && 'needsCreation' in userInfo && userInfo.needsCreation) {
      createCurrentUser()
        .then(() => {
          console.log("User created successfully in Convex database");
        })
        .catch((error) => {
          console.error("Failed to create user:", error);
        });
    }
  }, [userInfo, createCurrentUser]);

  // Show loading state while Clerk is loading or user info is loading
  if (!isLoaded || userInfo === undefined) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-[var(--surface-border)] border-t-[var(--primary)] animate-spin"></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Loading your workspace</h3>
            <p className="text-sm text-[var(--foreground-muted)]">Setting up your personalized experience...</p>
          </div>
        </div>
      </div>
    );
  }

  // If user needs to be created (show this temporarily while creating)
  if (userInfo && 'needsCreation' in userInfo && userInfo.needsCreation) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-[var(--surface-border)] border-t-[var(--accent)] animate-spin"></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">Creating your account</h3>
            <p className="text-sm text-[var(--foreground-muted)]">Just a moment while we set things up...</p>
          </div>
        </div>
      </div>
    );
  }

  // Main checklist interface
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] mb-6 shadow-[var(--shadow-lg)]">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-3 tracking-tight">
            My Checklist
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-md mx-auto leading-relaxed">
            Stay organized, focused, and get things done with elegance
          </p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {/* Task Form Card */}
          <div className="bg-[var(--surface)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-lg)] border border-[var(--surface-border)]">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">Add New Task</h2>
              <p className="text-sm text-[var(--foreground-muted)]">What would you like to accomplish today?</p>
            </div>
            <TaskForm />
          </div>

          {/* Task List Card */}
          <div className="bg-[var(--surface)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-lg)] border border-[var(--surface-border)]">
            <TaskList 
              tasks={tasks || []} 
              isLoading={tasks === undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 