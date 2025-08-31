import React, { useState } from "react";
import { Bell, Info, Calendar, CheckCircle } from "lucide-react";

export default function CustomerNotificationTab() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "worker-request",
      title: "Worker Request",
      message: "Nipun Silva wants to take your Cleaning task",
      time: "10 mins ago",
      status: "pending",
      worker: {
        name: "Nipun Silva",
        rating: 4.8,
        skills: "Cleaning, Organizing",
      },
      task: {
        title: "Deep Cleaning Apartment",
        description: "A thorough cleaning needed for 2-bedroom apartment."
      }
    },
    {
      id: 2,
      type: "reminder",
      title: "Task Reminder",
      message: "Cooking task scheduled tomorrow at 10 AM",
      time: "5 hours ago",
      status: "read",
    },
    {
      id: 3,
      type: "update",
      title: "Task Completed",
      message: "Your last Gardening task was completed successfully 🎉",
      time: "Yesterday",
      status: "read",
    },
  ]);

  const handleDecision = (id, decision) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: decision } : n
      )
    );
  };

  const clearAll = () => setNotifications([]);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="text-blue-500" /> Notifications
        </h2>
        <button
          onClick={clearAll}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Clear All
        </button>
      </div>

      {/* Empty state */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start ${
                n.status === "pending" && n.type === "worker-request"
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "bg-white"
              }`}
            >
              {/* Left side: icon + message */}
              <div className="flex gap-3 flex-1">
                {n.type === "worker-request" && <Info className="text-blue-500" />}
                {n.type === "reminder" && <Calendar className="text-purple-500" />}
                {n.type === "update" && <CheckCircle className="text-green-500" />}
                <div>
                  <h4 className="font-medium">{n.title}</h4>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>

                  {/* Worker details with text avatar */}
                  {n.type === "worker-request" && n.worker && (
                    <div className="mt-2 p-2 bg-gray-100 rounded-md flex gap-3 items-center">
                      <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                        {getInitials(n.worker.name)}
                      </div>
                      <div>
                        <p className="font-semibold">{n.worker.name}</p>
                        <p className="text-sm text-gray-600">
                          Rating: {n.worker.rating} ⭐
                        </p>
                        <p className="text-sm text-gray-600">
                          Skills: {n.worker.skills}
                        </p>
                        <p className="text-sm"><strong>Task:</strong> {n.task.title}</p>
                        <p className="text-sm text-gray-600">{n.task.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side: actions */}
              {n.type === "worker-request" && n.status === "pending" && (
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleDecision(n.id, "accepted")}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(n.id, "rejected")}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}

              {n.status === "accepted" && (
                <span className="text-green-600 font-semibold mt-2 md:mt-0">Accepted ✅</span>
              )}
              {n.status === "rejected" && (
                <span className="text-red-600 font-semibold mt-2 md:mt-0">Rejected ❌</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
