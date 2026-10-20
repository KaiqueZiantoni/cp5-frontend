import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Catalogo } from './pages/Catalogo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Catalogo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
