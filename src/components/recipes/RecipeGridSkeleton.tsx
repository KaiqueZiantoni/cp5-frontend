import styles from './RecipeGridSkeleton.module.css'

interface RecipeGridSkeletonProps {
  count?: number
}

/** Placeholder animado enquanto a lista de receitas carrega. */
export function RecipeGridSkeleton({ count = 8 }: RecipeGridSkeletonProps) {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className={styles.card}>
          <div className={styles.media} />
          <div className={styles.body}>
            <div className={`${styles.line} ${styles.short}`} />
            <div className={styles.line} />
            <div className={`${styles.line} ${styles.medium}`} />
          </div>
        </li>
      ))}
    </ul>
  )
}
