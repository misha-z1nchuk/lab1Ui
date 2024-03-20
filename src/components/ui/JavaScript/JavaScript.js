import { useEffect } from 'react';
import PropTypes from 'prop-types';

function JavaScript({ function: func, name }) {
    useEffect(() => {
        const parent_id = name.split('/')?.[1];
        if (func) Function('params', func)({ parent_id });        // eslint-disable-line
    }, []);

    return null;
}

JavaScript.propTypes = {
    function : PropTypes.string,
    name: PropTypes.string,
};

export default JavaScript;
