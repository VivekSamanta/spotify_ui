import React, { useEffect, useRef, useState } from 'react';
import '../styles/MusicPlayer.scss';
import { FaBackward, FaForward, FaPlay, FaPause, FaEllipsisH, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';

const MusicPlayer = ({ song, onToggleFavourite, isFavourite, showFavouritePopup, setShowFavouritePopup }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, song]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio?.addEventListener('timeupdate', updateProgress);
    return () => {
      audio?.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const togglePopup = () => setShowFavouritePopup(!showFavouritePopup);

  const handleProgressClick = (e) => {
    const bar = progressBarRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
  };

  const handleVolumeToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };  

  return (
    <div className="music-player">
      <div className="top-row">
        <div className="song-details">
          <h3>{song?.title || 'No Title'}</h3>
          <p>{song?.artistName || 'Unknown Artist'}</p>
        </div>
        <div className="album-artwork">
          <img src={song?.thumbnail} alt={song?.title || 'Album Cover'} />
        </div>
      </div>

      <div className="progress-bar" ref={progressBarRef} onClick={handleProgressClick}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="controls">
        <Container>
          <Row>
            <Col>
              <div className="more-options">
                <button onClick={togglePopup}><FaEllipsisH /></button>
                {showFavouritePopup && (
                  <div className="popup">
                    <button onClick={onToggleFavourite}>
                      {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                    </button>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={6}>
              <div className="play-controls">
                <button><FaBackward /></button>
                <button onClick={togglePlay} className="play-button">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button><FaForward /></button>
              </div>
            </Col>
            <Col>
              <div className="volume">
                <button onClick={handleVolumeToggle}>
                  {isMuted ? <FaVolumeMute style={{ opacity: 0.4 }} /> : <FaVolumeUp />}
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <audio ref={audioRef} src={typeof song.musicUrl === 'string' ? song.musicUrl : ''} />
    </div>
  );
};

export default MusicPlayer;