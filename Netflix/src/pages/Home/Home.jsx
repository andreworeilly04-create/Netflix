import React from 'react'
import './Home.css'
import NavBar from '../../components/Navbar/Navbar'
import hero from '../../assets/hero_banner.jpg'
import hero_caption from '../../assets/hero_title.png'
import play from '../../assets/Play_icon.png'
import info from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
    return (
        <div className="home">
            <NavBar />
            <div className="hero">
                <img src={hero} alt="Hero" className="banner-img" />
                <div className="hero-caption">
                    <img src={hero_caption} alt="Hero Title" className="caption-img" />
                    <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy</p>
                    <div className="hero-btns">
                        <button className="btn"><img src={play} alt="Play Icon" />Play</button>
                        <button className="btn dark-btn"><img src={info} alt="Info Icon" />More Info</button>
                    </div>
                    <TitleCards />
                </div>
            </div>
            <div className="more-cards">
                <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
                <TitleCards title={"Only on Netflix"} category={"popular"}/>
                <TitleCards title={"Upcoming"} category={"upcoming"}/>
                <TitleCards title={"Top Pics for you"} category={"now_playing"}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Home