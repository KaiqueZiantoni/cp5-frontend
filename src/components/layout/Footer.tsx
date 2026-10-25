import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          <strong>Receitário</strong> · Checkpoint 5 · Frontend · FIAP
        </p>
        <p className={styles.muted}>
          Dados fornecidos por{' '}
          <a href="https://dummyjson.com/docs/recipes" target="_blank" rel="noreferrer">
            DummyJSON
          </a>
        </p>
      </div>
    </footer>
  )
}
