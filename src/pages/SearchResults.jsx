import React from "react"; // Import the React library to create components.
import { useSearchParams } from "react-router-dom"; // Import useSearchParams from react-router-dom to access search parameters in the URL.
import { getAnimeSearch } from "../api/jikan"; // Import a function to fetch anime search data from the Jikan API.
import AnimeCollection from "../components/MainContainer/AnimeCollection"; // Import the AnimeCollection component for displaying anime search results.
import Genre from "../components/Genre/Genre"; // Import the Genre component for genre filtering.
import TopTenAnime from "../components/TopTen/TopTenAnime"; // Import the TopTenAnime component for displaying top ten anime.
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component for showing loading animation.
import Error from "../components/AnimeNotFound/Error"; // Import the Error component for handling errors.
import { motion } from "framer-motion"; // Import the motion component from 'framer-motion' for animations.

export default function SearchResults() {
  // Get search parameters from the URL.
  const [searchParams] = useSearchParams();

  // Fetch anime search results based on search name and parameters.
  const animeData = getAnimeSearch(
    searchParams.get("name"),
    searchParams.get("parameter")
  );

  return (
    <motion.div
      className=" main-container d-flex  " // Apply CSS classes for styling, including responsive layout.
      style={
        window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {} // Conditionally adjust the layout based on window width.
      }
      initial={{ opacity: 0 }} // Set the initial animation state with opacity 0.
      animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }} // Animate the component's entrance with translation and opacity changes.
      transition={{ duration: 0.5, ease: "easeOut" }} // Define animation properties, including duration and easing.
    >
      <div className="sidebar-wrapper d-flex-fd-column">
        <Genre /> {/* Render the Genre component for genre filtering. */}
        <TopTenAnime /> {/* Render the TopTenAnime component for displaying top ten anime. */}
      </div>
      <div className="collections-wrapper">
        {animeData.isLoading ? ( // Check if data is still loading.
          <LoadingSpinner /> // Display a loading spinner while data is loading.
        ) : animeData.data?.data.length < 1 ? ( // Check if there are no search results.
          <Error /> // Display an error component for "Anime Not Found" if no results are found.
        ) : (
          <AnimeCollection collectionName="Search Results" data={animeData} /> // Display the AnimeCollection component with search results.
        )}
      </div>
    </motion.div>
  );
}
