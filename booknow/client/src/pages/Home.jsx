import { useEffect, useState } from 'react'; import { Link } from 'react-router-dom'; import { api } from '../services/api';
const GENRES = ['All', 'Action', 'Sci-Fi', 'Romance', 'Horror', 'Comedy', 'Fantasy'];
export default function Home() {
  const [movies, setMovies] = useState([]), [q, setQ] = useState(''), [genre, setGenre] = useState('All');
  useEffect(() => { api(`/movies?q=${q}&genre=${genre}`).then(setMovies); }, [q, genre]);
  return (<>
    <section className="hero"><h1>Your seat is waiting.</h1><p>Browse the latest movies and book in seconds.</p>
      <input className="search" placeholder="🔍 Search movies…" value={q} onChange={e => setQ(e.target.value)} /></section>
    <div className="chips">{GENRES.map(g => <button key={g} className={'chip ' + (g === genre ? 'on' : '')} onClick={() => setGenre(g)}>{g}</button>)}</div>
    <div className="grid">
      {movies.map(m => (
        <Link to={`/movie/${m._id}`} key={m._id} className="poster">
          <img src={m.poster} alt={m.title} />
          <div className="info"><b>{m.title}</b><span>{m.genre} · {m.language}</span><span className="rate">⭐ {m.rating}</span></div>
        </Link>))}
      {!movies.length && <p className="muted">No movies found.</p>}
    </div></>);
}
