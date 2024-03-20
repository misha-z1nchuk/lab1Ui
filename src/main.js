import React          from 'react';
import ReactDOM       from 'react-dom';
import { Provider }   from 'react-redux';

import App            from './App';
import Localization   from './i18n';
import configureStore from './store/configureStore';
import ConfigProvider from './components/layouts/ConfigProvider';

export const store = configureStore();

function render(Component) {
    Localization.init();

    ReactDOM.render(
        <Provider store={store}>
            <ConfigProvider>
                <Component />
            </ConfigProvider>
        </Provider>,
        document.getElementById('root')
    );
}

render(App);
