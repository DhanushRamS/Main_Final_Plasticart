import React from "react";
import PropTypes from "prop-types";
import styles from "./PickupNotifications.module.css";

const PickupNotifications = ({ email, pickups, onAccept, onReject }) => {
  return (
    <div className={styles.notifications}>
      <h2 className="picknh">Pending Pickups</h2>
      <ul>
        {pickups.map((pickup) => (
          <li key={pickup._id} className={styles.pickupItem}>
            <img
              src={pickup.image}
              alt="Pickup"
              className={styles.pickupImage}
            />
            <p>Prediction: {pickup.prediction}</p>
            <p>Latitude: {pickup.latitude}</p>
            <p>Longitude: {pickup.longitude}</p>
            <p>Description: {pickup.description}</p>
            <p>Quantity: {pickup.quantity}</p>
            <div className={styles.actions}>
              <button
                className={styles.acceptButton}
                onClick={() => onAccept(pickup._id)}
              >
                Accept
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => onReject(pickup._id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

PickupNotifications.propTypes = {
  email: PropTypes.string.isRequired,
  pickups: PropTypes.array.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default PickupNotifications;
