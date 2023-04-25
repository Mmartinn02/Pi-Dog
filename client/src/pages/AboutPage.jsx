import React from 'react'
import yo from "../assets/img/yo.png";
import styles from "./AboutPage.module.css";
export const AboutPage = () => {
  return (
    <div className={styles.About}>
      <div className={styles.yoContainer}>
    <img src={yo} className={styles.yoImage}/>
      </div>
      <h3 className={styles.Name}>Developed by: Martin Suarez</h3>
      <h3>Full Stack Developer | JavaScript</h3>
      <br/>
      <p className={styles.pHeight}>Skills: CSS, HTML, JavaScript, SQL, React.js, Redux, Sequelize.</p>
      <br/>
      <h3 className={styles.pHeight} >Contact me:</h3>
      <div>
        <p><a className={styles.link} href="https://github.com/Mmartinn02" target='_blank' rel="noreferrer">GitHub</a></p>
        <br/>
        <p> <a className={styles.link} href="https://www.linkedin.com/in/mmartinn02/" target='_blank' rel="noreferrer">LinkedIn </a></p>
      </div>
    </div>
  )
}
