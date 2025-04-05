// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import MusicList from './components/MusicList';
import Player from './components/Player';
import MobileMenu from './components/MobileMenu';
import { songsData } from './data/songs';
import { extractDominantColor } from './utils/colorUtils';
import './App.scss';

const App = () => {
  const [songs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('forYou');
  const [favorites, setFavorites] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(currentSong.color || '#121212');
  const audioRef = useRef(null);
  
  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Load favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    
    const storedRecentlyPlayed = JSON.parse(sessionStorage.getItem('recentlyPlayed')) || [];
    setRecentlyPlayed(storedRecentlyPlayed);
  }, []);

  // Save favorites to local storage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save recently played to session storage when updated
  useEffect(() => {
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle song selection
  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    // Update background color
    if (song.color) {
      setBackgroundColor(song.color);
    } else {
      // If no color is predefined, try to extract it
      extractDominantColor(song.thumbnail)
        .then(color => {
          setBackgroundColor(color);
        })
        .catch(() => {
          setBackgroundColor('#121212'); // Default fallback
        });
    }
    
    // Update recently played
    const updatedRecent = [song, ...recentlyPlayed.filter(item => item.id !== song.id)].slice(0, 10);
    setRecentlyPlayed(updatedRecent);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle next song
  const nextSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handleSongSelect(songs[nextIndex]);
  };

  // Handle previous song
  const prevSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    handleSongSelect(songs[prevIndex]);
  };

  // Toggle favorite
  const toggleFavorite = (song) => {
    const isFavorite = favorites.some(fav => fav.id === song.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== song.id));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter songs based on active tab and search term
  const getFilteredSongs = () => {
    let filteredSongs = songs;
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filteredSongs = filteredSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (activeTab === 'favorites') {
      return favorites.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'recentlyPlayed') {
      return recentlyPlayed.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredSongs;
  };

  return (
    <div className="app" style={{ 
      background: `linear-gradient(to bottom, ${backgroundColor}22, #121212)`,
      transition: 'background 0.5s ease'
    }}>
      <MobileMenu 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <Container fluid>
        <Row>
          <Col md={3} className={`sidebar-col ${isSidebarOpen ? 'active' : ''}`}>
            <Sidebar 
              activeTab={activeTab} 
              onTabChange={(tab) => {
                handleTabChange(tab);
                setIsSidebarOpen(false); // Close sidebar after selection on mobile
              }}
            />
          </Col>
          <Col md={9} className="content-col">
            <Row className="d-flex flex-column-reverse flex-md-row">
              <Col md={6} className="music-list-col">
                <MusicList 
                  songs={getFilteredSongs()} 
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onSongSelect={handleSongSelect}
                  onFavoriteToggle={toggleFavorite}
                  favorites={favorites}
                  searchTerm={searchTerm}
                  onSearch={handleSearch}
                  activeTab={activeTab}
                />
              </Col>
              <Col md={6} className="player-col">
                <Player 
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onTogglePlay={togglePlay}
                  onNext={nextSong}
                  onPrev={prevSong}
                  audioRef={audioRef}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <audio 
        ref={audioRef}
        src={currentSong.musicUrl}
        onEnded={nextSong}
      />
    </div>
  );
};

export default App;