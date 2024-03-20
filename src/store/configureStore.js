import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware                           from 'redux-thunk';
import rootReducer                               from './reducers';

export default function configureStore() {
    const composeEnhancers = process.env.NODE_ENV !== 'production'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose /* eslint-disable-line */
        : compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );

    return store;
}
