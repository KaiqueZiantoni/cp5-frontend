import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} aria-label="Receitário — página inicial">
          <svg className={styles.logo} viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="currentColor" />
            <path
              d="M14 30h36a2 2 0 0 1 2 2c0 9-8 16-20 16S12 41 12 32a2 2 0 0 1 2-2z"
              fill="#faf6f0"
            />
            <path
              d="M24 24c0-4 4-4 4-8M32 24c0-4 4-4 4-8M40 24c0-4 4-4 4-8"
              stroke="#faf6f0"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className={styles.brandName}>Receitário</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Navegação principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
          >
            Catálogo
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
