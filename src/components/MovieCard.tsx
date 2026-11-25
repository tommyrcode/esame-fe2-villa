import { Link } from 'react-router'
import type { MovieCardProps } from '../types/types'

function MovieCard({ movie, isDetailLinkEnabled }: MovieCardProps) {
  return (
    <article className="card">
      <div className="card__poster">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster di ${movie.title}`}
          />
        ) : (
          <span>Poster non disponibile</span>
        )}
      </div>

      <div className="card__body">
        <h2 className="card__title">{movie.title}</h2>
        <p className="card__meta">
          Uscita: {movie.release_date || 'N/D'} · Voto: {movie.vote_average.toFixed(1)}
        </p>
        <p className="card__overview">{movie.overview}</p>

        {isDetailLinkEnabled ? (
          <Link className="card__cta" to={`/movies/${movie.id}`}>
            Dettaglio
          </Link>
        ) : (
          <span className="card__cta card__cta--disabled">Dettaglio</span>
        )}
      </div>
    </article>
  )
}

export default MovieCard