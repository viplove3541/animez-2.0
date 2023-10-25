import React from "react"; // Import React library.
import { useSearchParams } from "react-router-dom"; // Import useSearchParams for accessing URL parameters.
import { getAnimeByType } from "../api/jikan"; // Import a function to fetch anime data based on a specified type.
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner component for loading state.
import AnimeCollection from "../components/MainContainer/AnimeCollection"; // Import AnimeCollection component to display anime data.
import { easeOut, motion } from "framer-motion"; // Import motion components from 'framer-motion' for animations.

export default function AnimeByType() {
  // Get and destructure URL search parameters using useSearchParams.
  const [searchParams] = useSearchParams();
  // Retrieve a collection of anime based on the specified type from URL parameters.
  const collection = getAnimeByType(searchParams.get("typeName"));
  // Log collection and search parameter for debugging.

  return (
    <motion.div
      className="collections-wrapper d-flex-fd-column a-center"
      initial={{ opacity: 0 }} // Set the initial animation state with opacity 0.
      animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }} // Animate the component's entrance.
      transition={{ duration: 0.7, ease: easeOut }} // Define animation properties.
    >
      {collection.isLoading ? ( // Check if data is still loading.
        <LoadingSpinner /> // If loading, render the LoadingSpinner component.
      ) : (
        <AnimeCollection
          collectionName={searchParams.get("heading")} // Display the collection name based on the heading parameter.
          data={collection} // Pass the anime collection data to the AnimeCollection component.
        />
      )}
    </motion.div>
  );
}
