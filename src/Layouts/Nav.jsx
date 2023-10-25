import React, { useState, useEffect } from "react"; // Import React and necessary hooks for component logic.
import { Outlet } from "react-router-dom"; // Import the Outlet component from 'react-router-dom' for routing.
import Navbar from "../components/Navbar/Navbar"; // Import the Navbar component from the specified location.
import NavSidebar from "../components/NavigationSidebar/NavSidebar"; // Import the NavSidebar component from the specified location.
import Footer from "../components/Footer/Footer"; // Import the Footer component from the specified location.
import { easeOut, motion } from "framer-motion"; // Import motion components from 'framer-motion' for animations.


export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false); // Define a state variable to track scrolling.
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false); // Define a state variable to manage sidebar visibility.


 // Use an effect to handle changes in scrolling.
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;// Get the current scroll position.
        // Update 'isScrolled' state based on scroll position.
      if (scrollPosition > 0 && isScrolled === false) {
        setIsScrolled(true);
      } else if (scrollPosition === 0) {
        setIsScrolled(false);
      }
    };

    // Add a scroll event listener and return a cleanup function.
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);// Listen for changes in 'isScrolled' state.


  return (
    <motion.div
    className="app-container f-poppins"
    animate={{ y: [-window.innerHeight / 4, 10, 0] }} // Apply animation to the component.
    transition={{ duration: 0.3, ease: easeOut }} // Define animation properties.
  >
      <Navbar // Render the Navbar component and pass props.
        isScrolled={isScrolled}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <NavSidebar // Render the NavSidebar component and pass props.
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <Outlet />
      <Footer />
    </motion.div>
  );
}