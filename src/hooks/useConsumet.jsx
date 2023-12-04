import axios from "axios";
import { useQuery } from "react-query";
import { servers } from "../api/gogoanime_servers";

// Define a custom hook for handling API consumption and responses
export const useHandleConsumetResponse = (endpoint, parameter) => {
  const BASE_URL = "https://kaido-api.vercel.app/anime/gogoanime";
  // Use the 'useQuery' hook to fetch data from the specified API endpoint
  const results = useQuery(`${endpoint}${parameter}`, async () => {
    if (parameter) {
      return await axios
        .get(`${BASE_URL}${endpoint}${parameter}`)
        .catch((err) => console.log(err));
    }
  });

  // If there's no parameter provided, return an object indicating loading state
  if (!parameter) {
    return { isLoading: true };
  }

   // Return an object containing loading state, error state, and the retrieved data
  return {
    isLoading: results.isLoading,
    isError: results.isError,
    data: results.data?.data,
  };
}

/**
 * Search for anime by name using the API.
 * @param  name - The name of the anime to search for.
 * @returns an object containing loading and error states from the query and data retrieved
 */

export function useSearch(name) {
  const searchResults = useHandleConsumetResponse("/", name);
  const results = searchResults.data?.results;

  let subAnime, dubAnime;
  if (results?.length === 0) {
    return { noAnime: true };
  }
  /**
   * if results only contain one item determine wheter its sub or dub
   */
  if (results?.length === 1) {
    if (
      results[0].id.slice(results[0].id.length - 3, results[0].id.length) ===
      "dub"
    ) {
      dubAnime = results[0];
    } else {
      subAnime = results[0];
    }
  }

  if (results?.length > 1) {
    const suffix_0 = results[0].id.slice(
      results[0].id.length - 3,
      results[0].id.length
    );
    /**
     * if results.length is more than one
     * if the first item is not dub->
     * then set the subAnime=results[0]
     *
     * check if the second item is dub->
     * if true set the dubAnime=results[1]
     * else set dubAnime=null
     *
     * else check if first item dub->
     *  if yes set dubAnime=results[0]
     *  and subAnime=null
     */
    if (suffix_0 !== "dub") {
      subAnime = results[0];
      if (
        results[1].id.slice(results[1].id.length - 3, results[1].id.length) ===
        "dub"
      ) {
        dubAnime = results[1];
      } else {
        dubAnime = null;
      }
    } else if (suffix_0 === "dub") {
      dubAnime = results[0];
      subAnime = null;
    }
  }
  if (!searchResults.isLoading) {
    return {
      dub: dubAnime,
      sub: subAnime,
      isLoading: searchResults.isLoading,
      isError: searchResults.isError,
    };
  }
}

export function useAnimeInfo(id) {
   // Use the 'useHandleConsumetResponse' function to fetch anime information.
  const results = useHandleConsumetResponse(`/info/`, id);
    // Check if data has loaded successfully and if there's data available.
  if (!results.isLoading && results.data) {
    return results.data;
  }
}
export function useServers(episodeId) {
    // Use the 'useHandleConsumetResponse' function to fetch available servers.
  const results = useHandleConsumetResponse(`/servers/`, episodeId);
  // Check if data has loaded successfully and if there's data available.
  if (!results.isLoading && results.data) {
    const usableServers = [];

     // Iterate through the 'servers' list and match with available server data.
    for (let i = 0; i < servers.length; i++) {
      for (let j = 0; j < results.data.length; j++) {
        if (servers[i].name === results.data[j].name) {
          usableServers.push({ ...results.data[j], id: servers[i].id });
        }
      }
    }
   // Return the list of usable servers.
    return usableServers;
  }
}

// * Fetch episode files for a specific server and episode ID.
export function useEpisodeFiles({ server, id }) {
   // Use the 'useHandleConsumetResponse' function to fetch episode files.
  const results = useHandleConsumetResponse(
    "/watch/",
    server && id ? `${id}?server=${server.id}` : null
  );
   // Check if data has loaded successfully and if there's data available.
  if (!results.isLoading && results.data) {
    return {
      sources: results.data.sources,
      isLoading: results.isLoading,
    };
  } else {
    return { isLoading: results.isLoading };
  }
}


