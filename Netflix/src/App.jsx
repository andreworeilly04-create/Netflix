import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Movies from './pages/Movies/Movies'
import Tv from './pages/Tv/Tv'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

const App = () => {

  const navigate = useNavigate();

   const location = useLocation();

   const hideLayout = location.pathname.startsWith('/login') || location.pathname.startsWith('/player');

useEffect(()=>{
  onAuthStateChanged(auth, async (user)=>{
    if(user){
      console.log("Logged In");
      navigate("/")
    } else  {
      console.log("Logged Out");
      navigate('/login')
    }
  })
},[])

const [search, setSearch] = useState("");

const [showField, setshowField] = useState(false);

const [toggleMenu, setToggleMenu] = useState(false);

const [active, isActive] = useState(false);

  return (
    <div>
      <ToastContainer theme='dark'/>
       {!hideLayout && <Navbar showField={showField} setSearch={setSearch} setshowField={setshowField} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} isActive={isActive} />}
      <Routes>
        <Route path="/" element={<Home setSearch={setSearch} search={search} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />}/>
        <Route path="/tv" element={<Tv setSearch={setSearch} search={search} />}/>
        <Route path="/movies" element={<Movies setSearch={setSearch} search={search} />}/>
      </Routes>
       {!hideLayout && <Footer />}
     </div>
  );
}

export default App