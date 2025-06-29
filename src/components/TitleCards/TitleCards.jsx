import React,{useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {
  const [apiData, setapiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjE2ZTRiNmRhNGI0MDQzMTYyYzIxMzlmMjE0NjAyYSIsIm5iZiI6MTczNjk4NDMzOS43MTksInN1YiI6IjY3ODg0NzEzMzg5MjAzOTNhZDFkMjYxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ks5XaXf0CVtFlNMJZqxQ1Kr-drEACCVPPHW92B-PZfs'
    }
  };
  
 

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setapiData(res.results))
    .catch(err => console.error(err));
    

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])
  

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>

        })}
      </div>
    </div>
  )
}

export default TitleCards
