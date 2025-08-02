"use client";

import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { ChecklistContainer } from "../components/checklist/ChecklistContainer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
            ✅ Checklist App
          </h1>
          
          <Authenticated>
            <ChecklistContainer />
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


