import './App.css'
import { useState, useEffect } from 'react';
import { getAnime } from "./api/anime";

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
        animeList.map((anime) => (<p key={anime.mal_id}>{anime.title}</p>))
      }
    </div>
  );
}

export default App
