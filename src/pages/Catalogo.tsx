import { useMemo, useState } from 'react'
import { RecipeCard } from '../components/recipes/RecipeCard'
import { RecipeFilters } from '../components/recipes/RecipeFilters'
import { RecipeGridSkeleton } from '../components/recipes/RecipeGridSkeleton'
import { Button } from '../components/ui/Button'
import { StateMessage } from '../components/ui/StateMessage'
import { useRecipes } from '../hooks/useRecipes'
import styles from './Catalogo.module.css'

export function Catalogo() {
  const recipesState = useRecipes()
  const { status, recipes, reload } = recipesState
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')
  /** Favoritos vivem apenas nesta página (estado local, sem persistência). */
  const [favorites, setFavorites] = useState<Set<number>>(() => new Set())

  function toggleFavorite(id: number) {
    setFavorites((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function clearFilters() {
    setSearch('')
    setCuisine('')
  }

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

  const hasActiveFilters = search.trim() !== '' || cuisine !== ''

  return (
    <section className="container">
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Catálogo de receitas</h1>
          <p className={styles.subtitle}>
            {status === 'success'
              ? `${filteredRecipes.length} de ${recipes.length} receitas`
              : 'Carregando receitas…'}
          </p>
        </div>

        <p className={styles.counter} aria-live="polite">
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.counterIcon}>
            <path
              d="M12 20.5s-7.5-4.7-7.5-10A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9c0 5.3-7.5 10-7.5 10z"
              fill="currentColor"
            />
          </svg>
          {favorites.size} {favorites.size === 1 ? 'favorita' : 'favoritas'}
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

      {status === 'loading' && <RecipeGridSkeleton />}

      {status === 'error' && (
        <StateMessage
          tone="error"
          title="Não foi possível carregar as receitas"
          description={recipesState.message}
          action={<Button onClick={reload}>Tentar novamente</Button>}
        />
      )}

      {status === 'success' && filteredRecipes.length === 0 && (
        <StateMessage
          title="Nenhuma receita encontrada"
          description="Tente outro termo de busca ou escolha uma culinária diferente."
          action={
            hasActiveFilters ? (
              <Button variant="ghost" onClick={clearFilters}>
                Limpar filtros
              </Button>
            ) : undefined
          }
        />
      )}

      {status === 'success' && filteredRecipes.length > 0 && (
        <ul className={styles.grid} aria-label="Lista de receitas">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                isFavorite={favorites.has(recipe.id)}
                onToggleFavorite={toggleFavorite}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
