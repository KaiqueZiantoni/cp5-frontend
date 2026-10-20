import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { StateMessage } from '../components/ui/StateMessage'
import { useRecipe } from '../hooks/useRecipe'
import type { Recipe } from '../types/recipe'
import { formatDifficulty, formatReviews, formatServings } from '../utils/labels'
import { formatMinutes, getTotalTime } from '../utils/time'
import styles from './Detalhe.module.css'

export function Detalhe() {
  const { id = '' } = useParams()
  const recipeId = Number(id)
  const state = useRecipe(recipeId)

  useEffect(() => {
    document.title =
      state.status === 'success' ? `${state.recipe.name} · Receitário` : 'Receita · Receitário'
    return () => {
      document.title = 'Receitário'
    }
  }, [state])

  return (
    <section className="container">
      <Link to="/" className={styles.back}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.backIcon}>
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Voltar ao catálogo
      </Link>

      {state.status === 'loading' && <DetalheSkeleton />}

      {state.status === 'not-found' && (
        <StateMessage
          title="Receita não encontrada"
          description={`Não existe nenhuma receita com o identificador "${id}". Ela pode ter sido removida ou o endereço está incorreto.`}
          action={<Button to="/">Voltar ao catálogo</Button>}
        />
      )}

      {state.status === 'error' && (
        <StateMessage
          tone="error"
          title="Não foi possível carregar a receita"
          description={state.message}
          action={<Button to="/">Voltar ao catálogo</Button>}
        />
      )}

      {state.status === 'success' && <RecipeDetails recipe={state.recipe} />}
    </section>
  )
}

function RecipeDetails({ recipe }: { recipe: Recipe }) {
  return (
    <article className={styles.article}>
      <div className={styles.hero}>
        <img src={recipe.image} alt={recipe.name} className={styles.image} width={800} height={600} />

        <div className={styles.summary}>
          <p className={styles.cuisine}>{recipe.cuisine}</p>
          <h1 className={styles.title}>{recipe.name}</h1>

          <ul className={styles.meta} aria-label="Informações da receita">
            <li>Dificuldade: {formatDifficulty(recipe.difficulty)}</li>
            <li>{formatServings(recipe.servings)}</li>
            <li>{recipe.caloriesPerServing} kcal por porção</li>
            <li>
              <span aria-hidden="true">★</span> {recipe.rating.toFixed(1)} ({formatReviews(recipe.reviewCount)})
            </li>
          </ul>

          <dl className={styles.times}>
            <div className={styles.timeCard}>
              <dt>Preparo</dt>
              <dd>{formatMinutes(recipe.prepTimeMinutes)}</dd>
            </div>
            <div className={styles.timeCard}>
              <dt>Cozimento</dt>
              <dd>{formatMinutes(recipe.cookTimeMinutes)}</dd>
            </div>
            <div className={`${styles.timeCard} ${styles.timeTotal}`}>
              <dt>Total</dt>
              <dd>{formatMinutes(getTotalTime(recipe))}</dd>
            </div>
          </dl>

          <ul className={styles.tags} aria-label="Tags">
            {[...recipe.mealType, ...recipe.tags].map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.panel} aria-labelledby="ingredientes">
          <h2 id="ingredientes" className={styles.sectionTitle}>
            Ingredientes
          </h2>
          <ul className={styles.ingredients}>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby="preparo">
          <h2 id="preparo" className={styles.sectionTitle}>
            Modo de preparo
          </h2>
          <ol className={styles.steps}>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

function DetalheSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonText}>
        <div className={`${styles.skeletonLine} ${styles.w30}`} />
        <div className={`${styles.skeletonLine} ${styles.w80} ${styles.tall}`} />
        <div className={`${styles.skeletonLine} ${styles.w60}`} />
        <div className={`${styles.skeletonLine} ${styles.w90}`} />
      </div>
    </div>
  )
}
