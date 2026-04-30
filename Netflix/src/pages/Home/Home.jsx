import React, { useEffect, useState } from 'react'
import './Home.css'
import NavBar from '../../components/Navbar/Navbar'
import hero from '../../assets/hero_banner.jpg'
import hero_caption from '../../assets/hero_title.png'
import play from '../../assets/play_icon.png'
import info from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import Player from '../../pages/Player/Player'
import { Link } from 'react-router-dom'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGZhNTQwODQ2NzRhNmQwYWFiYzVlNDM1NTllYmYyYyIsIm5iZiI6MTc3NzE1MzA1Ni43NTksInN1YiI6IjY5ZWQzNDIwYzA1YzAwZmFiNWI0ZWRhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yd4Y3HwVFcibrqy7_IGIJY8CoU4FYx1-ogVz86fm8fs'
    }
};


const Home = () => {

    const [featuredMovie, setFeaturedMovie] = useState(null);


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {
                if (res.results && res.results.length > 0){
                setFeaturedMovie(res.results[0]);
                }
            })
            .catch(err => console.error(err));
    }, [])


    return (
        <div className="home">

            <div className="hero">
                <img src={featuredMovie ? `https://image.tmdb.org/t/p/original${featuredMovie?.backdrop_path}` : hero} alt="Hero" className="banner-img" />
                <div className="hero-caption">
                    <h1 className="hero-title">
                        {featuredMovie ? featuredMovie.original_title : ""}
                        </h1>
                    <p>{featuredMovie ? featuredMovie.overview : ""}</p>
                    <div className="hero-btns">
                        {featuredMovie && (<Link to={`/player/${featuredMovie.id}`}><button className="btn"><img src={play} alt="Play Icon"/>Play</button></Link>
                        )}
                    </div>
                    <TitleCards />
                </div>
            </div>
            <div className="more-cards">
                <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
                <TitleCards title={"Only on Netflix"} category={"popular"} />
                <TitleCards title={"Upcoming"} category={"upcoming"} />
                <TitleCards title={"Top Pics for you"} category={"now_playing"} />
            </div>
        </div>
    )
}

export default Home