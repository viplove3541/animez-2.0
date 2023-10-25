import React from "react"; // Import React library.
import TopTenAnime from "../components/TopTen/TopTenAnime"; // Import TopTenAnime component.
import AnimeCollection from "../components/MainContainer/AnimeCollection"; // Import AnimeCollection component.
import Genre from "../components/Genre/Genre"; // Import Genre component.
import { Outlet } from "react-router-dom"; // Import Outlet from 'react-router-dom' for routing.
import { getRecommendedAnime } from "../api/jikan"; // Import a function to get recommended anime from the API.
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner component.
import { easeOut, motion } from "framer-motion"; // Import motion components from 'framer-motion' for animations.

export default function RecommendedTopTen() {
  // Retrieve a collection of recommended anime.
  const collection = getRecommendedAnime();

  return (
    <>
      <Outlet /> {/* Render the routing Outlet for nested routes. */}
      <motion.div
        className="main-container d-flex"
        initial={{ opacity: 0 }} // Set the initial animation state with opacity 0.
        animate={{ x: [window.innerWidth, 0], opacity: 1 }} // Animate the component's entrance.
        transition={{ duration: 0.7, ease: easeOut }} // Define animation properties.
        style={window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}}
        // Adjust the component's style based on window width.
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          <Genre /> {/* Render the Genre component. */}
          <TopTenAnime /> {/* Render the TopTenAnime component. */}
        </div>
        <div
          className="collections-wrapper d-flex"
          style={window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}}
          // Adjust the style based on window width.
        >
          {collection.isLoading ? ( // Check if data is loading.
            <LoadingSpinner /> // If loading, render the LoadingSpinner component.
          ) : (
            <AnimeCollection
              collectionName="Recommended for you"
              data={collection}
            />
            // If not loading, render the AnimeCollection component with the recommended anime data.
          )}
        </div>
      </motion.div>
    </>
  );
}
