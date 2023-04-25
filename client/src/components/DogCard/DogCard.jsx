import React from 'react'
import style from './DogCard.module.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDog } from '../../Redux/Actions'

export const DogCard = (props) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const goToDogDetails = () => {
    dispatch(getDog(props.dog.id))
    history.push(`/dogs/${props.dog.id}`)
  }
  
  const dogHeightMin = props.dog.height_min ? props.dog.height_min + ' cm' : ''
  const dogHeightMax = props.dog.height_max ? props.dog.height_max + ' cm' : ''
  const dogHeight = dogHeightMin + (dogHeightMin && dogHeightMax && ' - ') + dogHeightMax
  const dogWeightMin = props.dog.weight_min ? props.dog.weight_min + ' kg' : ''
  const dogWeightMax = props.dog.weight_max ? props.dog.weight_max + ' kg' : ''
  const dogWeight = dogWeightMin + (dogWeightMin && dogWeightMax && ' - ') + dogWeightMax

  return (
    
    <div className={style.dogCardContainer} onClick={() => goToDogDetails()}>
      { props.dog.image && <img className={style.dogImage} src={props.dog.image}/>}
      <div style={!props.dog.image ? {paddingLeft: 20} : {}}>
      <p className={style.dogName}>{props.dog.name}</p>
      <p className={style.dogHeight}>{dogHeight}</p>
      <p className={style.dogHeight}>{dogWeight}</p>
      </div>
    </div>
    
  )
}
