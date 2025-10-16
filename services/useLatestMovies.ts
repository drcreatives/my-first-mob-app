import { MovieResponse } from "@/interfaces/movie";
import { getLatestMoviesOptions, getLatestMoviesUrl } from "./api";
import { useFetch } from "./useFetch";

export type { Movie } from "@/interfaces/movie";

export const useLatestMovies = () => {
  const url = getLatestMoviesUrl();
  const options = getLatestMoviesOptions();
  
  const { data, loading, error, refetch, reset } = useFetch<MovieResponse>(url, options);

  return {
    movies: data?.results || [],
    loading,
    error,
    refetch,
    totalResults: data?.total_results || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.page || 1,
    reset
  };
};
