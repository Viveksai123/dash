// src/components/MusicList.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlay, faPause, faEllipsisH, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import './MusicList.scss';

const MusicList = ({ 
  songs, 
  currentSong, 
  isPlaying, 
  onSongSelect, 
  onFavoriteToggle, 
  favorites, 
  searchTerm, 
  onSearch,
  activeTab
}) => {
  const [activeOptions, setActiveOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading when changing tabs
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleSongClick = (song) => {
    onSongSelect(song);
  };

  const handleOptionsClick = (e, songId) => {
    e.stopPropagation();
    setActiveOptions(activeOptions === songId ? null : songId);
  };

  const handleFavoriteClick = (e, song) => {
    e.stopPropagation();
    onFavoriteToggle(song);
    setActiveOptions(null);
  };

  const isFavorite = (songId) => {
    return favorites.some(fav => fav.id === songId);
  };

  // Get title for current tab
  const getTabTitle = () => {
    switch(activeTab) {
      case 'forYou': return 'For You';
      case 'topTracks': return 'Top Tracks';
      case 'favorites': return 'Favourites';
      case 'recentlyPlayed': return 'Recently Played';
      default: return 'For You';
    }
  };

  return (
    <div className="music-list-container">
      <h2 className="tab-title">{getTabTitle()}</h2>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search Song, Artist" 
          value={searchTerm} 
          onChange={(e) => onSearch(e.target.value)} 
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      
      {isLoading ? (
        <div className="loading-animation">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : songs.length === 0 ? (
        <div className="no-songs">
          {searchTerm ? 'No songs match your search.' : 'No songs in this section yet.'}
        </div>
      ) : (
        <ul className="song-list">
          {songs.map((song) => (
            <li 
              key={song.id} 
              className={`song-item ${currentSong.id === song.id ? 'active' : ''} slide-up`}
              onClick={() => handleSongClick(song)}
            >
              <img 
                src={song.thumbnail} 
                alt={song.title} 
                className="song-thumbnail" 
              />
              
              <div className="song-info">
                <h4 className="song-title">{song.title}</h4>
                <p className="song-artist">{song.artistName}</p>
              </div>
              
              <div className="song-duration">
                {song.duration}
              </div>
              
              {currentSong.id === song.id && (
                <div className="song-playing">
                  <FontAwesomeIcon 
                    icon={isPlaying ? faPause : faPlay} 
                    className="playing-icon" 
                  />
                </div>
              )}
              
              <div className="song-actions">
                <div className="options-menu">
                  <FontAwesomeIcon 
                    icon={faEllipsisH} 
                    className="options-icon" 
                    onClick={(e) => handleOptionsClick(e, song.id)} 
                  />
                  
                  {activeOptions === song.id && (
                    <div className="options-dropdown">
                      <div 
                        className="option-item" 
                        onClick={(e) => handleFavoriteClick(e, song)}
                      >
                        <FontAwesomeIcon 
                          icon={isFavorite(song.id) ? faHeart : farHeart} 
                          className={isFavorite(song.id) ? 'favorite active' : 'favorite'} 
                        />
                        {isFavorite(song.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MusicList;