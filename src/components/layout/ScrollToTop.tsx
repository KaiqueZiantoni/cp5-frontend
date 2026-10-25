import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Rola a página para o topo sempre que a rota muda. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return null
}
