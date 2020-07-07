import React from 'react'
import {useDispatch} from 'react-redux'
import { filterApplied } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleFilterChange = (event) =>
    {
        dispatch(filterApplied(event.target.value))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter
