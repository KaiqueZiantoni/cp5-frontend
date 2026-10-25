import { Link } from 'react-router-dom'
import type { Recipe } from '../../types/recipe'
import { formatDifficulty } from '../../utils/labels'
import { formatMinutes, getTotalTime } from '../../utils/time'
import { FavoriteButton } from './FavoriteButton'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
  const totalTime = getTotalTime(recipe)

  return (
    <article className={styles.card}>
      <Link to={`/receitas/${recipe.id}`} className={styles.media}>
        <img src={recipe.image} alt={recipe.name} loading="lazy" width={400} height={300} />
      </Link>

      <div className={styles.favorite}>
        <FavoriteButton
          active={isFavorite}
          recipeName={recipe.name}
          onToggle={() => onToggleFavorite(recipe.id)}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.topline}>
          <p className={styles.cuisine}>{recipe.cuisine}</p>
          <span className={`${styles.badge} ${styles[recipe.difficulty.toLowerCase()]}`}>
            {formatDifficulty(recipe.difficulty)}
          </span>
        </div>
        <h2 className={styles.title}>
          <Link to={`/receitas/${recipe.id}`} className={styles.titleLink}>
            {recipe.name}
          </Link>
        </h2>
        <p className={styles.time}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>
            <span className="sr-only">Tempo total: </span>
            {formatMinutes(totalTime)}
          </span>
        </p>
      </div>
    </article>
  )
}
