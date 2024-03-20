import { useLayoutEffect } from 'react';

function useTheme(theme) {
    useLayoutEffect(() => {
        Object.keys(theme).forEach(key => {
            document.documentElement.style.setProperty(`--${key}`, theme[key]);
        });
    }, []);
}

export default useTheme;
