/* eslint-disable more/no-window */
import { useState, useLayoutEffect } from 'react';

function useWindowSize() {
    const [ width, setWidth ] = useState();
    const [ height, setHeight ] = useState();

    useLayoutEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    return { width, height };
}

export default useWindowSize;
