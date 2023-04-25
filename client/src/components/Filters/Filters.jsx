import React from 'react'
import { Chip } from '../shared/Chip'
import { useSelector, useDispatch } from 'react-redux';
import style from './Filters.module.css'
import { updateFilter } from '../../Redux/Actions';
import { originFilterValues, breedFilterValues, temperamentFilterValues } from '../../Redux/Reducer';

export const Filters = () => {
    const dispatch = useDispatch()
    const activeBreedFilter = useSelector((state) => state.activeBreedFilter)
    const activeOriginFilter = useSelector((state) => state.activeOriginFilter)
    const activeTemperamentsFilter = useSelector((state) => state.activeTemperamentFilters)
    const filteredDogs = useSelector((state) => state.dogs)
    const appliedBreedFilter = activeBreedFilter || breedFilterValues.ALL_BREEDS
    const appliedOriginFilter = activeOriginFilter || originFilterValues.ALL_ORIGIN

    const appliedTemperamentsFilter = activeTemperamentsFilter.length ? activeTemperamentsFilter : [temperamentFilterValues.ALL_TEMPERAMENTS]
    const numberOfResults = filteredDogs.length
    const appliedFilters = [...appliedTemperamentsFilter, appliedOriginFilter]
    const availableTemperaments = useSelector((state) => state.availableTemperaments) || []

    const setFilter = (filterValue) => {
        dispatch(updateFilter({ ...filterValue, value: filterValue.name, actionType: 'ADD' }))
    }

    const removeFilter = (filterValue) => {
        dispatch(updateFilter({ ...filterValue, value: filterValue.type === 'temperament' ? filterValue.name : undefined, actionType: 'REMOVE' }))
    }

    const handleSelectTemperament = (e) => {
        const { value } = e.target;
        setFilter({ ...temperamentFilterValues.TEMPERAMENT_NAME, value, name: value })
    };

    return (
        <div className={style.filters}>
            <div className={style.searchDetailsContainer}>
                <h2 className={style.termOfSearch}>{appliedBreedFilter.name}</h2>
                <span className={style.numberOfResults}>{numberOfResults} resultados</span>
            </div>

            <div className={style.appliedFilterContainer}>
                {
                    appliedFilters.map((item, idx) => (
                        <Chip
                            key={item.name}
                            title={item.name}
                            onClickIcon={item.enableDeleteFilterButton === false ? undefined : () => {
                                removeFilter(item)
                            }}
                        />
                    ))
                }
            </div>

            <form>
                {
                    appliedOriginFilter.name === 'All origins'
                    && (
                        <div className={style.dataOriginContainer}>
                            <p className={style.title}>Data origin</p>
                            <div>
                                <ul>
                                    <li onClick={() => setFilter(originFilterValues.ONLY_ORIGINAL_ORIGIN)}>
                                        <a className={style.filterDataOriginOption}>
                                            <span>Only original breeds</span>
                                        </a>
                                    </li>
                                    <li onClick={() => setFilter(originFilterValues.ONLY_CREATED_ORIGIN)}>
                                        <a className={style.filterDataOriginOption}>
                                            <span>Only new created breeds</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
                <div>
                    <p className={style.title}>Temperament</p>
                    <div>
                        <div>
                            <select name="temperament" id="temperamentFilter" onChange={handleSelectTemperament}>
                                {
                                    availableTemperaments.map(item => (
                                        <option key={item.name} value={item.name}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
