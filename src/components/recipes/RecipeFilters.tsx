import styles from './RecipeFilters.module.css'

interface RecipeFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  cuisine: string
  cuisines: string[]
  onCuisineChange: (value: string) => void
}

export function RecipeFilters({
  search,
  onSearchChange,
  cuisine,
  cuisines,
  onCuisineChange,
}: RecipeFiltersProps) {
  return (
    <form className={styles.filters} role="search" onSubmit={(event) => event.preventDefault()}>
      <label className={styles.field}>
        <span className={styles.label}>Buscar por nome</span>
        <span className={styles.inputWrap}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            className={styles.input}
            placeholder="Ex.: chicken, pasta, salad…"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            autoComplete="off"
          />
        </span>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Culinária</span>
        <select
          className={styles.select}
          value={cuisine}
          onChange={(event) => onCuisineChange(event.target.value)}
        >
          <option value="">Todas as culinárias</option>
          {cuisines.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}
