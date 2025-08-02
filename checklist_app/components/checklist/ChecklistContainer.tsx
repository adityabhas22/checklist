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
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6c47ff]"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading your tasks...</span>
      </div>
    );
  }

  // If user needs to be created (show this temporarily while creating)
  if (userInfo && 'needsCreation' in userInfo && userInfo.needsCreation) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Setting up your account...</span>
      </div>
    );
  }

  // Main checklist interface
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          My Checklist
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay organized and get things done
        </p>
      </div>

      {/* Task Form */}
      <div className="mb-8">
        <TaskForm />
      </div>

      {/* Task List */}
      <TaskList 
        tasks={tasks || []} 
        isLoading={tasks === undefined}
      />
    </div>
  );
} 