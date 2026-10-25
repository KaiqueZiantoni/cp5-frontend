import styles from './Footer.module.css'

function scrollToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}

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
        <button type="button" className={styles.topButton} onClick={scrollToTop}>
          Voltar ao topo
        </button>
      </div>
    </footer>
  )
}
