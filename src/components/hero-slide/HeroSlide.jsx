import React, { useState, useEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router";

import Button from "../button/Button";
import PlayBtn from "../play-btn/PlayBtn";
import tmdbApi, { movieType, category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import TrailerModal from "../trailer-modal/TrailerModal";
import "./hero-slide.scss";

const HeroSlide = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 6));
            } catch {
                console.log("error");
            }
        };
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                speed={1000}
                loop={true}
                autoplay={{ delay: 5000 }}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? "active" : ""}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {movieItems.map((item, i) => (
                <TrailerModal key={i} item={item} />
            ))}
        </div>
    );
};

const HeroSlideItem = (props) => {
    const item = props.item;

    let hisrory = useHistory();

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    function getRating(rating) {
        if (rating > 0 && rating < 10) {
            return rating.toFixed(1);
        } else {
            return rating === 10 ? 10 : 0;
        }
    }

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
            modal.querySelector(".modal__content > iframe").setAttribute("src", videSrc);
        } else {
            modal.querySelector(".modal__content").innerHTML = "No trailer";
        }

        modal.classList.toggle("active");
    };

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content">
                <div className="hero-slide__item__content__info">
                    <h2 className="title big-title">{item.title}</h2>
                    <div className="info-detail">
                        <div className="bg">
                            <span className="vote-average">
                                <i className="bx bxs-star"></i> {getRating(item.vote_average)}
                            </span>
                            <span className="between">|</span>
                            {item.release_date || item.first_air_date}
                        </div>

                        <div className="overview">{item.overview}</div>
                    </div>

                    <div className="play-btn">
                        <Button onClick={() => hisrory.push("/movie/" + item.id)}>
                            <i className="bx bx-play"></i>
                            <span>Play now</span>
                        </Button>
                    </div>
                </div>

                <div className="watch-trailer" onClick={setModalActive}>
                    <div className="watch-trailer-inner">
                        <PlayBtn />
                        <span className="w-trailer">Watch Trailer</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;
