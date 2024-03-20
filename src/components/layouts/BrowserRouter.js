import React      from 'react';
import PropTypes  from 'prop-types';
import { Router } from 'react-router-dom';

const BrowserRouter = React.memo(({ history, ...props }) => {
    const [ state, setState ] = React.useState({
        action   : history.action,
        location : history.location
    });

    React.useLayoutEffect(() => history.listen(setState), [ history ]);

    return (
        <Router
            {...props}
            location       = {state.location}
            navigationType = {state.action}
            navigator      = {history}
        />
    );
});

BrowserRouter.propTypes = {
    history : PropTypes.object
};

export default BrowserRouter;
