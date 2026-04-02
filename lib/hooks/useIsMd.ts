import { useMediaQuery } from "react-responsive";

export function useIsMd() {
  return useMediaQuery({ query: "(max-width: 47.999rem)" });
}
