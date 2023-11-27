import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import tmdbApi, { category } from "../../api/tmdbApi";

import MovieCard from "../movie-card/MovieCard";

const MovieList = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type === "trending") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieTrending(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvTrending(props.type, { params });
                }
            } else if (props.type === "recommendations") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.recommendations(props.category, props.id);
                        break;
                    default:
                        response = await tmdbApi.recommendations(props.category, props.id);
                }
            } else if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }

            setItems(
                props.type === "recommendations"
                    ? response.results.slice(0, 14)
                    : response.results.slice(0, 16)
            );
        };
        getList();
    }, [props.category, props.id, props.type]);

    return (
        <div className="movie-list">
            <div className="movie-grid">
                {items.map((item, i) => (
                    <MovieCard key={i} item={item} category={props.category} />
                ))}
            </div>
        </div>
    );
};

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieList;
