import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost'

type ButtonProps = ComponentPropsWithoutRef<'button'> & { variant?: Variant; to?: undefined }
type LinkProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant; to: string }

/** Botão que vira <Link> quando recebe `to`, mantendo o mesmo visual. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', className, ...rest } = props
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  if ('to' in rest && rest.to !== undefined) {
    return <Link {...(rest as LinkProps)} className={classes} />
  }

  return <button type="button" {...(rest as ButtonProps)} className={classes} />
}
