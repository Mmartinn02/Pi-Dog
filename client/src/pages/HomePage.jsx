import React, {useEffect} from 'react'
import {Filters} from '../components/Filters'
import {DogPage} from '../components/DogPage'
import {Search} from '../components/Search'
import styles from './HomePage.module.css'

export const HomePage = () => {

  return (
    <div className={styles.home}>
      <div className={styles.lateralFilters}>
        <Filters />
      </div>
      <div className={styles.resultsContainer}>
        <Search />
        <DogPage />
      </div>
    </div>
  )
}
