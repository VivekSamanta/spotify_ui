import React, { useState } from 'react';
import { ListGroup, FormControl } from 'react-bootstrap';
import '../styles/SongList.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

function SongList({ songs, currentSong, playSong, pageKey }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artistName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="song-list">
      <div className="search-wrapper mb-3">
        <FormControl
          type="text"
          placeholder="Search Song, Artist"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>

      <ListGroup variant="flush">
        <AnimatePresence mode="popLayout">
          {filteredSongs.map((song, index) => (
            <motion.div
              key={`${pageKey}-${song.title}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.07 }}
              layout
            >
              <ListGroup.Item
                className={`d-flex justify-content-between align-items-center song-item ${song.title === currentSong.title ? 'active' : ''}`}
                onClick={() => playSong(song)}
              >
                <div className="d-flex align-items-center">
                  <img src={song.thumbnail} alt={song.title} className="thumbnail me-2" />
                  <div>
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artistName}</div>
                  </div>
                </div>
                <div className="song-duration">{song.duration}</div>
              </ListGroup.Item>
            </motion.div>
          ))}
        </AnimatePresence>
      </ListGroup>
    </div>
  );
}

export default SongList;