import React from "react"; // Importing the React library for building components.
import Genre from "../components/Genre/Genre"; // Importing the Genre component from a specified location.
import TopTenAnime from "../components/TopTen/TopTenAnime"; // Importing the TopTenAnime component from a specified location.
import Share from "../components/Share/Share"; // Importing the Share component from a specified location.
import { Outlet } from "react-router-dom"; // Importing the Outlet component from the 'react-router-dom' library for routing purposes.


/**
 * Sidebar component that displays genre, top ten anime, and a share section.
 */
export default function GenreSidebar() {
  return (
    <>
      {/* Share component */}
      <Share
        style={{
          paddingTop: 40,
          paddingBottom: 0,
          paddingInline: 20,
          marginTop: 80 + "px",
          marginBottom: 0,
        }}
      />
      <div
        className="main-container d-flex"
        style={
          // Conditionally change the layout based on the window width
          window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
        }
      >
        <div className="sidebar-wrapper d-flex-fd-column">
          {/* Display the Genre component */}
          <Genre />

          {/* Display the TopTenAnime component */}
          <TopTenAnime />
        </div>

        {/* Display the child routes */}
        <Outlet />
      </div>
    </>
  );
}
