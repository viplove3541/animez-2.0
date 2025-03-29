import axios from "axios";  
import { useQuery } from "react-query";
import { servers } from "../api/gogoanime_servers";

// Define a custom hook for handling API consumption and responses
export const useHandleConsumetResponse = (endpoint, parameter) => {
  const BASE_URL = "https://consumet.manjotbenipal.xyz/anime/gogoanime";

  // Use the 'useQuery' hook to fetch data from the specified API endpoint
  const results = useQuery(`${endpoint}${parameter}`, async () => {
    if (parameter) {
      return await axios
        .get(`${BASE_URL}${endpoint}${parameter}`)
        .catch((err) => console.log(err));
    }
  });

  if (!parameter) {
    return { isLoading: true };
  }

  return {
    isLoading: results.isLoading,
    isError: results.isError,
    data: results.data?.data,
  };
};

// Search for anime by name
export function useSearch(name) {
  const searchResults = useHandleConsumetResponse("/", name);
  const results = searchResults.data?.results;

  let subAnime, dubAnime;
  if (results?.length === 0) {
    return { noAnime: true };
  }

  if (results?.length === 1) {
    if (results[0].id.slice(results[0].id.length - 3) === "dub") {
      dubAnime = results[0];
    } else {
      subAnime = results[0];
    }
  }

  if (results?.length > 1) {
    const suffix_0 = results[0].id.slice(results[0].id.length - 3);
    if (suffix_0 !== "dub") {
      subAnime = results[0];
      if (results[1].id.slice(results[1].id.length - 3) === "dub") {
        dubAnime = results[1];
      } else {
        dubAnime = null;
      }
    } else {
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

// Fetch anime info
export function useAnimeInfo(id) {
  const results = useHandleConsumetResponse("info", id);
  if (!results.isLoading && results.data) {
    return results.data;
  }
}

// Fetch available servers
export function useServers(episodeId) {
  const results = useHandleConsumetResponse("servers", episodeId);
  if (!results.isLoading && results.data) {
    const usableServers = [];
    for (let i = 0; i < servers.length; i++) {
      for (let j = 0; j < results.data.length; j++) {
        if (servers[i].name === results.data[j].name) {
          usableServers.push({ ...results.data[j], id: servers[i].id });
        }
      }
    }
    return usableServers;
  }
}

// Fetch episode files for a specific server and episode ID
export function useEpisodeFiles({ server, id }) {
  const results = useHandleConsumetResponse(
    "/watch/",
    server && id ? `${id}?server=${server.id}` : null
  );

  if (!results.isLoading && results.data) {
    return {
      sources: results.data.sources,
      isLoading: results.isLoading,
    };
  } else {
    return { isLoading: results.isLoading };
  }
}
