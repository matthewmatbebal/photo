import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(
    function initUseIsMobile() {
      const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
      const handle = () => setIsMobile(mql.matches);
      handle();
      mql.addEventListener?.("change", handle);
      return () => mql.removeEventListener?.("change", handle);
    },
    [breakpoint],
  );

  return isMobile;
}
