import React, { useEffect, useState } from 'react'
import './Player.css'
import back from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGZhNTQwODQ2NzRhNmQwYWFiYzVlNDM1NTllYmYyYyIsIm5iZiI6MTc3NzE1MzA1Ni43NTksInN1YiI6IjY5ZWQzNDIwYzA1YzAwZmFiNWI0ZWRhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yd4Y3HwVFcibrqy7_IGIJY8CoU4FYx1-ogVz86fm8fs'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, [])


  return (
    <div className="player">
      <img src={back} alt="Back Icon" onClick={()=>{navigate(-1)}}/>
      <iframe width="90%" height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title="trailer" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player