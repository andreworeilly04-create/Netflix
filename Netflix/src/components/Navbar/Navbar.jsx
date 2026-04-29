import React, { useRef, useEffect, useState } from 'react'
import "./Navbar.css"
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret from '../../assets/caret_icon.svg'
import { logout } from '../../Firebase'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ setSearch, showField, setshowField, toggleMenu, setToggleMenu, isActive }) => {

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const openMenu = () => {
    setToggleMenu(!toggleMenu);
  }


  const navRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark')
      } else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  }, [])


  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <Link to="/"><img src={logo} alt="Netflix" /></Link>
        <ul>
          <NavLink className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'} to="/"><li>Home</li></NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'} to="/tv"><li>Tv Shows</li></NavLink>
          <NavLink className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'} to="/movies"><li>Movies</li></NavLink>
        </ul>
      </div>
      <div className="bars_container">
        <button className="bars"><FontAwesomeIcon onClick={openMenu} icon={faBars} /> </button>
      </div>

      <div className="navbar-right">
        <img onClick={() => setshowField(!showField)} src={search} alt="Search Icon" className="icons" />
        <input className={`search_field ${showField ? 'active' : ''}`} type="text" placeholder="Search Movies and Tv..." onChange={handleSearch} />
        <p>Everyone</p>
        <img src={bell} alt="Bell Icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile} alt="Profile" className="profile" />
          <img src={caret} alt="Caret Icon" />
          <div className="dropdown">
            <p onClick={() => { logout() }}>Sign Out</p>
          </div>
        </div>
      </div>
      <div className="mobile_menu--container">
        <div className={`mobile_menu ${toggleMenu ? 'active' : ''}`}>
          <NavLink onClick={openMenu} className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'} to="/">Home</NavLink>
          <NavLink onClick={openMenu} className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'} to="/tv">Tv Shows</NavLink>
          <NavLink onClick={openMenu} className={({ isActive }) => isActive ? 'nav_link active' : 'nav_link'} to="/movies">Movies</NavLink>
          <button className="times"><FontAwesomeIcon onClick={openMenu} icon={faTimes} /></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar