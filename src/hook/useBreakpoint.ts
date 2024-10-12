import { useState, useEffect } from "react";

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

const getCurrentBreakpoint = (width: number) => {
    return {
        isSm: width < breakpoints.sm,
        isMd: width >= breakpoints.sm && width < breakpoints.md,
        isLg: width >= breakpoints.md && width < breakpoints.lg,
        isXl: width >= breakpoints.lg && width < breakpoints.xl,
        is2xl: width >= breakpoints.xl,
    };
};

const useBreakpoints = () => {
    const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint(window.innerWidth));

    useEffect(() => {
        const updateBreakpoints = () => setBreakpoint(getCurrentBreakpoint(window.innerWidth));
        window.addEventListener("resize", updateBreakpoints);
        return () => window.removeEventListener("resize", updateBreakpoints);
    }, []);

    return breakpoint;
};

export default useBreakpoints;
