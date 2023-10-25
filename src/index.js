// Import required libraries and components
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClientProvider, QueryClient } from "react-query";

// Create a new instance of QueryClient for React Query
const queryClient = new QueryClient();

// Use ReactDOM.createRoot to render the main App component
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap the entire app with QueryClientProvider to provide query functionality
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
