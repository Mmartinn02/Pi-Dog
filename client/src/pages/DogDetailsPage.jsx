import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import styles from "./DogDetailsPage.module.css";

export const DogDetailsPage = () => {
  
  const dogDetails = useSelector(state => state.dogDetail)

  const { name, weight_min, weight_max, height_min, height_max, life_span, image, Temperaments } = dogDetails;
  console.log(Temperaments)
  
  return (
    <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.card_container}>
              <div className={styles.button_back}>
                    <Link to={`/home`}>
                        <button>
                          <span className={styles.icon}>
                            ⬅️
                          </span>
                          <span className={styles.label}>Back</span>
                        </button>
                    </Link>
                </div>
                <div className={styles.name}>
                  <h1>{name}</h1>
                </div>
                <div>
                  <img src={image} alt={name} className={styles.image} />
                </div>
                <div className={styles.container__info}>
                  <p>These dogs can weight between {weight_min ? weight_min :  "N/A "} and {weight_max ? weight_max : NaN} kg.</p>
                  <p>And measure between {height_min ? height_min : "N/A "} and {height_max ? height_max : "N/A "} cm</p>
                  <p>Their average age is {life_span ? life_span : "N/A "} years</p>
                  {
                    Temperaments ? (
                      <p>Their temperaments are: {Temperaments.map(item => item.name).join(', ')}</p>
                    ) : (
                      <p>This dog has no temperament to show.</p>
                    )
                  }
                </div>
              </div>
            </div>
          
        
      
    </div>
  );
}
