import React                              from 'react';
import PropTypes                          from 'prop-types';
import { Helmet }                         from 'react-helmet';
import { useLocation }                    from 'react-router-dom';
import { useDispatch }        from 'react-redux';
import { useTheme, useRedirect, useUser } from '../../hooks';
import { THEMES, ROUTES }  from '../../constants';
import { getSearchParams }                from '../../utils/helpers';


import './MainLayout.less';
import './GlobalStyles.less';
import api from '../../apiSingleton';
import { SET_USER_DATA } from '../../store/types';


function MainLayout({ children }) {
    const user                 = useUser();
    const { pathname, search } = useLocation();
    const dispatch = useDispatch();

    // function getUser() {
    //     try {
    //         api.profile.show();

    //         dispatch({ type: SET_USER_DATA, payload: { user: { name: 'Test' } } });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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
