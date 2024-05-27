import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { appAuth, appFirestore } from "./config";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function HistoryPage() {
  const [capturedImages, setCapturedImages] = useState([]);
  const [completedPickups, setCompletedPickups] = useState([]);
  const navigate = useNavigate();
  const fetchPickups = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(appFirestore, "USER", appAuth.currentUser?.email, "PICKUP")
      );
      let completed = [];
      querySnapshot.forEach((doc) => {
        const complete = { id: doc.id, data: doc.data() };
        completed.push(complete);
      });
      setCompletedPickups(completed);
    } catch (error) {
      console.error("Error fetching pickups:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(appAuth, async (user) => {
      if (user == null || user === undefined) {
        console.log("User is null or undefined");
        navigate("/Userhome");
      } else {
        await fetchPickups();
      }
    });
  }, []);
  return (
    <div className="h-screen w-full items-center mx-auto  flex flex-col bg-gray-800 p-6 lg:p-6 overflow-y-auto">
      <div className="flex justify-between space-x-12 items-center mt-3 max-w-6xl mx-auto">
        <span className="!text-2xl !font-bold !text-white">Upload History</span>
        <button
          type="button"
          className="text-white !bg-blue-500 hover:bg-blue-600 p-3"
          onClick={() => {
            navigate("/scanner");
          }}
        >
          Scanner
        </button>
      </div>
      <div className="w-full mt-4 flex">
        <div className="">
          <ul className="flex flex-wrap items-center  gap-2 justify-center w-full">
            {completedPickups.map((pickup) => (
              <li
                key={pickup.id}
                className="flex flex-col item-start lg:w-1/2 justify-start w-full border-white border-2 rounded-xl p-4"
              >
                <div className="flex space-x-3 w-full justify-start items-start text-white">
                  <img
                    src={pickup.data.image}
                    alt="Pickup"
                    className="w-full lg:w-1/2"
                  />
                  <div className="flex items-start justify-start space-y-3 flex-col w-1/2">
                    <p>Prediction: {pickup.data.prediction}</p>
                    <p>Latitude: {pickup.data.latitude}</p>
                    <p>Longitude: {pickup.data.longitude}</p>
                    <p>Description: {pickup.data.description}</p>
                    <p>Quantity: {pickup.data.quantity}</p>
                    <p>
                      Status:{" "}
                      <span
                        className={
                          pickup.data.status == "pending"
                            ? "!text-yellow-500"
                            : "!text-green-500"
                        }
                      >
                        {pickup.data.status}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
