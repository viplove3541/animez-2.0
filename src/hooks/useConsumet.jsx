import axios from "axios";  
import { useQuery } from "react-query";
import { servers } from "../api/gogoanime_servers";

export const useHandleConsumetResponse = (endpoint, parameter) => {
  const BASE_URL = "https://api.consumet.manjotbenipal.xyz/anime/gogoanime";

  const results = useQuery([endpoint, parameter], async () => {
    if (parameter) {
      return await axios
        .get(`${BASE_URL}${endpoint}${parameter}`)
        .then((res) => res.data)
        .catch((err) => {
          console.error("API Error:", err);
          return null;
        });
    }
  });

  if (!parameter) {
    return { isLoading: true };
  }

  return {
    isLoading: results.isLoading,
    isError: results.isError,
    data: results.data,
  };
};

export function useSearch(name) {
  const searchResults = useHandleConsumetResponse("/", name);
  const results = searchResults.data?.results || [];

  let subAnime = null, dubAnime = null;
  if (results.length === 0) return { noAnime: true };

  if (results.length === 1) {
    if (results[0].id.endsWith("dub")) {
      dubAnime = results[0];
    } else {
      subAnime = results[0];
    }
  } else {
    const isDub = (id) => id.endsWith("dub");
    subAnime = isDub(results[0].id) ? null : results[0];
    dubAnime = results[1] && isDub(results[1].id) ? results[1] : null;
  }

  return {
    dub: dubAnime,
    sub: subAnime,
    isLoading: searchResults.isLoading,
    isError: searchResults.isError,
  };
}

export function useAnimeInfo(id) {
  const results = useHandleConsumetResponse("/info/", id);
  return results.isLoading ? { isLoading: true } : results.data;
}

export function useServers(episodeId) {
  const results = useHandleConsumetResponse("/servers/", episodeId);
  if (results.isLoading) return { isLoading: true };

  return servers.reduce((usableServers, server) => {
    const matchedServer = results.data?.find((s) => s.name === server.name);
    if (matchedServer) usableServers.push({ ...matchedServer, id: server.id });
    return usableServers;
  }, []);
}

export function useEpisodeFiles({ server, id }) {
  const queryParam = server && id ? `/${id}?server=${server.id}` : null;
  const results = useHandleConsumetResponse("/watch/", queryParam);

  return results.isLoading
    ? { isLoading: true }
    : { sources: results.data?.sources, isLoading: false };
}
