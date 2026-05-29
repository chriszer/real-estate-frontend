import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Helper to create the media query string
const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export function useIsMobile() {
  // 1. Define the subscription mechanism for the external browser state
  const subscribe = React.useCallback((callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }, []);

  // 2. Define how to read the snapshot value on the client
  const getSnapshot = React.useCallback(() => {
    return window.matchMedia(query).matches;
  }, []);

  // 3. Define a fallback snapshot value for Server-Side Rendering (SSR / Next.js)
  const getServerSnapshot = React.useCallback(() => {
    return false; // Default assumption on the server (adjust if needed)
  }, []);

  // 4. Let React manage the state synchronization efficiently without cascading effects
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
