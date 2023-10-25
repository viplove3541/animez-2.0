// Import the "p-queue" library for managing asynchronous tasks and the "axios" library for making HTTP requests.
import PQueue from "p-queue";
import axios from "axios";

// Create a new instance of the PQueue class with specific settings.
const jikanQueue = new PQueue({
  concurrency: 1, // Concurrency is set to 1, which means only one request will be processed at a time.
  intervalCap: 1, // Only 1 task is processed in each interval.
  interval: 810, // An interval of 810 milliseconds between task executions.
});

// Define the base URL for the Jikan API.
const baseURL = "https://api.jikan.moe/v4/";

// Create an asynchronous function "queueRequest" that takes an "endpoint" as a parameter.
export async function queueRequest(endpoint) {
  return jikanQueue.add(async () => {
    try {
      // Inside the PQueue, send an HTTP GET request to the Jikan API by combining the base URL and the provided endpoint.
      const response = await axios.get(`${baseURL + endpoint}`);

      // Return the HTTP response.
      return response;
    } catch (error) {
      // If there's an error during the HTTP request, log the error to the console.
      console.error(error);
    }
  });
}
