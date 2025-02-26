import './App.css'
import { useState, useEffect, useRef } from 'react';
import { getAnime } from "./api/anime";
import PropTypes from 'prop-types';

function AnimeRender(props) {
  const itemRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const currentRef = itemRef.current;
    
    const options = {
      threshold: 0.5,
      rootMargin: "-250px",
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      });
    }, options);
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return <p ref={itemRef} style={{
    transform: isInView ? "scale(2)" : "scale(1)",
    transition: "all 0.3s ease-in-out"
  }}>{props.anime.title}</p>
}

AnimeRender.propTypes = {
  anime: PropTypes.array,
}

function App() {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [error, setError] = useState();

  const tukarNama = (event) => {
    const value = event.target.value;

    setNama(value);
  }

  const tukarPassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length < 8) {
      setError("Password too short!");
    } else {
      setError();
    }
  }

  const getDataFromApi = async () => {
    try {
      const animes = await getAnime();
      setAnimeList(animes.data);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataFromApi();

    return () => {
    }
  }, [password])

  return (
    <div>
      <input name="nama" onChange={tukarNama} />
      <input name="password" type="password" onChange={tukarPassword} />
      <p style={{color: "red"}}>{error}</p>
      {
        animeList.map((anime) => (<AnimeRender key={anime.mal_id} anime={anime} />))
      }
    </div>
  );
}

export default App
