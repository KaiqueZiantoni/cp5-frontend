import type { ReactNode } from 'react'
import styles from './StateMessage.module.css'

interface StateMessageProps {
  tone?: 'neutral' | 'error'
  title: string
  description?: string
  action?: ReactNode
}

/** Bloco centralizado para estados vazios, erros e páginas não encontradas. */
export function StateMessage({ tone = 'neutral', title, description, action }: StateMessageProps) {
  return (
    <div className={tone === 'error' ? `${styles.box} ${styles.error}` : styles.box} role="status">
      <svg viewBox="0 0 64 64" aria-hidden="true" className={styles.icon}>
        <path
          d="M14 30h36a2 2 0 0 1 2 2c0 9-8 16-20 16S12 41 12 32a2 2 0 0 1 2-2z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M24 24c0-4 4-4 4-8M32 24c0-4 4-4 4-8M40 24c0-4 4-4 4-8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  )
}
