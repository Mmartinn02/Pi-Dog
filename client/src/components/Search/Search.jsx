import React, {useState} from 'react'
import { SortBy } from '../SortBy'
import { useDispatch } from 'react-redux'
import { filterByDogName } from '../../Redux/Actions'
import style from './Search.module.css'
import { SearchInput } from '../shared/SearchInput'

export const Search = () => {
    const dispatch = useDispatch();

    return (
        <div className={style.searchContainer}>
            <SearchInput 
              handleSubmitFn={(searchDog) => dispatch(filterByDogName(searchDog))}
              placeholder="Filter by breed..."
              buttonActive
            />
            <SortBy />
        </div>
    )
}
