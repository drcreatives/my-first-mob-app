export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  BASE_URL: process.env.EXPO_PUBLIC_TMDB_BASE_URL,
  IMAGE_BASE_URL: process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const getMoviesUrl = (query?: string) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`;
  return `${TMDB_CONFIG.BASE_URL}${endpoint}`;
};

export const getMoviesOptions = () => ({
  method: "GET",
  headers: TMDB_CONFIG.headers,
});

export const getMovieDetailsUrl = (movieId: string | number) => {
  return `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`;
};

export const getMovieDetailsOptions = () => ({
  method: "GET",
  headers: TMDB_CONFIG.headers,
});
