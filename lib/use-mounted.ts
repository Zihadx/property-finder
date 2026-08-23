import * as React from "react";

const subscribe = () => () => {};

/**
 * SSR-safe "has this component mounted on the client" check, used before
 * createPortal calls. Uses useSyncExternalStore instead of a useEffect +
 * setState pair so it doesn't trigger a cascading-render lint warning.
 */
export function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
