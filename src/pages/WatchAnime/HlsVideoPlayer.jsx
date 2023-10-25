import React, { useEffect, useRef } from "react"; // Import React and necessary hooks from the React library.
import Hls from "hls.js"; // Import the HLS.js library for HLS video playback.

export default function HlsVideoPlayer({ url, headers }) {
  const videoRef = useRef(null); // Create a ref to hold a reference to the video element.

  useEffect(() => {
    // Check if HLS.js is supported in the current browser
    if (Hls.isSupported()) {
      const hls = new Hls(); // Create a new instance of HLS.js.

      hls.loadSource(url); // Load the video source using the provided URL.
      hls.attachMedia(videoRef.current); // Attach the video to the HLS.js player.

      // Listen for HLS events (optional)

      // Clean up when the component unmounts
      return () => {
        hls.destroy(); // Destroy the HLS.js instance when the component unmounts.
      };
    } else {
      // Neither HLS.js nor native HLS support is available
      console.error("HLS is not supported in this browser."); // Log an error message if HLS is not supported.
    }
  }, [url]);

  return (
    <div>
      <video ref={videoRef} controls /> {/* Render a video element with controls and set the ref to the videoRef. */}
    </div>
  );
}
