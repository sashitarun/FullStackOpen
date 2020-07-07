import React from 'react'
import { connect } from 'react-redux'
import { filterApplied } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleFilterChange = (event) =>
    {
        //dispatch(filterApplied(event.target.value))
        props.filterApplied(event.target.event)
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

export default connect(null,{filterApplied})(Filter)
