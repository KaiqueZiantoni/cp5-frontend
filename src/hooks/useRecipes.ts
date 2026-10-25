import { useCallback, useEffect, useState } from 'react'
import { fetchRecipes } from '../services/recipes'
import type { Recipe } from '../types/recipe'

type RecipesState =
  | { status: 'loading'; recipes: [] }
  | { status: 'success'; recipes: Recipe[] }
  | { status: 'error'; recipes: []; message: string }

const LOADING: RecipesState = { status: 'loading', recipes: [] }

/** Carrega a lista completa de receitas, com cancelamento ao desmontar e opção de recarregar. */
export function useRecipes() {
  const [state, setState] = useState<RecipesState>(LOADING)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchRecipes(controller.signal)
      .then((data) => setState({ status: 'success', recipes: data.recipes }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message = error instanceof Error ? error.message : 'Erro inesperado'
        setState({ status: 'error', recipes: [], message })
      })

    return () => controller.abort()
  }, [attempt])

  /** Volta ao estado de carregamento e dispara uma nova tentativa. */
  const reload = useCallback(() => {
    setState(LOADING)
    setAttempt((current) => current + 1)
  }, [])

  return { ...state, reload }
}
