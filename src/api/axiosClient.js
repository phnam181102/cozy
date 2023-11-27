import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;

// https://api.themoviedb.org/3/search/movie?api_key=2883f20f73fbea74368aa670589c5ef6&query=m&year=2015&with_genres=27&with_genres=12
// https://api.themoviedb.org/3/discover/movie?api_key=###&primary_release_date.gte=2020-10-01&primary_release_date.lte=2020-10-15

// primary_release_year: "2021",
