import React from "react";
import styles from "./SideNavRight.module.css";

const SideNavRight = ({ email, acceptedPickups }) => {
  return (
    <div className={styles.sidenavRight}>
      <h2>Accepted Pickups</h2>
      <ul>
        {acceptedPickups.map((pickup) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavRight;
