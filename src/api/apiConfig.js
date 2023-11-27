const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    language: '&language=en-us',
    apiKey: process.env.REACT_APP_API_KEY,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
    w300Image: (imgPath) => `https://image.tmdb.org/t/p/w300${imgPath}`,
};

export default apiConfig;
