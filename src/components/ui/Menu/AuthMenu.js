import React, { useState }          from 'react';
import PropTypes                    from 'prop-types';
import { Menu, Dropdown }           from 'antd';
import { useTranslation }           from 'react-i18next';
import classnames                   from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES }                   from '../../../constants';
import { removeSessionStorage }     from '../../../utils/storage';

import Profile                      from './Profile';

const rootSubmenuKeys = [ 'SUBMENU_LOYALTIES', 'SUBMENU_PRODUCTS', 'SUBMENU_CUSTOMERS', 'SUBMENU_SETTINGS', 'SUBMENU_ANALYTICS' ];

// eslint-disable-next-line max-lines-per-function
function AuthMenu({ dropdown, mode, collapsed }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { t }    = useTranslation();
    const [ openKeys, setOpenKeys ] = useState([]);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    function onOpenChange(keys) {
        const latestOpenKey = keys.find((key) => !openKeys.includes(key));

        if (!rootSubmenuKeys.includes(latestOpenKey)) {
            return setOpenKeys(keys);
        }

        setOpenKeys(latestOpenKey ? [ latestOpenKey ] : []);
    }

    function handleClick({ key }) {
        if ([ 'profile-logout', 'profile', 'contacts', 'about' ].includes(key)) return;

        navigate({
            pathname : key
        });
    }

    function logOut() {
        removeSessionStorage('token');
        navigate(ROUTES.LOGIN);
    }

    const menu = (
        <Menu
            onClick      = {handleClick}
            mode         = {collapsed ? undefined : mode}
            selectedKeys = {[ location.pathname ]}
            openKeys     = {openKeys}
            onOpenChange = {onOpenChange}
            className    = {classnames({ 'menu-collapsed': collapsed })}
        >
            <Menu.Item key='profile-logout' onClick={logOut} className='profile-link'>
                <span>{t('auth.button.logout')}</span>
            </Menu.Item>
            <Menu.Item key='profile' onClick={() => navigate(ROUTES.PROFILE)} className='profile-link'>
                <span>{'Profile'}</span>
            </Menu.Item>
            <Menu.Item key='contacts' onClick={() => navigate(ROUTES.HOME)} className='profile-link'>
                <span>{'Contacts'}</span>
            </Menu.Item>
            <Menu.Item key='about' onClick={() => navigate(ROUTES.ABOUT)} className='profile-link'>
                <span>{'About'}</span>
            </Menu.Item>
            <Menu.Item key='jobs' onClick={() => navigate(ROUTES.JOBS)} className='profile-link'>
                <span>{'Jobs'}</span>
            </Menu.Item>
        </Menu>
    );

    if (dropdown) {
        return (
            <Dropdown overlay={menu} trigger={[ 'click' ]} onOpenChange={setIsMenuOpen}>
                <div className='profileIcon'>
                    <Profile isOpen={isMenuOpen} />
                </div>
            </Dropdown>
        );
    }

    return menu;
}

AuthMenu.propTypes = {
    dropdown  : PropTypes.bool,
    collapsed : PropTypes.bool,
    mode      : PropTypes.string
};

export default AuthMenu;
