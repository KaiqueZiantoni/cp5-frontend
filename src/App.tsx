import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Catalogo } from './pages/Catalogo'
import { Detalhe } from './pages/Detalhe'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Catalogo />} />
          <Route path="receitas/:id" element={<Detalhe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
