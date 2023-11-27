import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import { OutlineButton } from "../button/Button";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";

const MovieGrid = (props) => {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.top_rated, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.top_rated, { params });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(props.category, { params });
            }
            let result = response.results.filter(
                (item) => item.vote_average > 0 && item.poster_path !== null
            );
            setItems(result);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1,
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbApi.search(props.category, { params });
        }
        let result = response.results.filter((item) => item.vote_average > 0 && item.poster_path !== null);
        setItems([...items, ...result]);
        setPage(page + 1);
    };

    return (
        <>
            {items.length === 0 ? (
                <div className="not-found">Not found!</div>
            ) : (
                <div className="movie-grid">
                    {items.map((item, i) => (
                        <MovieCard category={props.category} item={item} key={i} />
                    ))}
                </div>
            )}
            {page < totalPage ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
};

export default MovieGrid;
