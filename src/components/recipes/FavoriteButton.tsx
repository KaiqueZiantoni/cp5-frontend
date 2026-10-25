import styles from './FavoriteButton.module.css'

interface FavoriteButtonProps {
  active: boolean
  recipeName: string
  onToggle: () => void
}

export function FavoriteButton({ active, recipeName, onToggle }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={active ? `${styles.button} ${styles.active}` : styles.button}
      aria-pressed={active}
      aria-label={
        active ? `Remover ${recipeName} das favoritas` : `Adicionar ${recipeName} às favoritas`
      }
      title={active ? 'Remover das favoritas' : 'Favoritar'}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
        <path
          d="M12 20.5s-7.5-4.7-7.5-10A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9c0 5.3-7.5 10-7.5 10z"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
