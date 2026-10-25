import { useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { StateMessage } from '../components/ui/StateMessage'

export function NotFound() {
  const { pathname } = useLocation()

  return (
    <section className="container">
      <StateMessage
        title="Página não encontrada"
        description={`O endereço "${pathname}" não existe no Receitário.`}
        action={<Button to="/">Voltar ao catálogo</Button>}
      />
    </section>
  )
}
