"use client"

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navigation = () => {
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
          <Link href="/dashboard">
            <h1 className="text-xl font-semibold cursor-pointer">
              Analytics Dashboard
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
