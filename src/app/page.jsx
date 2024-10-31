"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { images } from "@/common";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Input from "@/common/Input";
import axios from "axios";
import Spinner from "@/common/Spinner";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [email, setEmail] = useState("");

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

  const handleBookEvent = (event) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch(`/api/events/${selectedEvent._id}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ tickets, email }),
      });

      if (!response.ok) throw new Error("Booking failed");

      await fetchEvents();
      setShowBookingModal(false);
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600">
            Discover and book amazing events in your area
          </p>
        </div>

        {loading ? (
          <div className="min-h-screen bg-gray-50 flex ga-2 items-center justify-center">
            <Spinner classes={`text-7xl  text-blue-500 `} />{" "}
            <h1>loading .........</h1>
          </div>
        ) : error ? (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-xl text-red-600">{error}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event._id}
                className="hover:shadow-lg transition-shadow h-fit"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={event.image_url || images.graph}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{event.description}</p>

                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(event.date_schedule).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{event.available_tickets} tickets available</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold">
                        RWF {event.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleBookEvent(event)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        disabled={event.available_tickets === 0}
                      >
                        {event.available_tickets > 0 ? "Book Now" : "Sold Out"}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {showBookingModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">
                Book Event: {selectedEvent.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Tickets
                  </label>
                  <select
                    value={tickets}
                    onChange={(e) => setTickets(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                  >
                    {[
                      ...Array(Math.min(5, selectedEvent.available_tickets)),
                    ].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "ticket" : "tickets"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputType="email"
                    type="input"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
