import { useEffect }   from 'react';
import { useNavigate } from 'react-router-dom';

function useRedirect(trigger, path, options = { replace: true }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (trigger) {
            const params = typeof path === 'function' ? path() : path;

            navigate(params, options);
        }
    }, [ trigger ]);
}

export default useRedirect;
