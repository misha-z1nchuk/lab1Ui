import {
    useState,
    useEffect,
    useCallback
}                       from 'react';
import { notification } from 'antd';
import api              from '../apiSingleton';
import { getProperty }  from '../utils/helpers';

function useApi(keys, context) {
    const [ data, setData ]           = useState(null);
    const [ error, setError ]         = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (context?.initFetch) call();
    }, []);

    const call = useCallback(async (...args) => {
        try {
            setIsLoading(true);

            const func     = getProperty(api, keys);
            const response = await func(...args);

            setData(response);

            return response;
        } catch (err) {
            if (context?.labels?.errorMessage) {
                return notification.error({ message: context.labels.errorMessage });
            }

            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [ keys, context ]);

    function clean() {
        setError(null);
        setIsLoading(false);
    }

    return {
        call,
        data,
        error,
        clean,
        isLoading
    };
}

export default useApi;
