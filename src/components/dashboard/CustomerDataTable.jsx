"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";

const CustomerDataTable = ({ initialCustomers = [] }) => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (initialCustomers.length === 0) {
      fetchCustomers(page);
    }
  }, [initialCustomers.length, page]);

  const fetchCustomers = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/customers?page=${pageNumber}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to load customers. Please try again later.");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
    fetchCustomers(newPage);
  };

  const filteredCustomers =
    customers?.filter(
      (customer) =>
        customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Customer Data</span>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <>
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
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-sm">{customer.name}</td>
                        <td className="px-4 py-3 text-sm">{customer.email}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(customer.signup_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(
                            customer.last_activity
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-8 text-gray-500"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Loading customers...
                          </span>
                        ) : (
                          "No customers found"
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Showing {filteredCustomers.length} entries
                </p>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={loading}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDataTable;
