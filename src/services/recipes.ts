import type { Recipe, RecipesResponse } from '../types/recipe'

const BASE_URL = 'https://dummyjson.com/recipes'

/** Erro específico para quando a API responde 404 (receita inexistente). */
export class RecipeNotFoundError extends Error {
  readonly id: number

  constructor(id: number) {
    super(`Receita ${id} não encontrada`)
    this.name = 'RecipeNotFoundError'
    this.id = id
  }
}

/**
 * Busca a lista completa de receitas.
 * `limit=0` é obrigatório: sem ele a API devolve apenas 30 das 50 receitas.
 */
export async function fetchRecipes(signal?: AbortSignal): Promise<RecipesResponse> {
  const response = await fetch(`${BASE_URL}?limit=0`, { signal })

  if (!response.ok) {
    throw new Error(`Falha ao carregar receitas (HTTP ${response.status})`)
  }

  return (await response.json()) as RecipesResponse
}

/** Busca uma receita pelo id; lança RecipeNotFoundError quando a API responde 404. */
export async function fetchRecipeById(id: number, signal?: AbortSignal): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/${id}`, { signal })

  if (response.status === 404) {
    throw new RecipeNotFoundError(id)
  }

  if (!response.ok) {
    throw new Error(`Falha ao carregar a receita (HTTP ${response.status})`)
  }

  return (await response.json()) as Recipe
}
