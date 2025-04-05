// src/components/Sidebar.js
import React from 'react';
import './Sidebar.scss';

const Sidebar = ({ activeTab, onTabChange }) => {
  const handleTabClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="Spotify Logo" />
      </div>
      
      <ul className="nav-menu">
        <li 
          className={`nav-item ${activeTab === 'forYou' ? 'active' : ''}`}
          onClick={() => handleTabClick('forYou')}
        >
          For You
        </li>
        <li 
          className={`nav-item ${activeTab === 'topTracks' ? 'active' : ''}`}
          onClick={() => handleTabClick('topTracks')}
        >
          Top Tracks
        </li>
        <li 
          className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => handleTabClick('favorites')}
        >
          Favourites
        </li>
        <li 
          className={`nav-item ${activeTab === 'recentlyPlayed' ? 'active' : ''}`}
          onClick={() => handleTabClick('recentlyPlayed')}
        >
          Recently Played
        </li>
      </ul>
      
      <div className="user-info">
        <div className="user-avatar">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;