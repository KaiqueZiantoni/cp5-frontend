import { useEffect, useState } from 'react'
import { fetchRecipes } from '../services/recipes'
import type { Recipe } from '../types/recipe'

type RecipesState =
  | { status: 'loading'; recipes: [] }
  | { status: 'success'; recipes: Recipe[] }
  | { status: 'error'; recipes: []; message: string }

/** Carrega a lista completa de receitas uma vez, com cancelamento ao desmontar. */
export function useRecipes(): RecipesState {
  const [state, setState] = useState<RecipesState>({ status: 'loading', recipes: [] })

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
  }, [])

  return state
}
