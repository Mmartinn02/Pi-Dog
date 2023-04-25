import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button} from '../shared/Button'
import {FaDog} from 'react-icons/fa'
import style from './Navbar.module.css'

export const Navbar = () => {


  return (
    <nav className={style.navbar}>
        <div className={style.logo}>
          <FaDog style={{fontSize: 20, marginRight: 10}}/>
          <h1 className={style.title}>PI DOGS - Martin Suarez</h1>
        </div>
        <ul className={style.navList}>
            <li>
              <NavLink exact to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink exact to="/create">Create breed</NavLink>
            </li>
            <li>
              <NavLink exact to="/about">About</NavLink>
            </li>
        </ul>
    </nav>
  )
}
