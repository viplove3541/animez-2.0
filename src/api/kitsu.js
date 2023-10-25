// Import necessary libraries and data source.
import axios from "axios"; // Axios for making HTTP requests
import { useQuery } from "react-query"; // React Query for managing asynchronous data
import topAnimeData from "../data/topAnime"; // Data source for top anime

// Function to fetch recent anime data.
export function useGetRecentAnime() {
  const queryObj = useQuery("recent-anime", async () => {
    // Fetch recent anime data from a specific API endpoint.
    return await axios
      .get(
        "https://kitsu.io/api/edge/anime?filter[status]=current&sort=-averageRating"
      )
      .catch((error) => {
        // If there's an error during the request, return topAnimeData and set isLoading to false.
        return { data: topAnimeData, isLoading: false };
      });
  });
  const data = queryObj.isError ? topAnimeData.data : queryObj.data?.data.data;
  // Return an object containing isLoading and data.
  return { isLoading: queryObj.isLoading, data: data };
}

// Function to fetch trending anime data.
export function useGetTrendingAnime() {
  const queryObj = useQuery("trending-anime", async () => {
    return await axios
      // Fetch trending anime data from a specific API endpoint.
      .get("https://kitsu.io/api/edge/trending/anime")
      .catch((error) => {
        // If there's an error during the request, return topAnimeData and set isLoading to false.
        return { data: topAnimeData, isLoading: false };
      });
  });
  // Determine the data based on whether there's an error in the query.
  const data = queryObj.isError ? topAnimeData.data : queryObj.data?.data.data;
  // Return an object containing isLoading and data
  return { isLoading: queryObj.isLoading, data: data };
}

// Function to fetch anime data by a specific ID.
export function useGetAnimeById(id) {
  const queryObj = useQuery(`anime-${id}`, async () => {
    return await axios
      // Fetch anime data by ID from a specific API endpoint.
      .get(`https://kitsu.io/api/edge/anime/${id}`)
      .catch((error) => {
        // If there's an error during the request, return the error.
        return error;
      });
  });

  // Determine the data based on the query response and return an object containing isLoading and data.
  const data = queryObj.data?.data.data;
  return { isLoading: queryObj.isLoading, data: { ...data } };
}
