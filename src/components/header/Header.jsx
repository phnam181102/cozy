import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

// import logo from "../../assets/tmovie.png";

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex((e) => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        };
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    {/* <img src={logo} alt="" /> */}
                    <Link to="/">COZY</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((e, i) => (
                        <li key={i} className={`${i === active ? 'active' : ''}`}>
                            <Link key={e.path} to={e.path}>
                                {e.display}
                            </Link>
                        </li>
                    ))}

                    <li className="watch-list-icon header__icon">
                        <i className="bx bx-bookmark"></i>
                    </li>

                    <li className="search-icon header__icon">
                        <i className="bx bx-search"></i>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
