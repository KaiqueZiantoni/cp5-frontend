import { useEffect, useState } from 'react'
import { fetchRecipeById } from '../services/recipes'
import type { Recipe } from '../types/recipe'

type RecipeState =
  | { status: 'loading' }
  | { status: 'success'; recipe: Recipe }
  | { status: 'error'; message: string }

/** Carrega uma receita pelo id, cancelando a requisição anterior quando o id muda. */
export function useRecipe(id: number): RecipeState {
  const [state, setState] = useState<RecipeState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetchRecipeById(id, controller.signal)
      .then((recipe) => setState({ status: 'success', recipe }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message = error instanceof Error ? error.message : 'Erro inesperado'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [id])

  return state
}
