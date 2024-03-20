import React                              from 'react';
import PropTypes                          from 'prop-types';
import { Helmet }                         from 'react-helmet';
import { useLocation }                    from 'react-router-dom';
import { useTheme, useRedirect, useUser } from '../../hooks';
import { THEMES, PROJECT_ICONS, ROUTES }  from '../../constants';
import { getSearchParams }                from '../../utils/helpers';


import './MainLayout.less';
import './GlobalStyles.less';

function MainLayout({ children }) {
    const user                 = useUser();
    const { pathname, search } = useLocation();

    useTheme(THEMES.BOARDING);
    useRedirect(!user
        && ![ ROUTES.AUTH, ROUTES.LOGIN, ROUTES.REGISTRATION, ROUTES.JOIN, ROUTES.IDENTIFICATION,
            ROUTES.IDENTIFICATION_PROCESS, ROUTES.PUBLIC_APPLICATION, ROUTES.PREVIEW, ROUTES.LANDING ]
            .includes(pathname), {
        pathname : ROUTES.LOGIN,
        search   : getSearchParams({ pathname, search })
    });

    return (
        <div className='MainLayout'>
            <Helmet>
                <link rel='icon' type='image/svg'  />
            </Helmet>
            {children}
        </div>
    );
}

MainLayout.propTypes = {
    children : PropTypes.element
};

export default MainLayout;
