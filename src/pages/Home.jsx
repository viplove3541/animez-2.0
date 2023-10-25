import Hero from "../components/Hero/Hero"; // Import the Hero component for the hero section.

import Trending from "../components/Trending/Trending"; // Import the Trending component for displaying trending content.

import ReviewSection from "../components/ReviewSection/ReviewSection"; // Import the ReviewSection component for user reviews.

import Share from "../components/Share/Share"; // Import the Share component for sharing options.

import Featured from "../components/Featured/Featured"; // Import the Featured component for showcasing featured content.

import MainContainer from "../components/MainContainer/MainContainer"; // Import the MainContainer component for the main content area.

import { motion } from "framer-motion"; // Import the motion component from 'framer-motion' for animations.

import useAnimationOnce from "../hooks/useAnimationOnce"; // Import a custom hook for triggering animations once.

import { useRef } from "react"; // Import the useRef hook for accessing a DOM element.

export default function Home() {
  // Create a ref to access the DOM element.
  const ref = useRef(null);

  // Use the custom hook to trigger animations once when the component is in view.
  const isInView = useAnimationOnce(ref);

  return (
    <motion.div
      ref={ref} // Attach the ref to the motion component.
      initial={{ opacity: 0 }} // Set the initial animation state with opacity 0.
      animate={{ x: [-window.innerWidth / 2, 0], opacity: 1 }} // Animate the component's entrance with translation and opacity changes.
      transition={{ duration: 0.5, ease: "easeOut" }} // Define animation properties, including duration and easing.
    >
      <Hero /> {/* Render the Hero component for the hero section. */}
      <Trending /> {/* Render the Trending component for displaying trending content. */}
      <Share /> {/* Render the Share component for sharing options. */}
      <ReviewSection /> {/* Render the ReviewSection component for user reviews. */}
      <Featured /> {/* Render the Featured component for showcasing featured content. */}
      <MainContainer /> {/* Render the MainContainer component for the main content area. */}
    </motion.div>
  );
}
