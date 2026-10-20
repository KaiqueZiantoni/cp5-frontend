import type { Difficulty } from '../types/recipe'

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  Easy: 'Fácil',
  Medium: 'Média',
  Hard: 'Difícil',
}

export function formatDifficulty(difficulty: Difficulty): string {
  return DIFFICULTY_LABELS[difficulty] ?? difficulty
}

export function formatServings(servings: number): string {
  return servings === 1 ? '1 porção' : `${servings} porções`
}

export function formatReviews(count: number): string {
  return count === 1 ? '1 avaliação' : `${count} avaliações`
}
