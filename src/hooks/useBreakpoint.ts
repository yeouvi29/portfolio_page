import { useEffect, useState } from "react";
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1248,
  "2xl": 1920,
};

const breakpointKeys = Object.keys(BREAKPOINTS);
export type BreakpointKeyType = keyof typeof BREAKPOINTS;
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>("");

  const isEqual = (bp: BreakpointKeyType) => {
    return breakpoint === bp;
  };
  const isUpOrEqual = (bp: BreakpointKeyType) => {
    return breakpointKeys.indexOf(breakpoint) >= breakpointKeys.indexOf(bp);
  };
  const isDown = (bp: BreakpointKeyType) => {
    return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(bp);
  };

  useEffect(() => {
    const handleResize = () => {
      for (const [key, value] of Object.entries(BREAKPOINTS)) {
        if (window?.innerWidth < value) {
          setBreakpoint(key);
          break;
        }
      }
    };

    handleResize();
    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return { breakpoint, isUpOrEqual, isDown, isEqual };
};
