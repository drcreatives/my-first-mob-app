import { MovieDetails } from "@/interfaces/movie-details";

export const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatReleaseYear = (date: string): string => {
  if (!date) return "N/A";
  return new Date(date).getFullYear().toString();
};

export const formatReleaseDate = (date: string): string => {
  if (!date) return "N/A";
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatVoteCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
};

export const formatBudget = (budget: number): string => {
  if (!budget) return "N/A";
  if (budget >= 1000000) {
    return `$${(budget / 1000000).toFixed(1)} million`;
  }
  return `$${budget.toLocaleString()}`;
};

export const formatRevenue = (revenue: number): string => {
  if (!revenue) return "N/A";
  if (revenue >= 1000000000) {
    return `$${(revenue / 1000000000).toFixed(1)} Billion`;
  } else if (revenue >= 1000000) {
    return `$${(revenue / 1000000).toFixed(0)} Million`;
  }
  return `$${revenue.toLocaleString()}`;
};

export const getRatingCategory = (movie: MovieDetails): string => {
  if (movie.adult) return "R";
  // Default to PG-13 if not specified (TMDB doesn't provide certification in basic details)
  return "PG-13";
};

export const joinWithSeparator = (items: string[], separator: string = "•"): string => {
  return items.filter(Boolean).join(` ${separator} `);
};
