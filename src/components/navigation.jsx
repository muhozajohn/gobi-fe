import React from "react";
import { LineChart, FileLineChartIcon } from "lucide-react";
import Link from "next/link";
const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <LineChart className="h-8 w-8 text-blue-600" />
            <Link href="/" className="ml-2 text-sm md:text-xl font-bold">
              Analytics Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <Link href="/" className="hidden md:flex">Documentation</Link>
              <FileLineChartIcon className="h-8 w-8 flex md:hidden text-blue-600" />
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              <Link href="/login">Login</Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
