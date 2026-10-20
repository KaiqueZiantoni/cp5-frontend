import { useMemo, useState } from 'react'
import { RecipeCard } from '../components/recipes/RecipeCard'
import { RecipeFilters } from '../components/recipes/RecipeFilters'
import { useRecipes } from '../hooks/useRecipes'
import styles from './Catalogo.module.css'

export function Catalogo() {
  const { status, recipes } = useRecipes()
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')

  /** Lista de culinárias montada a partir dos dados da API, sem valores fixos. */
  const cuisines = useMemo(
    () => [...new Set(recipes.map((recipe) => recipe.cuisine))].sort((a, b) => a.localeCompare(b)),
    [recipes],
  )

  /** Busca e filtro aplicados em conjunto. */
  const filteredRecipes = useMemo(() => {
    const term = search.trim().toLowerCase()

    return recipes.filter((recipe) => {
      const matchesName = term === '' || recipe.name.toLowerCase().includes(term)
      const matchesCuisine = cuisine === '' || recipe.cuisine === cuisine
      return matchesName && matchesCuisine
    })
  }, [recipes, search, cuisine])

  return (
    <section className="container">
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Catálogo de receitas</h1>
        <p className={styles.subtitle}>
          {status === 'success'
            ? `${filteredRecipes.length} de ${recipes.length} receitas`
            : 'Carregando receitas…'}
        </p>
      </header>

      <div className={styles.toolbar}>
        <RecipeFilters
          search={search}
          onSearchChange={setSearch}
          cuisine={cuisine}
          cuisines={cuisines}
          onCuisineChange={setCuisine}
        />
      </div>

      <ul className={styles.grid} aria-label="Lista de receitas">
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  )
}
