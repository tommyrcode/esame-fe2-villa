import { Route, Routes } from "react-router";
import Shell from "./components/shell";


function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
      <Route path="/" element={<p>Elenco</p>} />
      <Route path="/movies/:id" element={<p>Dettaglio</p>} />
      </Route>
    </Routes>
  )
}

export default App