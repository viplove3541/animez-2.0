import axios from "axios";
import { useQuery } from "react-query";
import { servers } from "../api/gogoanime_servers";

// Define a custom hook for handling API consumption and responses
export const useHandleConsumetResponse = (endpoint, parameter) => {
  const BASE_URL = "https://api.consumet.manjotbenipal.xyz/anime/gogoanime";
  
  // Use the 'useQuery' hook to fetch data from the specified API endpoint
  const results = useQuery([endpoint, parameter], async () => {
    if (parameter) {
      const response = await axios.get(`${BASE_URL}${endpoint}${parameter}`);
      return response.data; // Return the data directly
    }
  }, {
    enabled: !!parameter, // Only run the query if parameter is provided
    retry: 3, // Retry failed requests up to 3 times
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  return {
    isLoading: results.isLoading,
    isError: results.isError,
    data: results.data,
  };
};

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

  if (results?.length === 1) {
    if (results[0].id.endsWith("dub")) {
      dubAnime = results[0];
    } else {
      subAnime = results[0];
    }
  }

  if (results?.length > 1) {
    if (!results[0].id.endsWith("dub")) {
      subAnime = results[0];
      if (results[1].id.endsWith("dub")) {
        dubAnime = results[1];
      }
    } else {
      dubAnime = results[0];
    }
  }

  return {
    dub: dubAnime,
    sub: subAnime,
    isLoading: searchResults.isLoading,
    isError: searchResults.isError,
  };
}

/**
 * Fetch anime information by ID using the API.
 * @param  id - The ID of the anime.
 * @returns anime data or loading state.
 */
export function useAnimeInfo(id) {
  const results = useHandleConsumetResponse(`/info/`, id);
  return {
    isLoading: results.isLoading,
    isError: results.isError,
    data: results.data,
  };
}

/**
 * Fetch available servers for a specific episode using the API.
 * @param  episodeId - The ID of the episode.
 * @returns list of usable servers or loading state.
 */
export function useServers(episodeId) {
  const results = useHandleConsumetResponse(`/servers/`, episodeId);
  const usableServers = [];

  if (!results.isLoading && results.data) {
    servers.forEach((server) => {
      const matchedServer = results.data.find(
        (apiServer) => apiServer.name === server.name
      );
      if (matchedServer) {
        usableServers.push({ ...matchedServer, id: server.id });
      }
    });
  }

  return {
    usableServers,
    isLoading: results.isLoading,
    isError: results.isError,
  };
}

/**
 * Fetch episode files for a specific server and episode ID.
 * @param  server - The server object.
 * @param  id - The ID of the episode.
 * @returns episode sources or loading state.
 */
export function useEpisodeFiles({ server, id }) {
  const results = useHandleConsumetResponse(
    "/watch/",
    server && id ? `${id}?server=${server.id}` : null
  );

  return {
    sources: results.data?.sources,
    isLoading: results.isLoading,
    isError: results.isError,
  };
}


