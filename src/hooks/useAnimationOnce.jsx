import { useInView } from "framer-motion";

// Define a custom React hook named 'useAnimationOnce'
export default function useAnimationOnce(ref) {
  // Use the 'useInView' hook to track if the referenced element is in the viewport
  const isInView = useInView(ref, { once: true });

  // Return the result of the 'useInView' hook, which indicates if the element is in view
  return isInView;
}