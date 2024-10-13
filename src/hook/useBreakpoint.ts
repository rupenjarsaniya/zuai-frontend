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
    const [breakpoint, setBreakpoint] = useState(() => getCurrentBreakpoint(1024)); // Default to 'lg'
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const updateBreakpoints = () => setBreakpoint(getCurrentBreakpoint(window.innerWidth));
        updateBreakpoints();

        window.addEventListener("resize", updateBreakpoints);
        return () => window.removeEventListener("resize", updateBreakpoints);
    }, [isClient]);

    return breakpoint;
};

export default useBreakpoints;
