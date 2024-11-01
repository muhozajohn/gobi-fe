"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import axios from "axios";
import Spinner from "@/common/Spinner";

const Bookings = () => {
  const [booking, setbooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    fetchbooking();
  }, []);

  let isRequestPending = false;

  const fetchbooking = async () => {
    if (isRequestPending) return;
    isRequestPending = true;

    try {
      setLoading(true);
      const response = await axios.get(`/api/bookings`);
      setbooking(
        Array.isArray(response.data)
          ? response.data
          : response.data.data.data || []
      );
      setError(null);
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError("Failed to load booking. Please try again later.");
    } finally {
      setLoading(false);
      isRequestPending = false;
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this events?")) {
      return;
    }

    try {
      setLoadingItems((prev) => ({ ...prev, [eventId]: true }));
      const token = localStorage.getItem("token");

      const response = await axios.delete(`/api/bookings/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 204) {
        setbooking((prevBooking) =>
          prevBooking.filter((event) => event._id !== eventId)
        );
        setError(null);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      setError(
        error.response?.data?.error ||
          "Failed to delete the event. Please try again later."
      );
    } finally {
      setLoadingItems((prev) => ({ ...prev, [eventId]: false }));
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total booking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{booking.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {booking.reduce(
                (acc, event) =>
                  acc +
                  (event?.event_id?.available_tickets -
                    event.number_of_tickets),
                0
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {booking.reduce(
                (acc, event) => acc + event?.number_of_tickets,
                0
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* booking Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manage booking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {loading && (
                <tbody>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap " colSpan="7">
                      <div className="text-sm w-full text-center text-blue-500">
                        <p>Loading ...</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}

              {/* Display error message */}
              {error && (
                <tbody>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan="7">
                      <div className="text-sm text-red-500">{error}</div>
                    </td>
                  </tr>
                </tbody>
              )}

              {!loading && !error && (
                <tbody className="bg-white divide-y divide-gray-200">
                  {booking.map((event) => (
                    <tr key={event._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {event?.event_id?.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event?.event_id?.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(
                          event?.event_id?.createdAt
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event?.event_id?.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event?.number_of_tickets}/
                        {event?.event_id?.available_tickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${event?.total_price}
                      </td>
                      <td className="px-6 py-4 flex items-center whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="text-red-600 flex items-center hover:text-red-900"
                          disabled={loadingItems[event._id]}
                        >
                          {loadingItems[event._id] ? (
                            <Spinner />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Bookings;
