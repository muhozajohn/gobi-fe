"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import Spinner from "@/common/Spinner";
import axios from "axios";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  let isRequestPending = false;

  const fetchEvents = async () => {
    if (isRequestPending) return;
    isRequestPending = true;

    try {
      setLoading(true);
      const response = await axios.get(`/api/events`);
      setEvents(
        Array.isArray(response.data)
          ? response.data
          : response.data.data.data || []
      );
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again later.");
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

      const response = await axios.delete(`/api/events/${eventId}`, {
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
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage events</CardTitle>
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
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {event?.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(event?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event?.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event?.available_tickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${event?.price}
                      </td>
                      <td className="px-6 py-4 flex gap-4 items-end  whitespace-nowrap text-right text-sm font-medium">
                        <button
                        //   onClick={() => handleDeleteEvent(event._id)}
                          className="text-blue-600 flex items-center hover:text-red-900"
                          disabled={loadingItems[event._id]}
                        >
                          {loadingItems[event._id] ? (
                            <Spinner />
                          ) : (
                            <Edit className="w-5 h-5" />
                          )}
                        </button>
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
    </div>
  );
};

export default Events;
