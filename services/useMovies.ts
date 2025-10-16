import { MovieResponse } from "@/interfaces/movie";
import { getMoviesOptions, getMoviesUrl } from "./api";
import { useFetch } from "./useFetch";

export type { Movie } from "@/interfaces/movie";

export const useMovies = (query?: string) => {
  const url = getMoviesUrl(query);
  const options = getMoviesOptions();
  
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
