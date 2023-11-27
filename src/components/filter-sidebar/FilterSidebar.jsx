import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router';

import './filter-sidebar.scss';

import { category as cate } from '../../api/tmdbApi';

function FilterSidebar(props) {
    const $ = document.querySelector.bind(document);

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    // const [amountFilter, setAmountFilter] = useState(0);

    const genres = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' },
    ];

    var yearItem01 = new Date().getFullYear();

    let listYears = [
        { id: 1, year: yearItem01 },
        { id: 2, year: yearItem01 - 1 },
        { id: 3, year: yearItem01 - 2 },
        { id: 4, year: yearItem01 - 3 },
        { id: 5, year: yearItem01 - 4 },
    ];

    const toggleActive = (e) => {
        const node = e.target.closest('.filter-section-collapse-item');
        if (node.classList.contains('active')) {
            node.classList.toggle('active');
        } else {
            const listNode = $('.filter-section-checkbox').querySelectorAll(
                '.filter-section-collapse-item'
            );
            listNode.forEach((node) => {
                node.classList.remove('active');
            });
            node.classList.toggle('active');
        }
    };

    const toggleOpen = (e) => {
        const node = e.target.closest('.filter-section-title-collapsible');
        node.classList.toggle('open');
    };

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history.push(`/${cate[props.category]}/search/${keyword}`);
        } else if (keyword.trim().length === 0) {
            history.push(`/${cate[props.category]}`);
        }
    }, [keyword, props.category, history]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    useEffect(() => {
        goToSearch();
    }, [keyword, goToSearch]);

    return (
        <>
            <aside className="filter-sidebar" id={props.category} key={props.category}>
                <div className="filter-section">
                    <div className="browse-filters-header">
                        <div className="filter-title">Filters</div>
                    </div>

                    <div className="browse-filters-header">
                        <div className="filter-input">
                            <span className="icon">
                                <i className="bx bx-search"></i>
                            </span>
                            <input
                                type="text"
                                placeholder="Keywords"
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-section">
                    <button
                        className="filter-section-title-collapsible"
                        onClick={(e) => toggleOpen(e)}
                    >
                        <div className="filter-section-title-text">Genre</div>

                        <span className="icon">
                            <i className="bx bx-chevron-up"></i>
                        </span>
                    </button>

                    <ul className="filter-section-collapse list-item">
                        {genres.map((genre) => (
                            <li
                                className="filter-section-collapse-item"
                                key={genre.id}
                                onClick={(e) => toggleActive(e)}
                            >
                                {genre.name}
                                <i className="filter-section-collapse-item-icon bx bx-check"></i>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="filter-section filter-section-checkbox">
                    <button
                        className="filter-section-title-collapsible"
                        onClick={(e) => toggleOpen(e)}
                    >
                        <div className="filter-section-title-text">Released</div>

                        <span className="icon">
                            <i className="bx bx-chevron-up"></i>
                        </span>
                    </button>

                    <ul className="filter-section-collapse list-item">
                        {listYears.map((item) => (
                            <li
                                className="filter-section-collapse-item"
                                key={item.id}
                                onClick={(e) => toggleActive(e)}
                            >
                                {item.year}
                                <i className="filter-section-collapse-item-icon bx bx-check"></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default FilterSidebar;
