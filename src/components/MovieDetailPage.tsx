import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { MovieDetail } from '../types/types';

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
        <h1>{movie.title}</h1>
    </section>
)
}

export default MovieDetailPage