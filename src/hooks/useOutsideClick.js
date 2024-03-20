import { useEffect } from 'react';

function useOutsideClick(ref, callback) {
    function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            // eslint-disable-next-line callback-return
            callback();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
}

export default useOutsideClick;
