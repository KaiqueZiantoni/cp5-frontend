import { RecipeCard } from '../components/recipes/RecipeCard'
import { useRecipes } from '../hooks/useRecipes'
import styles from './Catalogo.module.css'

export function Catalogo() {
  const { status, recipes } = useRecipes()

  return (
    <section className="container">
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Catálogo de receitas</h1>
        <p className={styles.subtitle}>
          {status === 'success' ? `${recipes.length} receitas para explorar` : 'Carregando receitas…'}
        </p>
      </header>

      <ul className={styles.grid} aria-label="Lista de receitas">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  )
}
