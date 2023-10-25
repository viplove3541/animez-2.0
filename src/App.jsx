// Import necessary components and styles
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import Layout from "./Layouts/Nav";
import GenreSidebar from "./Layouts/GenreSidebar";
import AnimeInfoKitsu from "./components/AnimeInfo/AnimeInfoKitsu";
import AnimeInfoJikan from "./components/AnimeInfo/AnimeInfoJikan";
import AnimeInfoRandom from "./components/AnimeInfo/AnimeInfoRandom";
import AnimeByFilter from "./pages/AnimeByFilter";
import "./main.css";
import AnimeByType from "./pages/AnimeByType";
import RecommendedTopTen from "./Layouts/RecommendedTopTen";
import WatchAnime from "./pages/WatchAnime/WatchAnime";
import SearchResults from "./pages/SearchResults";

// Define the main App component
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Define the Home page */}
          <Route index element={<Home />} />

          {/* Define details page with nested routes */}
          <Route path="details" element={<RecommendedTopTen />}>
            <Route path="kitsu/:id" element={<AnimeInfoKitsu />} />
            <Route path="jikan/:id" element={<AnimeInfoJikan />} />
            <Route path="random" element={<AnimeInfoRandom />} />
          </Route>

          {/* Define grid page with nested routes */}
          <Route path="grid" element={<GenreSidebar />}>
            <Route path="genre" element={<Genre />} />
            <Route path="filter" element={<AnimeByFilter />} />
            <Route path="type" element={<AnimeByType />} />
          </Route>

          {/* Define the search results page */}
          <Route path="search" element={<SearchResults />} />

          {/* Define the watch anime page */}
          <Route path="watch" element={<WatchAnime />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
