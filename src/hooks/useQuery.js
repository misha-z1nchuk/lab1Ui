import { useMemo, useCallback }     from 'react';
import queryString                  from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery(replace = true) {
    const navigate = useNavigate();
    const location = useLocation();

    const query = useMemo(() => {
        return queryString.parse(location.search);
    }, [ location ]);

    const setQuery = useCallback(newQuery => {
        const params = {
            ...query,
            ...newQuery
        };

        navigate(
            {
                pathname : location.pathname,
                search   : `?${queryString.stringify(params)}`
            },
            { replace }
        );
    }, [ query, location ]);

    return [ query, setQuery ];
}

export default useQuery;
