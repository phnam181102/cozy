import React from 'react';

import './page-header.scss';

import bg from '../../assets/footer-bg.jpg';
import movieBg from '../../assets/movie-footer-bg.jpg';
import tvShowBg from '../../assets/tvshow-footer-bg.jfif';

const PageHeader = props => {
    return (
        <div className="page-header" style={{backgroundImage: props.category === "movie" ? `url(${movieBg})` : `url(${tvShowBg})`}}>
            <h2>{props.children}</h2>
        </div>
    );
}


export default PageHeader;
