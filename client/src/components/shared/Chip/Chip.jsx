import React from 'react'
import style from './Chip.module.css'
import {FaWindowClose} from 'react-icons/fa'

export const Chip = ({title, onClickIcon}) => {
  return (
    onClickIcon 
    ? (
    <div className={style.chipWithIcon}>
        <span className={style.titleWithIcon}>{title}</span>
        <FaWindowClose className={style.icon} onClick={onClickIcon}/>
    </div>
    )
    : (
    <div className={style.chip}>
        <span className={style.title}>{title}</span>
    </div>
    )
  )
}
