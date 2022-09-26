import { useMatches } from "@remix-run/react";

export function useFindLoaderMatch(id) {
  const matches = useMatches();
  const found = matches.find((route) => route.id === id);
  return found;
}