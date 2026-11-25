import { Route, Routes } from "react-router";
import Shell from "./components/shell";
import MovieDetailPage from "./components/MovieDetailPage";
import MovieListPage from "./components/MovieListPage";


function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
      <Route path="/" element={<MovieListPage />} />
      <Route path="/movies/:id" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App