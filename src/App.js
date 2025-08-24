import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/App.scss';
import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import MusicPlayer from './components/MusicPlayer';
import useDominantColor from './hooks/useDominantColor';
import viva from './assets/images/viva.png'
import starboy from './assets/images/starboy.png'
import demons from './assets/images/demons.jpg'
import mouth from './assets/images/mouth.jpg'
import ghost from './assets/images/ghost.png'
import sparks from './assets/images/sparks.jpg'
import hymn from './assets/images/hymn.jpg'
import pain from './assets/images/pain.jpg'
import weekend from './assets/songs/song2.mp3'

const songsData = [
  { title: 'Viva La Vida', thumbnail: viva, musicUrl: 'viva-la-vida.mp3', duration: '5:32', artistName: 'Coldplay' },
  { title: 'Starboy', thumbnail: starboy, musicUrl: 'starboy.mp3', duration: '4:16', artistName: 'The Weeknd' },
  { title: 'Demons', thumbnail: demons, musicUrl: 'demons.mp3', duration: '5:24', artistName: 'Imagine Dragons' },
  { title: 'Mouth of the River', thumbnail: mouth, musicUrl: 'mouth-of-the-river.mp3', duration: '4:45', artistName: 'Imagine Dragons' },
  { title: 'Ghost Stories', thumbnail: ghost, musicUrl: 'ghost-stories.mp3', duration: '3:10', artistName: 'Coldplay' },
  { title: 'Sparks', thumbnail: sparks, musicUrl: 'sparks.mp3', duration: '4:23', artistName: 'Coldplay' },
  { title: 'Hymn for the weekend', thumbnail: hymn, musicUrl: weekend, duration: '2:23', artistName: 'Coldplay' },
  { title: 'Pain', thumbnail: pain, musicUrl: 'pain.mp3', duration: '3:42', artistName: 'Ryan Jones' }
];

function App() {
  const [currentPage, setCurrentPage] = useState('foryou');
  const [songs, setSongs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [recentlyPlayed, setRecentlyPlayed] = useState(JSON.parse(sessionStorage.getItem('recentlyPlayed')) || []);
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);
  const [showFavouritePopup, setShowFavouritePopup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dominantColor = useDominantColor(currentSong.thumbnail);

  useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, ${dominantColor}, #111)`;
  }, [dominantColor]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    const updatedRecent = [song, ...recentlyPlayed.filter(s => s.title !== song.title)].slice(0, 10);
    setRecentlyPlayed(updatedRecent);
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
  };

  const toggleFavourite = (song) => {
    const exists = favourites.find(s => s.title === song.title);
    const updatedFavourites = exists
      ? favourites.filter(s => s.title !== song.title)
      : [song, ...favourites];
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getSongsToDisplay = () => {
    switch (currentPage) {
      case 'toptracks':
        return [...songsData].slice(0, 5);
      case 'recentlyplayed':
        return recentlyPlayed;
      case 'favourites':
        return favourites;
      default:
        return songsData;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'toptracks':
        return 'Top Tracks';
      case 'recentlyplayed':
        return 'Recently Played';
      case 'favourites':
        return 'Favourites';
      default:
        return 'For You';
    }
  };

  return (
    <Container fluid className="app">
      <Row className="h-100">
        <Col md={2} className="p-0 position-relative">
          <Sidebar
            onPageChange={handlePageChange}
            currentPage={currentPage}
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </Col>

        <Col md={4} className="p-4 order-2 order-md-1">
          <h2 className="mb-3 px-2">{getPageTitle()}</h2>
          <SongList
            songs={getSongsToDisplay()}
            currentSong={currentSong}
            playSong={playSong}
            pageKey={currentPage}
          />
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-center order-1 order-md-2">
          <MusicPlayer
            song={currentSong}
            onToggleFavourite={() => toggleFavourite(currentSong)}
            isFavourite={favourites.some(s => s.title === currentSong.title)}
            showFavouritePopup={showFavouritePopup}
            setShowFavouritePopup={setShowFavouritePopup}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;