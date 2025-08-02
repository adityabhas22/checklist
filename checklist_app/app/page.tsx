"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { SignUpButton, SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
            ✅ Checklist App
          </h1>
          
          <Authenticated>
            <AuthenticatedContent />
          </Authenticated>
          
          <Unauthenticated>
            <UnauthenticatedContent />
          </Unauthenticated>
        </div>
      </main>
    </>
  );
}

function UnauthenticatedContent() {
  return (
    <div className="text-center space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to Your Personal Checklist
        </h2>
        <p className="text-gray-600 mb-6">
          Sign in to create and manage your todo items with a beautiful, simple interface.
        </p>
        
        <div className="space-y-4">
          <SignInButton mode="modal">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              Sign In
            </button>
          </SignInButton>
          
          <SignUpButton mode="modal">
            <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        🔒 Your data is secure and private
      </div>
    </div>
  );
}

function AuthenticatedContent() {
  const userInfo = useQuery(api.users.getCurrentUserInfo);
  const createCurrentUser = useMutation(api.users.createCurrentUser);
  
  // Auto-create user if needed
  useEffect(() => {
    if (userInfo && 'needsCreation' in userInfo && userInfo.needsCreation) {
      createCurrentUser()
        .then(() => {
          // User created successfully, the query will refetch automatically
          console.log("User created successfully in Convex database");
        })
        .catch((error) => {
          console.error("Failed to create user:", error);
        });
    }
  }, [userInfo, createCurrentUser]);
  
  if (userInfo === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Show creating user state
  if (userInfo && 'needsCreation' in userInfo && userInfo.needsCreation) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Setting up your account...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome back, {userInfo?.name || "there"}! 👋
            </h2>
            <p className="text-gray-600 mt-1">
              Ready to tackle your tasks?
            </p>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🚀 Your Checklist App is Ready!
        </h3>
        <p className="text-gray-600 mb-4">
          Authentication is working perfectly. Your user account has been created in the database.
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <p>✅ Clerk authentication configured</p>
          <p>✅ User created in Convex database</p>
          <p>✅ Database schema defined</p>
          <p>⏳ Beautiful checklist UI (coming next!)</p>
        </div>
      </div>

             {/* Debug info for development */}
       {process.env.NODE_ENV === 'development' && (
         <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
           <strong>Debug Info:</strong><br />
           User ID: {userInfo?.clerkId}<br />
           Email: {userInfo?.email}<br />
           Database User: {userInfo && '_id' in userInfo ? `Created (${userInfo._id})` : 'Unknown'}
         </div>
       )}
    </div>
  );
}
