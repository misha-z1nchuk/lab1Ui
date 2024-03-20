import React, { useMemo } from 'react';
import PropTypes          from 'prop-types';
import { useSelector }    from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU               from 'antd/lib/locale/ru_RU';
import enUs               from 'antd/lib/locale/en_US';
import ukUA               from 'antd/lib/locale/uk_UA';

import config             from '../../config';

const LOCALES = {
    EN : enUs,
    UA : ukUA,
    RU : ruRU
};

function ConfigProviderLayout({ children }) {
    const language = useSelector(state => state.language.language);

    const locale = useMemo(() => {
        return LOCALES[language] || LOCALES[config.language];
    }, [ language ]);

    return (
        <ConfigProvider locale={locale}>
            {children}
        </ConfigProvider>
    );
}

ConfigProviderLayout.propTypes = {
    children : PropTypes.node
};

export default ConfigProviderLayout;
