import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../dashboard.scss";

const SideNavLeft = () => {
  const navigate = useNavigate();

  return (
    <ul className="sidenav sidenav-left shadow">
      <li>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/accepted-pickups')}
        >
          Accepted Pickups
        </button>
      </li>
      <li>
        <button
          className="btn btn-search-profile btn-outline-success"
          onClick={() => navigate('/rejected-pickups')}
        >
          Rejected Pickups
        </button>
      </li>
    </ul>
  );
};

export default SideNavLeft;
