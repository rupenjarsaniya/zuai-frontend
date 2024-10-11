import { useState, useEffect } from "react";

const useBreakpoints = () => {
    const [isSm, setIsSm] = useState(false);
    const [isMd, setIsMd] = useState(false);
    const [isLg, setIsLg] = useState(false);
    const [isXl, setIsXl] = useState(false);
    const [is2xl, setIs2xl] = useState(false);

    const updateBreakpoints = () => {
        const width = window.innerWidth;
        setIsSm(width < 640);
        setIsMd(width >= 640 && width < 768);
        setIsLg(width >= 768 && width < 1024);
        setIsXl(width >= 1024 && width < 1280);
        setIs2xl(width >= 1280);
    };

    useEffect(() => {
        updateBreakpoints();
        window.addEventListener("resize", updateBreakpoints);

        return () => {
            window.removeEventListener("resize", updateBreakpoints);
        };
    }, []);

    return { isSm, isMd, isLg, isXl, is2xl };
};

export default useBreakpoints;
