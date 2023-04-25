import React from 'react'
import { useSelector, useDispatch } from 'react-redux'; 
import { sortDogs } from '../../Redux/Actions';
import { availableSorts } from '../../Redux/Reducer';
import style from './SortBy.module.css'


export const SortBy = () => {
    const dispatch = useDispatch()
    const availableSortsArr = useSelector((state) => state.availableSorts)
    const activeSort = useSelector((state) => state.activeSort)

    const handleSelectSort = (e) => {
        const { value } = e.target;
        dispatch(sortDogs({...availableSorts[value]}))
    };
  return (
      <form style={{display: 'inline-block', marginLeft: 20}}>
        <label htmlFor="sort">Sort By</label>

        <select name="sort" id="sortBy" onChange={(e) => handleSelectSort(e)}>
            {
                availableSortsArr.map(item => (
                    <option key={item.name} value={item.value}>{item.name}</option>
                ))
            }
        </select>
      </form>
  )
}
