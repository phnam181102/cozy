import React from 'react';

import { useParams } from 'react-router';

import './catalog.scss';

import FilterSidebar from '../../components/filter-sidebar/FilterSidebar';
import MovieGrid from '../../components/movie-grid/MovieGrid';
import MovieList from '../../components/movie-list/MovieList';

import { movieType, tvType } from '../../api/tmdbApi';
import { category as cate } from '../../api/tmdbApi';

const Catalog = () => {
    const { category } = useParams();

    const { keyword } = useParams();

    return (
        <>
            <div className="section">
                <div className="category-slider">
                    <MovieList
                        category={category}
                        type={category === cate.movie ? movieType.trending : tvType.trending}
                    />
                </div>

                <div key={category} className="main-content">
                    <FilterSidebar category={category} keyword={keyword} />

                    <div className="movie-list mb-3">
                        <p className="text-title">{keyword ? 'Results' : 'Top Rated'}</p>
                        <MovieGrid category={category} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalog;
