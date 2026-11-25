import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { MovieDetail } from '../types/types';
import './MovieDetailPage.css'


function MovieDetailPage() {
    const { id } = useParams()
    const [movie, setMovie] = useState<MovieDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

    async function loadMovie() {
      setLoading(true)
      setError(null)
      setMovie(null)

      if (!id) {
        setError('ID del film mancante')
        setLoading(false)
        return
      }

      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY
        if (!apiKey) throw new Error('API key TMDB mancante')

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
            { signal: controller.signal },
        )

        if (!response.ok) {
            throw new Error('Errore TMDB: ${response.status}')
        }

        const data: MovieDetail = await response.json()
        setMovie(data)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setError(error instanceof Error ? error.message : 'Errore nel caricamento')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadMovie()
    return () => controller.abort()
}, [id])

if (loading) return <p>Caricamento film...</p>
if (error) return <p role="alert">{error}</p>
if (!movie) return <p>Film non trovato</p>

return (
    <section>
      <Link className="back-link" to="/">← Torna all'elenco</Link>
      <article className="detail">
      <div className="detail__poster">
        {movie.poster_path ? (
          <img
            className="detail__poster-image"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster di ${movie.title}`}
          />
        ) : (
          <span>Poster non disponibile</span>
        )}
      </div>

      <div>
        <h1 className="detail__title">{movie.title}</h1>
        {movie.tagline && <p className="detail__tagline">{movie.tagline}</p>}
        <ul className="detail__meta">
          <li>Uscita: {movie.release_date || 'N/D'}</li>
          <li>Durata: {movie.runtime ? `${movie.runtime} min` : 'N/D'}</li>
          <li>Voto: {movie.vote_average.toFixed(1)}</li>
          <li>Voti: {movie.vote_count}</li>
          <li>Stato: {movie.status}</li>
          <li>
            Lingua:{' '}
            {movie.spoken_languages.map((language) => language.english_name).join(', ')
              || movie.original_language}
          </li>
        </ul>

        <div className="detail__genres">
          {movie.genres.map((genre) => (
            <span className="genre" key={genre.id}>{genre.name}</span>
          ))}
        </div>

        <p className="detail__overview-label">Trama</p>
        <p className="detail__overview">
          {movie.overview || 'Trama non disponibile'}
        </p>

        <p className="detail__production">
          Produzione:{' '}
          {movie.production_companies.map((company) => company.name).join(' · ') || 'N/D'}
        </p>
      </div>
    </article>
    </section>
)
}

export default MovieDetailPage