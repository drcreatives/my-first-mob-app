import { MovieDetails } from "@/interfaces/movie-details";
import { getMovieDetailsOptions, getMovieDetailsUrl } from "./api";
import { useFetch } from "./useFetch";

export type { MovieDetails } from "@/interfaces/movie-details";

export const useMovieDetails = (movieId: string | number) => {
  const url = getMovieDetailsUrl(movieId);
  const options = getMovieDetailsOptions();
  
  const { data, loading, error, refetch } = useFetch<MovieDetails>(url, {
    ...options,
    autoFetch: true,
  });

  return {
    movie: data,
    loading,
    error,
    refetch,
  };
};
