import React from "react"; // Import React library.

import { useSearchParams } from "react-router-dom"; // Import useSearchParams for accessing URL parameters.
import { getAnimeByGenre } from "../api/jikan"; // Import a function to fetch anime data based on a specified genre.

import AnimeCollection from "../components/MainContainer/AnimeCollection"; // Import AnimeCollection component to display anime data.
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner component for loading state.
import { easeOut, motion } from "framer-motion"; // Import motion components from 'framer-motion' for animations.

export default function Grid() {
  // Get and destructure URL search parameters using useSearchParams.
  const [params, setParams] = useSearchParams();
  // Retrieve anime data based on the specified genre from URL parameters.
  const anime = getAnimeByGenre(params.get("id"));

  return (
    <motion.div
      className="collections-wrapper d-flex-fd-column a-center"
      initial={{ opacity: 0 }} // Set the initial animation state with opacity 0.
      animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }} // Animate the component's entrance.
      transition={{ duration: 0.7, ease: easeOut }} // Define animation properties.
    >
      {!anime.isLoading ? ( // Check if data is still loading.
        <AnimeCollection collectionName={params.get("name")} data={anime} /> // If not loading, render the AnimeCollection component with the specified collection name and anime data.
      ) : (
        <LoadingSpinner /> // If loading, render the LoadingSpinner component.
      )}
    </motion.div>
  );
}
