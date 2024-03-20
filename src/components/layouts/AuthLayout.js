import React     from 'react';
import PropTypes                from 'prop-types';
import classnames               from 'classnames';
import {
    useLocation
} from 'react-router-dom';
import { getSearchParams }      from '../../utils/helpers';
import { useRedirect } from '../../hooks';
import {
    DEFAULT_ROUTES_DATA
} from '../../constants';
import { AuthMenu }  from '../ui/Menu';

import './AuthLayout.less';

function AuthLayout({ children }) {
    const location = useLocation();
    const currentPath = DEFAULT_ROUTES_DATA[location.pathname];

    useRedirect(
        currentPath?.query && !location.search,
        { search: getSearchParams(currentPath?.query) }
    );

    return (
        <div className='AuthLayout'>
            <div className='Content'>
                <div className='Header'>
                    <div className='Profile'>
                        <span>Contact book</span>
                        <div className='menu-wrapper'>

                            <AuthMenu
                                dropdown
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={classnames({
                        'Children'          : true,
                        'menu-notcollapsed' : true
                    })}
                >
                    {children}
                </div>
            </div>

        </div>
    );
}

AuthLayout.propTypes = {
    children : PropTypes.element
};

export default AuthLayout;
