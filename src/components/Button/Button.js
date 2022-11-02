import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import './Button.css';
const Button = ({onClick}) => {
    return (
            <button className='searchButton' onClick={onClick}>
                <SearchIcon className='search-icon' />
            </button>
    )
}

export default Button;