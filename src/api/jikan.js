// Import the necessary libraries and data sources.
import { useQuery } from "react-query"; // React Query library for managing asynchronous data
import { queueRequest } from "./apiQueue"; // Queue for managing API requests
import { genreData } from "../data/genre"; // Data source for genre information
import {
  onaData,
  ovaData,
  specialsData,
  moviesData,
} from "../data/mainSection"; // Data sources for different anime categories
import {
  favoriteData,
  topAiringData,
  upcoming,
  popularData,
} from "../data/featured"; // Data sources for featured anime
import characterData from "../data/characters"; // Data source for anime characters
import { animeReviewsData, mangaReviewsData } from "../data/reviews"; // Data sources for reviews

// Configuration for query caching and stale time.
const queryConfig = {
  staleTime: 2.1 * 60 * 1000, // Cache data for 2.1 minutes
};

// Function for executing a query using the "useQuery" hook.
const ExecuteQuery = (queryKey, endpoint) => {
  return useQuery(
    queryKey,
    async () => {
      return await queueRequest(endpoint);
    },
    queryConfig
  );
};

// Functions to fetch various types of anime and manga data.
export function handleJikanResponse(queryKey, endpoint, backupData) {
  const res = ExecuteQuery(queryKey, endpoint);
  const data =
    res.isError || res.data === undefined ? backupData : res.data?.data;
  return { data: data, isLoading: res.isLoading };
}

// Functions for fetching specific types of anime and manga data.
// Each function calls handleJikanResponse with a specific queryKey, endpoint, and backupData.
// These functions are used to fetch data for different sections or categories.
export function getMangaReviews() {
  return handleJikanResponse(
    "top-manga-reviews",
    "reviews/manga",
    mangaReviewsData
  );
}
export function getAnimeReviews() {
  return handleJikanResponse(
    "top-anime-reviews",
    "reviews/anime",
    animeReviewsData
  );
}

export function getTopAiring() {
  return handleJikanResponse(
    "top-airing",
    "top/anime?filter=airing&limit=4",
    topAiringData
  );
}
export function getMostPopular() {
  return handleJikanResponse(
    "most-popular",
    "top/anime?filter=bypopularity&limit=4",
    popularData
  );
}
export function getMostFavorite() {
  return handleJikanResponse(
    "most-favorite",
    "top/anime?filter=favorite&limit=4",
    favoriteData
  );
}
export function getTopMovies() {
  return handleJikanResponse(
    "top-movies",
    "top/anime?type=movie&filter=bypopularity&limit=12",
    moviesData
  );
}
export function getTopOVAs() {
  return handleJikanResponse(
    "top-OVAs",
    "top/anime?type=ova&filter=bypopularity&limit=12",
    ovaData
  );
}
export function getTopONAs() {
  return handleJikanResponse(
    "top-ONAs",
    "top/anime?type=ona&filter=bypopularity&limit=12",
    onaData
  );
}
export function getTopSpecials() {
  return handleJikanResponse(
    "top-specials",
    "top/anime?type=special&filter=bypopularity&limit=12",
    specialsData
  );
}
export function getTopUpcoming() {
  return handleJikanResponse(
    "top-upcoming",
    "top/anime?filter=upcoming&limit=4",
    upcoming
  );
}
export function getGenre() {
  return handleJikanResponse("genre", "genres/anime", genreData);
}
export function getTopCharacters() {
  return handleJikanResponse(
    "top-characters",
    "top/characters?limit=5",
    characterData
  );
}
export function getAnimeByMalId(id) {
  return handleJikanResponse(`anime-${id}`, `anime/${id}`, null);
}
export function getAnimeByGenre(mal_id) {
  return handleJikanResponse(
    `anime-by-genre-${mal_id}`,
    `anime?genres=${mal_id}&limit=24`,
    null
  );
}
export function getAnimeByFilter(filterName) {
  return handleJikanResponse(
    `anime-by-filter-${filterName}`,
    `top/anime?filter=${filterName}&limit=24`,
    null
  );
}
export function getAnimeByType(type) {
  return handleJikanResponse(
    `anime-by-type-${type}`,
    `top/anime?type=${type}&limit=24`,
    null
  );
}
export function getRecommendedAnime(type) {
  return handleJikanResponse(
    `recommended-anime`,
    `anime?limit=24&status=airing&filter=bypopularity&type=tv&order_by=popularity`,
    null
  );
}
export function getRandomAnime() {
  return handleJikanResponse(`random-anime`, "random/anime", null);
}
export function getAnimeSearch(name, parameter) {
  let queryString = "";
  if (parameter === "title") {
    queryString = `q=${name}`;
  } else {
    queryString = `letter=${name}`;
  }

  return handleJikanResponse(
    `anime-search${name}`,
    `anime?${queryString}&sfw=true&order_by=rank&limit=24`
  );
}
