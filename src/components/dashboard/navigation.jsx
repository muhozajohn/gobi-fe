"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, PlusCircle } from "lucide-react";

const Navigation = ({ click }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
    localStorage.removeItem("token");

    // Redirect to home page
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={click}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Event
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-700"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
