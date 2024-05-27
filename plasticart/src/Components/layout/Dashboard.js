import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorNav from "../pageviews/VendorNav";
import "../pageviews/dashboard.css";
import { useLocation } from "react-router-dom";
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { appAuth, appFirestore } from "../../config";

const Dashboard = ({ email }) => {
  const [assignedPickups, setAssignedPickups] = useState([]);
  const [completedPickups, setCompletedPickups] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("notifications");
  const { state } = useLocation();
  const fetchPickups = async () => {
    try {
      const pickup = query(collectionGroup(appFirestore, "PICKUP"));
      const querySnapshot = await getDocs(pickup);
      let pick_ups = [];
      let completed = [];
      let notification = [];
      querySnapshot.forEach((doc) => {
        if (
          doc.data().status === "pending" &&
          doc.data().vendor === appAuth.currentUser.email
        ) {
          const pickup = { id: doc.id, data: doc.data() };
          pick_ups.push(pickup);
        }
        if (
          doc.data().status === "complete" &&
          doc.data().vendor === appAuth.currentUser.email
        ) {
          const complete = { id: doc.id, data: doc.data() };
          completed.push(complete);
        }
        if (
          doc.data().status === "pending" &&
          doc.data().vendor === appAuth.currentUser.email &&
          doc.data().isSeen !== true
        ) {
          const _notification = { id: doc.id, data: doc.data() };
          notification.push(_notification);
        }
      });
      setAssignedPickups(pick_ups);
      setCompletedPickups(completed);
      setNotifications(notification);
    } catch (error) {
      console.error("Error fetching pickups:", error);
    }
  };
  const markNotificationsAsRead = async () => {
    try {
      for (const notif of notifications) {
        try {
          await setDoc(
            doc(appFirestore, "USER", notif.data.email, "PICKUP", notif.id),
            { isSeen: true },
            { merge: true }
          );
        } catch (error) {
          console.error("Error marking notification as read:", notif, error);
        }
      }
      fetchPickups();
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const handleMarkAsDone = async (email, id) => {
    try {
      await setDoc(
        doc(appFirestore, "USER", email, "PICKUP", id),
        {
          status: "complete",
        },
        { merge: true }
      );
      fetchPickups();
    } catch (error) {
      console.error("Error marking pickup as done:", error);
    }
  };

  const handleNavigate = (pickupId) => {
    console.log("Navigate to pickup", pickupId);
  };

  const handleClearData = () => {
    setAssignedPickups([]);
    setCompletedPickups([]);
    setNotifications([]);
    localStorage.removeItem(`assignedPickups_${email}`);
    localStorage.removeItem(`completedPickups_${email}`);
    localStorage.removeItem(`notifications_${email}`);
  };

  return (
    <div className="dashboard container">
      <VendorNav />
      <div className="dashboard-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`tab ${activeTab === "assigned" ? "active" : ""}`}
            onClick={() => setActiveTab("assigned")}
          >
            Assigned Pickups
          </button>
          <button
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Pickups
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "notifications" && (
            <div className="notification-list">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Notifications</h2>
                <button
                  type="button"
                  className="hover:underline hover:bg-transparent"
                  onMouseDown={markNotificationsAsRead}
                >
                  Mark as Read
                </button>
              </div>
              <ul>
                {notifications.map((pickup) => (
                  <li
                    key={pickup.id}
                    className="flex flex-col item-start justify-start w-full"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={pickup.data.image}
                        alt="Pickup"
                        className="pickup-image"
                      />
                      <div className="flex items-start justify-start space-y-3 flex-col">
                        <p>Prediction: {pickup.data.prediction}</p>
                        <p>Latitude: {pickup.data.latitude}</p>
                        <p>Longitude: {pickup.data.longitude}</p>
                        <p>Description: {pickup.data.description}</p>
                        <p>Quantity: {pickup.data.quantity}</p>
                        <p>Status: {pickup.data.status}</p>
                      </div>
                    </div>
                    <div className="w-full flex justify-end items-center space-x-3 mt-4">
                      <button
                        onClick={() => handleNavigate(pickup.id)}
                        className="text-base font-light hover:underline"
                      >
                        Navigate
                      </button>
                      <button
                        onClick={() =>
                          handleMarkAsDone(pickup.data.email, pickup.id)
                        }
                        className="text-base font-light hover:underline"
                      >
                        Complete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "assigned" && (
            <div className="pickup-list">
              <h2>Assigned Pickups</h2>
              <ul>
                {assignedPickups.map((pickup) => (
                  <li
                    key={pickup.id}
                    className="flex flex-col item-start justify-start w-full"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={pickup.data.image}
                        alt="Pickup"
                        className="pickup-image"
                      />
                      <div className="flex items-start justify-start space-y-3 flex-col">
                        <p>Prediction: {pickup.data.prediction}</p>
                        <p>Latitude: {pickup.data.latitude}</p>
                        <p>Longitude: {pickup.data.longitude}</p>
                        <p>Description: {pickup.data.description}</p>
                        <p>Quantity: {pickup.data.quantity}</p>
                        <p>Status: {pickup.data.status}</p>
                      </div>
                    </div>
                    <div className="w-full flex justify-end items-center space-x-3 mt-4">
                      <button
                        onClick={() => handleNavigate(pickup.id)}
                        className="text-base font-light hover:underline"
                      >
                        Navigate
                      </button>
                      <button
                        onClick={() =>
                          handleMarkAsDone(pickup.data.email, pickup.id)
                        }
                        className="text-base font-light hover:underline"
                      >
                        Complete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "completed" && (
            <div className="pickup-list">
              <h2>Completed Pickups</h2>
              <ul>
                {completedPickups.map((pickup) => (
                  <li
                    key={pickup.id}
                    className="flex flex-col item-start justify-start w-full"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={pickup.data.image}
                        alt="Pickup"
                        className="pickup-image"
                      />
                      <div className="flex items-start justify-start space-y-3 flex-col">
                        <p>Prediction: {pickup.data.prediction}</p>
                        <p>Latitude: {pickup.data.latitude}</p>
                        <p>Longitude: {pickup.data.longitude}</p>
                        <p>Description: {pickup.data.description}</p>
                        <p>Quantity: {pickup.data.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
