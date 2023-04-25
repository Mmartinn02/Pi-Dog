import React from 'react'
import {NavLink} from 'react-router-dom'
import style from './Landing.module.css'

export const Landing = () => {
  return (
    <div className={style.landing}>
        <div className={style.container}>
            <h1 className={style.title}>Search and learn about any breed of dog</h1>
            <NavLink exact to="/home">Get Started</NavLink>
        </div>
    </div>
  )
}
