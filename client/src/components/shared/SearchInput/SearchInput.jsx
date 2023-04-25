import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import style from './SearchInput.css'

function debounce(fn, delay) {
    /*
        Throttling enforces a maximum number of times a function can be called over time. 
        E.g. "execute this function at most once every 100 milliseconds."
        Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called.
     */
    let timer = null;
    return function() {
      let that = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
           fn.apply(that, args);
      }, delay);
  }
}

export const SearchInput = ({
    handleSubmitFn,
    placeholder,
    onChangeFn,
    style,
    buttonActive
}) => {
    const [searchValue, setSearchValue] = useState('')
    
    const handleInput = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value)
        if(onChangeFn) {
            // support for future auto suggests
            debounce(
                onChangeFn(e.target.value),
                200
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(handleSubmitFn) {
            handleSubmitFn(searchValue)
        }
        setSearchValue('')
        
    }

  return (
    <form className="searchForm">
        <input
            className="inputSearch"
            style={style?.input || {}}
            type="text" 
            onChange={e => handleInput(e)} 
            value={searchValue} 
            placeholder={placeholder}
        />
        {
            buttonActive &&
        <button 
            className="inputButton"
            type="submit" 
            style={style?.button || {}}
            onSubmit={e => handleSubmit(e)}
            onClick={e => handleSubmit(e)}>
                <FaSearch />
        </button>
        }
    </form>
  )
}
