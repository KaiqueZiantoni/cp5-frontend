import { useEffect, useState } from 'react'
import { RecipeNotFoundError, fetchRecipeById } from '../services/recipes'
import type { Recipe } from '../types/recipe'

type RecipeState =
  | { status: 'loading' }
  | { status: 'success'; recipe: Recipe }
  | { status: 'not-found' }
  | { status: 'error'; message: string }

/** Um id válido para a API é um inteiro positivo; qualquer outra coisa já é "não encontrada". */
function isValidId(id: number): boolean {
  return Number.isInteger(id) && id > 0
}

/** Carrega uma receita pelo id, tratando 404 como estado próprio e cancelando ao trocar de id. */
export function useRecipe(id: number): RecipeState {
  const [state, setState] = useState<RecipeState>(() =>
    isValidId(id) ? { status: 'loading' } : { status: 'not-found' },
  )

  useEffect(() => {
    if (!isValidId(id)) return

    const controller = new AbortController()

    fetchRecipeById(id, controller.signal)
      .then((recipe) => setState({ status: 'success', recipe }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return

        if (error instanceof RecipeNotFoundError) {
          setState({ status: 'not-found' })
          return
        }

        const message = error instanceof Error ? error.message : 'Erro inesperado'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [id])

  return state
}
