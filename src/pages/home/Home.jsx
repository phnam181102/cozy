import React from "react";

import "./Home.scss";

import HeroSlide from "../../components/hero-slide/HeroSlide";
import MovieList from "../../components/movie-list/MovieList";

import { category, movieType, tvType } from "../../api/tmdbApi";

const Home = () => {
    return (
        <div className="wrapper">
            <HeroSlide />

            <div className="section">
                <div className="mb-4">
                    <div className="section__header mb-1-75">
                        <h2 className="section__header__title">Trending Movies</h2>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>

                <div className="mb-4">
                    <div className="section__header mb-1-75">
                        <h2 className="section__header__title">Top Rated Movies</h2>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>

                <div className="mb-4">
                    <div className="section__header mb-1-75">
                        <h2 className="section__header__title">Trending TV</h2>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>

                <div className="mb-4">
                    <div className="section__header mb-1-75">
                        <h2 className="section__header__title">Top Rated TV</h2>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </div>
    );
};

export default Home;
