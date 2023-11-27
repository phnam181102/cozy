import axiosClient from "./axiosClient";

export const category = {
    movie: "movie",
    tv: "tv",
};

export const movieType = {
    upcoming: "upcoming",
    popular: "popular",
    top_rated: "top_rated",
    trending: "trending",
};

export const tvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
    trending: "trending",
};

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = "movie/" + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = "tv/" + tvType[type];
        return axiosClient.get(url, params);
    },
    getMovieTrending: (type, params) => {
        const url = movieType[type] + "/movie/week";
        return axiosClient.get(url, params);
    },
    getTvTrending: (type, params) => {
        const url = movieType[type] + "/tv/week";
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + "/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
    getSeasonDetails: (id, seasonNumber) => {
        const url = category.tv + "/" + id + "/season/" + seasonNumber;
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = "search/" + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + "/" + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + "/" + id + "/credits";
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = category[cate] + "/" + id + "/similar";
        return axiosClient.get(url, { params: {} });
    },
    recommendations: (cate, id) => {
        const url = category[cate] + "/" + id + "/recommendations";
        return axiosClient.get(url, { params: {} });
    },
};

export default tmdbApi;
