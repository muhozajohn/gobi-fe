"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { images } from "@/common";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Input from "@/common/Input";

// Mock data for initial development
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring leading experts",
    date: "2024-12-15",
    location: "Convention Center",
    availableSeats: 200,
    totalSeats: 250,
    image: images.graph,
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
    image: images.salah,
    price: 199,
  },
];

const Home = () => {
  const [events, setEvents] = useState(mockEvents);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleBookEvent = (event) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600">
            Discover and book amazing events in your area
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="hover:shadow-lg transition-shadow h-fit "
            >
              <Image
                src={event.image}
                alt={event.title}
                width={500}
                height={200}
                layout="responsive"
                className="!h-2/6 object-cover !aspect-square  "
              />
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
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.availableSeats} seats available</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold">${event.price}</span>
                    <button
                      onClick={() => handleBookEvent(event)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      disabled={event.availableSeats === 0}
                    >
                      {event.availableSeats > 0 ? "Book Now" : "Sold Out"}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">
                Book Event: {selectedEvent.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Tickets
                  </label>
                  <select className="relative text-primary mt-1 text-xs py-2  duration-100 outline-none justify-between flex items-center gap-6 px-2  w-full rounded-md font-semibold border-2 group-hover:border-primary">
                    {[...Array(5)].map((_, i) => (
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
                    inputType={`email`}
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
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
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
