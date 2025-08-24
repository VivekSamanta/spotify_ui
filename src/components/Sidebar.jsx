import React from 'react';
import { Nav } from 'react-bootstrap';
import { BsSpotify } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../styles/Sidebar.scss';
import profileImg from '../assets/images/profile.jpg';

const Sidebar = ({ onPageChange, currentPage, isOpen, toggleSidebar }) => {
  const navLinks = [
    { label: 'For You', key: 'foryou' },
    { label: 'Top Tracks', key: 'toptracks' },
    { label: 'Favourites', key: 'favourites' },
    { label: 'Recently Played', key: 'recentlyplayed' },
  ];

  return (
    <>
      <button className="hamburger d-md-none" onClick={toggleSidebar}>
        <GiHamburgerMenu size={24} />
      </button>

      <div className={`sidebar d-flex flex-column justify-content-between p-4 ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="logo d-flex align-items-center gap-2 mb-4">
            <BsSpotify size={24} />
            <h4 className="m-0">Spotify</h4>
          </div>
          <Nav className="flex-column">
            {navLinks.map(link => (
              <Nav.Link
                key={link.key}
                onClick={() => {
                  onPageChange(link.key);
                  if (window.innerWidth < 768) toggleSidebar(); // auto-close on mobile
                }}
                className={currentPage === link.key ? 'active' : ''}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>
        <div className="profile-icon mt-auto">
          <img src={profileImg} alt="User" className="rounded-circle" width="40" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;