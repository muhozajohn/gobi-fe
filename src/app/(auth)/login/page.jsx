import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";
const LoginPage = () => {
  return (
    <section className="py-16 flex flex-col gap-2 mt-10 bg-gray-50">
      <Link
        href="/"
        className=" flex items-center p-4 ml-5 w-fit bg-gray-300 rounded-md  "
      >
        <HomeIcon className="inline-block text-blue-700 h-6 w-6 " />
        <span className="ml-3 text-sm font-medium text-gray-900">Home</span>
      </Link>
      <div className=" w-full md:!w-1/3 !mx-auto  px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Login to Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <Link href="/dashboard">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
