import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactReadMoreReadLess from "react-read-more-read-less";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import MovieList from "../../components/movie-list/MovieList";
import Button, { OutlineButton } from "../../components/button/Button";
import Modal, { ModalContent } from "../../components/modal/Modal";

import "./detail.scss";

const Detail = () => {
    // src={`https://5163.svetacdn.in/iuzE3VxXf8Xf?imdb_id=${item.imdb_id}`}
    // src={`https://api.123movie.cc/imdb.php?imdb=${item.imdb_id}&server=vcu`}
    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    const [casts, setCasts] = useState([]);

    const setModalActive = async (id) => {
        const videos = await tmdbApi.getVideos(category, id);

        const modal = document.querySelector(`#modal`);

        if (videos.results.length > 0) {
            const officalVideo = videos.results.find((video) => {
                return video.name === "Official Trailer";
            });

            const videoSrc =
                "https://www.youtube.com/embed/" +
                `${officalVideo ? officalVideo.key : videos.results[0].key}`;
            modal.querySelector(".modal__content > iframe").setAttribute("src", videoSrc);
        } else {
            modal.querySelector(".modal__content").innerHTML = "No trailer";
        }

        modal.classList.toggle("active");
    };

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

    console.log(item);

    return (
        <>
            {item && (
                <div className="detail-wrapper">
                    <div
                        className="banner"
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(
                                item.backdrop_path || item.poster_path
                            )})`,
                        }}
                    ></div>
                    <div className="movie-content container">
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

                            <div className="btns">
                                <Link to={`/watch/${category}/${item.id}`}>
                                    <Button>
                                        <i className="bx bx-play"></i>
                                        <span>Play</span>
                                    </Button>
                                </Link>
                                <OutlineButton onClick={() => setModalActive(item.id)}>
                                    Watch trailer
                                </OutlineButton>
                            </div>

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

                    <div className="container mt-70">
                        <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Recommendations</h2>
                            </div>
                            <MovieList category={category} type="recommendations" id={item.id} />
                        </div>
                    </div>

                    <>
                        <Modal id="modal">
                            <ModalContent>
                                <iframe
                                    width="100%"
                                    height="500px"
                                    title="trailer"
                                    src={`https://api.123movie.cc/imdb.php?imdb=${item.imdb_id}&server=vcu`}
                                ></iframe>
                            </ModalContent>
                        </Modal>
                    </>
                </div>
            )}
        </>
    );
};

export default Detail;
