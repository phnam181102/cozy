import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactReadMoreReadLess from "react-read-more-read-less";

import "./watch.scss";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import MovieList from "../../components/movie-list/MovieList";

const WatchMovie = () => {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    const [casts, setCasts] = useState([]);
    const [detail, setDetail] = useState([]);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });

            setItem(response);
            window.scrollTo(0, 0);
        };
        getDetail();
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, id);
            setCasts(res.cast.slice(0, 5));
        };
        getCredits();
    }, [category, id]);

    useEffect(() => {
        if (category === "tv" && item) {
            const newItem = item.seasons.filter((season) => season.episode_count !== 0);
            setAmount(newItem.length);
        }
    }, [category, item]);

    useEffect(() => {
        const getDetail = async () => {
            // for (let i = 1; i <= amount; i++) {
            const response = await tmdbApi.getSeasonDetails(id, 1);
            console.log(response);
            setDetail(response);
            // }
        };
        getDetail();
        // setAmount(detail.episodes.length);
        // console.log(detail.episodes.length());
    }, [amount, id]);

    // map trong element, tach function
    console.log(detail);

    return (
        item && (
            <div className="section">
                <div
                    className="play"
                    style={{
                        backgroundImage: `url(${apiConfig.originalImage(
                            item.backdrop_path || item.poster_path
                        )})`,
                    }}
                >
                    <div
                        id="player"
                        style={{
                            height: "100%",
                        }}
                    >
                        <iframe
                            id="video"
                            width="1280px"
                            height="720px"
                            title="video"
                            src={`https://api.123movie.cc/imdb.php?imdb=${item.imdb_id}&server=vcu`}
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <div className="container">
                    <div className="movie-content  section detail-info">
                        <div className="movie-content__poster">
                            <div
                                className="movie-content__poster__img"
                                style={{
                                    backgroundImage: `url(${apiConfig.originalImage(
                                        item.poster_path || item.backdrop_path
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className="movie-content__info">
                            <h1 className="title">{item.title || item.name}</h1>

                            <p className="overview">
                                <ReactReadMoreReadLess
                                    charLimit={300}
                                    readMoreText={"Read more"}
                                    readLessText={"Read less"}
                                >
                                    {item.overview}
                                </ReactReadMoreReadLess>
                            </p>

                            <div className="genres">
                                {item.genres &&
                                    item.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="genres__item">
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>

                            <div className="detail">
                                <div className="detail__left">
                                    <div className="release-date">
                                        <p>
                                            <strong>Released:</strong>{" "}
                                            {item.release_date || item.first_air_date}
                                        </p>
                                    </div>

                                    <div className="cast">
                                        <p>
                                            <strong>Casts:</strong>
                                            {casts.map((cast, index) => {
                                                if (index === 0) {
                                                    return <span key={index}> {cast.name}</span>;
                                                } else {
                                                    return <span key={index}>, {cast.name}</span>;
                                                }
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="detail__right">
                                    <div className="duration">
                                        <p>
                                            <strong>Duration:</strong>{" "}
                                            {item.runtime || item.episode_run_time[0]} min
                                        </p>
                                    </div>

                                    <div className="country">
                                        <p>
                                            <strong>Country:</strong>{" "}
                                            {item.production_countries.map((country, index) => {
                                                if (index === 0) {
                                                    return <span key={index}> {country.name}</span>;
                                                } else {
                                                    return (
                                                        <span key={index}>, {country.name}</span>
                                                    );
                                                }
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {category === "tv" ? "Tv" : ""}

                <div className="container mt-70">
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Recommendations</h2>
                        </div>
                        <MovieList category={category} type="recommendations" id={item.id} />
                    </div>
                </div>
            </div>
        )
    );
};

export default WatchMovie;
