import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

const CustomerDataTable = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      signupDate: "2024-01-15",
      lastActivity: "2024-03-17",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      signupDate: "2024-02-01",
      lastActivity: "2024-03-16",
    },
    // ... more customer data
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Data</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="pl-10 pr-4 py-2 w-full border rounded-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Signup Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="px-4 py-3 text-sm">{customer.name}</td>
                  <td className="px-4 py-3 text-sm">{customer.email}</td>
                  <td className="px-4 py-3 text-sm">{customer.signupDate}</td>
                  <td className="px-4 py-3 text-sm">{customer.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Showing 1 to 10 of 100 entries
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border rounded">
                Previous
              </button>
              <button className="px-3 py-1 text-sm border rounded bg-blue-600 text-white">
                1
              </button>
              <button className="px-3 py-1 text-sm border rounded">2</button>
              <button className="px-3 py-1 text-sm border rounded">3</button>
              <button className="px-3 py-1 text-sm border rounded">Next</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDataTable;
