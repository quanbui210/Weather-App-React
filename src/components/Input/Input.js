import React from 'react'
import Button from '../Button/Button'
import './Input.css'

const Input = ({value, onChange, onClick, cityCode, setCityCode}) => {


    return(
    <React.Fragment>
        <div className="wrap">
        <div className="search">
        <input className="filter-input" placeholder="Search..." value={value} onChange={onChange}/>
        <Button onClick={onClick}/>
        </div>
     </div>
     </React.Fragment>
    )
}

export default Input