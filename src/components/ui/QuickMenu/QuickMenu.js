import React, {
    memo,
    useState,
    useEffect
}                                   from 'react';
import { useTranslation }           from 'react-i18next';
import { Tabs }                     from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Icons,
    ROUTES,
    DEFAULT_ROUTES_DATA
}                                   from '../../../constants';
import { getSearchParams }          from '../../../utils/helpers';

import './QuickMenu.less';

function getTabs(t) {
    return [
        {
            id       : 'DEFAULT',
            disabled : true,
            label    : t('auth.label.quickMenu')
        },
        {
            id    : ROUTES.PROFILE,
            label : 'Profile',
            icon  : Icons.Setting
        }
    ].filter(Boolean);
}

function QuickMenu() {
    const { t }    = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [ activeTab, setActiveTab ] = useState(null);

    const tabs = getTabs(t);

    useEffect(() => {
        const id = getActiveTab();

        setActiveTab(id);
    }, [ location.pathname ]);

    function handleTabChange(key) {
        const newPath = DEFAULT_ROUTES_DATA[key];

        navigate({
            pathname : key,
            search   : getSearchParams(newPath?.query)
        });
    }

    function getActiveTab() {
        const active = tabs.find(tab => location.pathname === tab.id);

        return active?.id || null;
    }

    return (
        <div className='QuickMenu'>
            <Tabs
                activeKey = {activeTab}
                onChange  = {handleTabChange}
            >
                {tabs.map(tab => (
                    <Tabs.TabPane
                        key      = {tab.id}
                        disabled = {tab.disabled}
                        tab      = {
                            <div className='customTabPane'>
                                {tab.icon && (
                                    <tab.icon className='Icon' />
                                )}
                                {tab.label}
                            </div>
                        }
                    />
                ))}
            </Tabs>
        </div>
    );
}

export default memo(QuickMenu);
