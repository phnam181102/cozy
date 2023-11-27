import React from 'react'
import { FiSearch } from 'react-icons/fi';

import './movie-search.scss'

const Search = () => {
    return (
        <div className="search">
            <h2 className="search-title">Discover Your Favorites</h2>

            <div className="search-wrapper">
                <div className="search-box">
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                    <input type="text" className="search-input" placeholder="Search"></input>
                </div>
                        
                <div className="search-filter">
                    <i className='bx bxs-category'></i>
                </div>
            </div>
        </div>
    )
}

export default Search
