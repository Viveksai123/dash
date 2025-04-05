// src/components/MobileMenu.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './MobileMenu.scss';

const MobileMenu = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="mobile-menu">
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>
    </div>
  );
};

export default MobileMenu;