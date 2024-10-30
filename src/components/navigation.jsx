import Link from "next/link";
const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">EventHub</h1>
        </div>
        <div className="flex space-x-4">
          <Link href="#" className="text-gray-700 mt-2 hover:text-gray-900">
            Events
          </Link>
          <Link href="/login" className="hover:text-gray-900 bg-blue-600 text-white p-2 rounded-md cursor-pointer">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navigation;
