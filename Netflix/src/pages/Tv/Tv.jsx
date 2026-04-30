import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import cards from '../../assets/cards/Cards_data'
import "./Tv.css"

const Tv = ({title, category, search, setSearch}) => {

    const [apiData, setApiData] = useState([]);
     const cardsRef = useRef();

      const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        }
    };

      useEffect(() => {

        let path = "";

        if (search){
          path = `search/tv?query=${encodeURIComponent(search)}&`;
        } else {
          path = `tv/${category || "popular"}? 
          `;
        }

                const url = `https://api.themoviedb.org/3/${path}?language=en-US&page=1`;
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
    <section className="tv_shows">
        <div className="tv_shows_title--container">
              <h2 className="tv_shows_title">{title ? title : "Tv Shows"}</h2>
              <div className="tv-list--container">
            <div className="tv-list" ref={cardsRef}>
                {apiData?.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img className="card_image" src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="Card" />
                        <p>{card.name}</p>
                    </Link>
                })}
            </div>
        </div>
        </div>
    </section>
    
  )
}

export default Tv
