"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import Navigation from "@/components/dashboard/navigation";
import Input from "@/common/Input";

// Mock data included in the component
const initialEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring leading experts",
    date: "2024-12-15",
    location: "Convention Center",
    availableSeats: 200,
    totalSeats: 250,
    price: 299,
  },
  {
    id: 2,
    title: "Music Festival",
    description: "Three days of live music performances",
    date: "2024-11-20",
    location: "City Park",
    availableSeats: 150,
    totalSeats: 500,
    price: 199,
  },
  {
    id: 3,
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring leading experts",
    date: "2024-12-15",
    location: "Huye",
    availableSeats: 300,
    totalSeats: 350,
    price: 299,
  },
];

const AdminDashboard = () => {
  const [events, setEvents] = useState(initialEvents);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}

      <Navigation click={handleAddEvent} />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{events.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {events.reduce((acc, event) => acc + event.availableSeats, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {events.reduce(
                  (acc, event) =>
                    acc + (event.totalSeats - event.availableSeats),
                  0
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Events</CardTitle>
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.availableSeats}/{event.totalSeats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${event.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">
                {editingEvent ? "Edit Event" : "Add New Event"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Title
                  </label>
                  <Input
                    inputType={`text`}
                    type="input"
                    className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue={editingEvent?.title}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Input
                    className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    defaultValue={editingEvent?.description}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <Input
                      inputType={`date`}
                      type="input"
                      className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={editingEvent?.date}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <Input
                      inputType={`text`}
                      type="input"
                      className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={editingEvent?.location}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Seats
                    </label>
                    <Input
                      inputType={`number`}
                      type="input"
                      className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={editingEvent?.totalSeats}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <Input
                      inputType={`number`}
                      type="input"
                      className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={editingEvent?.price}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    {editingEvent ? "Save Changes" : "Create Event"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
