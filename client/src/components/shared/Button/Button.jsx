import React from 'react'
import {Link} from 'react-router-dom'

export const Button = ({ 
    title = '',
    toRoute,
    clickFn = () => {},
    className
}) => {

    if(toRoute) {
        return (
            <Link to={toRoute}>
                <button className={className}>{title}</button>
            </Link>
        )
    }
    
    return (
        <button onClick={() => clickFn()} className={className}>
            {title}
        </button>
    )
 
}
