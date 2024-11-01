"use client";
import { useState } from "react";
import Navigation from "@/components/dashboard/navigation";
import Bookings from "@/components/dashboard/bookings";
import Events from "@/components/dashboard/events";
import Modal from "@/components/dashboard/eventModel";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const[eventModal, setModal] = useState(false);

  const handleModol = () => {
    setModal(!eventModal);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <Navigation click={handleModol} />

      <div className="max-w-7xl flex items-center gap-2 mx-auto py-6 sm:px-6 lg:px-8">
        <button
          className={`text-lg font-bold ${
            activeTab === "events" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
        <button
          className={`text-lg font-bold ${
            activeTab === "bookings" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
      </div>

      {/* Conditionally render components based on the active tab */}
      {activeTab === "events" && <Events />}
      {activeTab === "bookings" && <Bookings />}
      {/* Event Model Modal */}
      {eventModal && <Modal close={handleModol} />}
    </div>
  );
};

export default AdminDashboard;
