/**
 * Tipos modelados a partir do JSON real de https://dummyjson.com/recipes
 */

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: Difficulty
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: number
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

/** A listagem não vem como array: a API envolve os dados em um objeto paginado. */
export interface RecipesResponse {
  recipes: Recipe[]
  total: number
  skip: number
  limit: number
}
