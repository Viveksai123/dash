// src/components/Player.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faStepForward, 
  faStepBackward, 
  faVolumeUp, 
  faVolumeMute,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import './Player.scss';

const Player = ({ 
  currentSong, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrev, 
  audioRef
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  
  // Update audio element when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);
  
  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioRef]);
  
  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    // Time update handler
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Duration change handler
    const handleDurationChange = () => {
      setDuration(audio.duration);
    };
    
    // Load metadata handler
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Remove event listeners on cleanup
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioRef]);
  
  // Handle progress bar click
  const handleProgressClick = (e) => {
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const progressWidth = progressRect.width;
    const seekTime = (clickPosition / progressWidth) * duration;
    
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    const volumeRect = volumeRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - volumeRect.left;
    const volumeWidth = volumeRect.width;
    const newVolume = Math.max(0, Math.min(1, clickPosition / volumeWidth));
    
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Format time in MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="player-container">
      <div className="album-art">
        <img 
          src={currentSong.thumbnail} 
          alt={currentSong.title} 
          className="album-image album-shadow"
        />
      </div>
      
      <div className="song-details">
        <h3 className="song-title">{currentSong.title}</h3>
        <p className="song-artist">{currentSong.artistName}</p>
      </div>
      
      <div className="player-controls">
        <div className="control-buttons">
          <button className="control-btn" onClick={onPrev}>
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          
          <button className="control-btn play-btn" onClick={onTogglePlay}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          
          <button className="control-btn" onClick={onNext}>
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </div>
        
        <div className="progress-container">
          <span className="time-current">{formatTime(currentTime)}</span>
          
          <div 
            className="progress-bar" 
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div 
              className="progress-current"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          
          <span className="time-total">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="volume-controls">
        <button className="volume-btn" onClick={toggleMute}>
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </button>
        
        <div 
          className="volume-slider" 
          ref={volumeRef}
          onClick={handleVolumeChange}
        >
          <div 
            className="volume-level"
            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="more-options">
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
    </div>
  );
};

export default Player;