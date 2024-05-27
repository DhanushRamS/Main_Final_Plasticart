import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PickupTable.css"; // Changed to .css for direct import

const PickupTable = () => {
  const [pickups, setPickups] = useState([]);
  const [points, setPoints] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found. Please log in.");
          return;
        }

        const result = await axios.get(
          "http://localhost:5000/api/admin/pickups/completed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched Completed Pickups:", result.data); // Debugging statement
        setPickups(result.data);
      } catch (error) {
        console.error("Error fetching pickups:", error);
        setError(
          "Failed to fetch pickups. Please check the console for more details."
        );
      }
    };
    fetchPickups();
  }, []);

  const handleChange = (email, value) => {
    setPoints({ ...points, [email]: value });
  };

  const assignPoints = async (email, pickupId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please log in.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/admin/assign_points",
        {
          email,
          points: points[email],
          pickupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Points assigned successfully");
    } catch (error) {
      console.error("Error assigning points:", error);
      setError(
        "Failed to assign points. Please check the console for more details."
      );
    }
  };

  return (
    <div className="pickuptcontainer">
      <h1 className="pickuptheader">Completed Pickups</h1>
      {error && <p className="error">{error}</p>}
      <table className="pickuptable">
        <thead>
          <tr>
            <th>Email</th>
            <th>Pickup Data</th>
            <th>Quantity</th>
            <th>Assign Points</th>
          </tr>
        </thead>
        <tbody>
          {pickups.map((pickup) =>
            pickup.pickups.map((p) => (
              <tr key={p._id}>
                <td>{pickup.email}</td>
                <td>{p.description}</td>
                <td>{p.quantity}</td>
                <td>
                  <input
                    type="number"
                    className="pointsinput"
                    min="0"
                    onChange={(e) =>
                      handleChange(pickup.email, parseInt(e.target.value))
                    }
                  />
                  <button
                    className="assignbutton"
                    onClick={() => assignPoints(pickup.email, p._id)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PickupTable;
