import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
    const item = props.item;

    const link = "/" + category[props.category] + "/" + item.id;

    const bg = apiConfig.w300Image(item.poster_path || item.backdrop_path);

    function getRating(rating) {
        if (rating > 0 && rating < 10) {
            return rating.toFixed(1);
        } else {
            return rating === 10 ? 10 : 0;
        }
    }

    function getYear(data) {
        if (data) {
            const year = data.slice(0, 4);
            return year;
        }
        return data;
    }

    return (
        <Link to={item.vote_average > 0 ? link : "/"}>
            <div className="movie-cart">
                <div className="movie-poster" style={{ backgroundImage: `url(${bg})` }}>
                    <span className="movie-rating">
                        <i className="bx bxs-star"></i>
                        {getRating(item.vote_average)}
                    </span>

                    <Button className="play-btn">
                        <i className="bx bx-play"></i>
                    </Button>

                    <h3 className="movie-name">{item.title || item.name}</h3>

                    <span className={"movie-release-date"}>
                        {getYear(item.release_date || item.first_air_date)}
                    </span>
                </div>
                {/* <span className={getColor(item.vote_average)} >{item.vote_average.toFixed(1) === 10 ? 10 : item.vote_average.toFixed(1)}</span> */}
            </div>
        </Link>
    );
};

export default MovieCard;
