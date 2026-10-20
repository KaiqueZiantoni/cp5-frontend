import { Link } from 'react-router-dom'
import type { Recipe } from '../../types/recipe'
import { formatMinutes, getTotalTime } from '../../utils/time'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = getTotalTime(recipe)

  return (
    <article className={styles.card}>
      <Link to={`/receitas/${recipe.id}`} className={styles.media}>
        <img src={recipe.image} alt={recipe.name} loading="lazy" width={400} height={300} />
      </Link>

      <div className={styles.body}>
        <p className={styles.cuisine}>{recipe.cuisine}</p>
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
