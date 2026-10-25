import type { Recipe } from '../types/recipe'

/** Tempo total calculado no front: preparo + cozimento. */
export function getTotalTime(recipe: Pick<Recipe, 'prepTimeMinutes' | 'cookTimeMinutes'>): number {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes
}

/** Formata minutos de forma legível: 45 → "45 min", 90 → "1h 30min", 120 → "2h". */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60

  return rest === 0 ? `${hours}h` : `${hours}h ${String(rest).padStart(2, '0')}min`
}
