import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import cards from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGZhNTQwODQ2NzRhNmQwYWFiYzVlNDM1NTllYmYyYyIsIm5iZiI6MTc3NzE1MzA1Ni43NTksInN1YiI6IjY5ZWQzNDIwYzA1YzAwZmFiNWI0ZWRhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yd4Y3HwVFcibrqy7_IGIJY8CoU4FYx1-ogVz86fm8fs'
        }
    };


    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);


        
    }, [])

    return (
        <section id="popular">
        <div className="titlecards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="Card" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
        </section>
    )
}

export default TitleCards