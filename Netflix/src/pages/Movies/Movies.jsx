import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import cards from '../../assets/cards/Cards_data'
import "./Movies.css"

const Movies = ({title, category, search}) => {

    const [apiData, setApiData] = useState([]);
     const cardsRef = useRef();

      const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGZhNTQwODQ2NzRhNmQwYWFiYzVlNDM1NTllYmYyYyIsIm5iZiI6MTc3NzE1MzA1Ni43NTksInN1YiI6IjY5ZWQzNDIwYzA1YzAwZmFiNWI0ZWRhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yd4Y3HwVFcibrqy7_IGIJY8CoU4FYx1-ogVz86fm8fs'
        }
    };

     useEffect(() => {

     let path = "";

        if (search){
          path = `search/movie?query=${encodeURIComponent(search)}&`;
        } else {
          path = `movie/${category || "popular"}? 
          `;
        }

                const url = `https://api.themoviedb.org/3/${path}language=en-US&page=1`;
                fetch(url, options)
                .then((res) => res.json())
                .then((res) => setApiData(res.results))
                .catch((err) => console.error(err));
    
          const handleWheel = (event) => {
            if (cardsRef.current){
            cardsRef.current.scrollUp += event.deltaY;
          }
        };
          const currentRef = cardsRef.current;
          if (currentRef){
            currentRef.addEventListener('wheel', handleWheel);
          }
          return () => {
            if (currentRef){
                currentRef.removeEventListener('wheel', handleWheel);
            }
          };
        }, [category, search]);

  return (
    <section className="movies">
        <div className="movies_title--container">
              <h2 className="movies_title">{title ? title : "Movies"}</h2>
              <div className="movie-list--container">
            <div className="movie-list" ref={cardsRef}>
                {apiData?.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img className="card_image" src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="Card" />
                        <p>{card.title}</p>
                    </Link>
                })}
            </div>
        </div>
        </div>
    </section>
    
  )
}

export default Movies