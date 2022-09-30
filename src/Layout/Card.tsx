import React from 'react'
import style from './Card.module.css'

type Props = {
  children: JSX.Element[] | JSX.Element
}

const Card = ({children}: Props) => {
  return (
    <div className={style.card}>{children}</div>
  )
}

export default Card