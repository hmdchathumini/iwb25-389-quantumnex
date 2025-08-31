import React, { useState } from "react";
import { Bell, CheckCircle, XCircle, Calendar } from "lucide-react";

export default function WorkerNotificationTab() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new-task",
      title: "New Task Available",
      message: "Customer posted a task: Clean 3-bedroom house",
      time: "2 mins ago",
      status: "unread",
    },
    {
      id: 2,
      type: "accepted",
      title: "Accepted by Customer",
      message: "Customer accepted you for Garden Cleaning task",
      time: "1 hour ago",
      status: "read",
    },
    {
      id: 3,
      type: "rejected",
      title: "Not Selected",
      message: "Customer chose another worker for Painting task",
      time: "Yesterday",
      status: "read",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, status: "read" } : n
      )
    );
  };

  const clearAll = () => setNotifications([]);

  return (
    <div className="p-6">
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

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl shadow-md flex items-start justify-between ${
                n.status === "unread"
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "bg-white"
              }`}
            >
              <div className="flex gap-3">
                {n.type === "new-task" && <Calendar className="text-blue-500" />}
                {n.type === "accepted" && <CheckCircle className="text-green-500" />}
                {n.type === "rejected" && <XCircle className="text-red-500" />}

                <div>
                  <h4 className="font-medium">{n.title}</h4>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
              </div>
              {n.status === "unread" && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
