/* eslint-disable complexity */

import React, { useState }          from 'react';
import PropTypes                    from 'prop-types';
import { Menu, Dropdown }           from 'antd';
import { useTranslation }           from 'react-i18next';
import classnames                   from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Icons,
    ROUTES,
    PERMISSIONS,
    DEFAULT_ROUTES_DATA
}                                   from '../../../constants';
import { removeSessionStorage }     from '../../../utils/storage';
import { getSearchParams }          from '../../../utils/helpers';
import {
    checkPermission,
    checkPermissionByArray,
    getCurrentTariff
}                                   from '../../../utils/permissions';
import config from '../../../config';
import Profile                      from './Profile';

const rootSubmenuKeys = [ 'SUBMENU_LOYALTIES', 'SUBMENU_TRIGGERS', 'SUBMENU_PRODUCTS', 'SUBMENU_CUSTOMERS', 'SUBMENU_SETTINGS', 'SUBMENU_ANALYTICS' ];

// eslint-disable-next-line max-lines-per-function
function AuthMenu({ dropdown, mode, openModal, collapsed }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { t }    = useTranslation();
    const [ openKeys, setOpenKeys ] = useState([]);

    const tariff = getCurrentTariff();

    function onOpenChange(keys) {
        const latestOpenKey = keys.find((key) => !openKeys.includes(key));

        if (!rootSubmenuKeys.includes(latestOpenKey)) {
            return setOpenKeys(keys);
        }

        setOpenKeys(latestOpenKey ? [ latestOpenKey ] : []);
    }

    function handleClick({ key }) {
        if ([ 'profile-logout', 'profile-modal' ].includes(key)) return;

        const newPath     = DEFAULT_ROUTES_DATA[key];
        const isAnalytics = location.pathname.includes('/analytics') && key.includes('/analytics');

        navigate({
            pathname : key,
            search   : isAnalytics ? location.search : getSearchParams(newPath?.query)
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
            <Menu.Item key='profile-modal' onClick={openModal} className='profile-link'>
                {t('auth.button.changePassword')}
            </Menu.Item>
            <Menu.Item key={ROUTES.DASHBOARD} className='menu-dropdown'>
                <Icons.Dashboard className='Icon' />
                {t('auth.button.dashboard')}
            </Menu.Item>
            {(checkPermissionByArray([
                PERMISSIONS.LOYALTIES_READ,
                PERMISSIONS.COALITION_READ,
                PERMISSIONS.DISTRIBUTIONS_READ
            ])) && (
                <Menu.SubMenu
                    key       = 'SUBMENU_LOYALTIES'
                    className = 'analytic-submenu menu-dropdown'
                    title     = {<><Icons.Megaphone className='Icon' />{t('auth.button.loyalties')}</>}
                >
                    {checkPermission(PERMISSIONS.LOYALTIES_READ) && (
                        <>
                            <Menu.Item key={ROUTES.LOYALTIES}>
                                {t('auth.button.campaigns')}
                            </Menu.Item>
                            <Menu.Item key={ROUTES.REFERRAL_PROGRAM}>
                                {t('auth.button.referralProgram')}
                            </Menu.Item>
                        </>
                    )}
                    {checkPermission(PERMISSIONS.COALITION_READ) && (
                        <Menu.Item key={ROUTES.COALITIONS}>
                            {t('auth.button.coalition')}
                        </Menu.Item>
                    )}
                    {checkPermission(PERMISSIONS.DISTRIBUTIONS_READ) && (
                        <Menu.Item key={ROUTES.MAILINGS}>
                            {t('auth.button.mailings')}
                        </Menu.Item>
                    )}
                </Menu.SubMenu>
            )}
            {!config.disableFeatureTriggers && checkPermissionByArray([
                PERMISSIONS.TRIGGERS_READ,
                PERMISSIONS.TRIGGER_EVENTS_READ,
                PERMISSIONS.TRIGGER_BALANCES_READ,
                PERMISSIONS.TRIGGER_JOBS_READ
            ]) && (
                <Menu.SubMenu
                    key       = 'SUBMENU_TRIGGERS'
                    className = 'analytic-submenu menu-dropdown'
                    title     = {<><Icons.Trigger className='Icon' />{t('auth.button.triggers')}</>}
                >
                    {checkPermission(PERMISSIONS.TRIGGERS_READ) && (
                        <>
                            <Menu.Item key={ROUTES.TRIGGERS}>{t('auth.button.triggersList')}</Menu.Item>
                            <Menu.Item key={ROUTES.TRIGGERS_HISTORY}>{t('auth.button.triggersHistory')}</Menu.Item>
                        </>
                    )}
                    {checkPermission(PERMISSIONS.TRIGGER_EVENTS_READ) &&
                        <Menu.Item key={ROUTES.EXTERNAL_EVENTS}>{t('auth.button.externalEvents')}</Menu.Item>
                    }
                    {checkPermission(PERMISSIONS.TRIGGER_BALANCES_READ) &&
                        <Menu.Item key={ROUTES.TRIGGERS_BALANCES}>{t('auth.button.triggersBalances')}</Menu.Item>
                    }
                    {checkPermission(PERMISSIONS.TRIGGER_JOBS_READ) &&
                        <Menu.Item key={ROUTES.TRIGGERS_JOBS}>{t('auth.button.triggersJobs')}</Menu.Item>
                    }
                </Menu.SubMenu>
            )}
            {(checkPermissionByArray([
                PERMISSIONS.PRODUCTS_READ,
                PERMISSIONS.CATEGORIES_READ,
                PERMISSIONS.PRODUCT_GROUP_READ
            ])) && (
                <Menu.SubMenu
                    key       = 'SUBMENU_PRODUCTS'
                    className = 'analytic-submenu menu-dropdown'
                    title     = {<><Icons.Product className='Icon' />{t('auth.button.products')}</>}
                >
                    {checkPermission(PERMISSIONS.PRODUCTS_READ) && (
                        <Menu.Item key={ROUTES.PRODUCTS}>
                            {t('auth.button.productsList')}
                        </Menu.Item>
                    )}
                    {checkPermission(PERMISSIONS.CATEGORIES_READ) && (
                        <Menu.Item key={ROUTES.CATEGORIES}>
                            {t('auth.button.categories')}
                        </Menu.Item>
                    )}
                    {checkPermission(PERMISSIONS.PRODUCT_GROUP_READ) && (
                        <Menu.Item key={ROUTES.PRODUCT_GROUPS}>
                            {t('auth.button.productGroups')}
                        </Menu.Item>
                    )}
                </Menu.SubMenu>
            )}
            {(checkPermissionByArray([
                PERMISSIONS.CUSTOMER_READ,
                PERMISSIONS.TARGET_GROUP_READ
            ])) && (
                <Menu.SubMenu
                    key       = 'SUBMENU_CUSTOMERS'
                    className = 'analytic-submenu menu-dropdown'
                    title     = {<><Icons.Customer className='Icon' />{t('auth.button.customers')}</>}
                >
                    {checkPermission(PERMISSIONS.CUSTOMER_READ) && (
                        <Menu.Item key={ROUTES.CUSTOMERS}>
                            {t('auth.button.customersList')}
                        </Menu.Item>
                    )}
                    {checkPermission(PERMISSIONS.TARGET_GROUP_READ) && (
                        <Menu.Item key={ROUTES.TARGET_GROUPS}>
                            {t('auth.button.targetGroups')}
                        </Menu.Item>
                    )}
                </Menu.SubMenu>
            )}
            {checkPermission(PERMISSIONS.ORDERS_READ) && (
                <Menu.Item key={ROUTES.ORDERS} className='menu-dropdown'>
                    <Icons.History className='Icon' />
                    {t('auth.button.transactions')}
                </Menu.Item>
            )}
            {checkPermission(PERMISSIONS.ANALYTICS_READ) && (
                <Menu.SubMenu
                    key       = 'SUBMENU_ANALYTICS'
                    className = 'analytic-submenu menu-dropdown'
                    title     = {<><Icons.Analytics className='Icon' />{t('auth.button.analytics')}</>}
                >
                    <Menu.Item key={ROUTES.ANALYTICS_COMMON}>{t('auth.button.analyticsCommon')}</Menu.Item>
                    <Menu.Item key={ROUTES.ANALYTICS_SUM}>{t('auth.button.analyticSum')}</Menu.Item>
                    <Menu.Item key={ROUTES.ANALYTICS_COUNT}>{t('auth.button.analyticsCount')}</Menu.Item>
                    <Menu.Item key={ROUTES.ANALYTICS_AVERAGE}>{t('auth.button.analyticsAverage')}</Menu.Item>
                </Menu.SubMenu>
            )}
            <Menu.SubMenu
                key       = 'SUBMENU_SETTINGS'
                className = 'analytic-submenu menu-dropdown'
                title     = {<><Icons.Setting className='Icon' />{t('auth.button.system')}</>}
            >
                <Menu.Item key={ROUTES.SETTINGS}>{t('auth.button.settings')}</Menu.Item>
                {tariff?.isPublic && (
                    <Menu.Item key={ROUTES.TARIFFS}>{t('auth.button.plans')}</Menu.Item>
                )}
                {tariff?.isPublic && checkPermission(PERMISSIONS.DISTRIBUTION_TARIFF_READ) && (
                    <Menu.Item key={ROUTES.DISTRIBUTION_TARIFFS}>{t('auth.button.distributionTariffs')}</Menu.Item>
                )}
                {checkPermission(PERMISSIONS.BILLING_HISTORY_READ) && (
                    <Menu.Item key={ROUTES.BILLING}>{t('auth.button.billing')}</Menu.Item>
                )}
                {checkPermission(PERMISSIONS.BRANCHES_READ) && (
                    <Menu.Item key={ROUTES.BRANCHES}>{t('auth.button.branches')}</Menu.Item>
                )}
                {checkPermission(PERMISSIONS.USERS_READ) && (
                    <Menu.Item key={ROUTES.USERS}>{t('auth.button.users')}</Menu.Item>
                )}
                {checkPermission(PERMISSIONS.ROLES_READ) && (
                    <Menu.Item key={ROUTES.ROLES}>{t('auth.button.roles')}</Menu.Item>
                )}
                {checkPermission(PERMISSIONS.ACCESS_TOKEN_READ) && (
                    <Menu.Item key={ROUTES.TOKENS}>{t('auth.button.tokens')}</Menu.Item>
                )}
                {checkPermission(PERMISSIONS.LOGS_READ) && (
                    <Menu.Item key={ROUTES.LOGS}>{t('auth.button.logs')}</Menu.Item>
                )}
            </Menu.SubMenu>
            <Menu.Item key='profile-logout' onClick={logOut} className='profile-link'>
                {t('auth.button.logout')}
            </Menu.Item>
        </Menu>
    );

    if (dropdown) {
        return (
            <Dropdown overlay={menu} trigger={[ 'click' ]}>
                <div>
                    <Profile />
                </div>
            </Dropdown>
        );
    }

    return menu;
}

AuthMenu.propTypes = {
    dropdown  : PropTypes.bool,
    collapsed : PropTypes.bool,
    mode      : PropTypes.string,
    openModal : PropTypes.func
};

export default AuthMenu;
