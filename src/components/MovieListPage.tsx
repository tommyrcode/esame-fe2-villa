import { useEffect, useState } from "react"
import type { MovieList, MovieSearchResponse } from "../types/types"

function MovieListPage() {
const [movies, setMovies] = useState<MovieList[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
    const controller = new AbortController()

    async function loadMovies() {
        try {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY
            if (!apiKey) throw new Error('API key TMDB mancante')

            const url = `https://api.themoviedb.org/3/search/movie?query=The%20Lord%20of%20the%20Rings&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
            const response = await fetch(url, {signal: controller.signal})

            if (!response.ok) {
                throw new Error(`Errore TMDB: ${response.status}`)
            }

            const data: MovieSearchResponse = await response.json()
            setMovies(data.results)
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') return
            setError(error instanceof Error ? error.message : 'Errore nel caricamento')
        } finally {
            if (!controller.signal.aborted) setLoading(false)
        }
    }

    void loadMovies()
    return () => controller.abort()
}, [])

if (loading) return <p>Caricamento film...</p>
if (error) return <p role="alert">{error}</p>

return (
    <section>
        <h1>The Lord of the Rings</h1>
        <ul>
            {movies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
            ))}
        </ul>
    </section>
    )
}

export default MovieListPage