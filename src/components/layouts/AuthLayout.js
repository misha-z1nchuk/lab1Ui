import React, { useEffect, useState }     from 'react';
import PropTypes                from 'prop-types';
import 'react-notifications/lib/notifications.css';
import classnames               from 'classnames';
import {
    useLocation
} from 'react-router-dom';
import { NotificationContainer, NotificationManager, Notifications } from 'react-notifications';
import { getSearchParams }      from '../../utils/helpers';
import { useRedirect, useUser } from '../../hooks';
import {
    DEFAULT_ROUTES_DATA
} from '../../constants';
import { AuthMenu }  from '../ui/Menu';

import './AuthLayout.less';
import { WebSocketProvider } from '../../hooks/useWs';

// export const ws = new WebSocket('ws://localhost:8082');

function AuthLayout({ children }) {
    const location = useLocation();
    const currentPath = DEFAULT_ROUTES_DATA[location.pathname];
    const [ ws, setWs ] = useState(new WebSocket('ws://localhost:8082'));
    const user = useUser() || {};
    const [ lastMessage, setLastMessage ] = useState(null);

    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);

        setLastMessage(data);
        if (data.type === 'new_job') {
            NotificationManager.info('New job added');
        }
    };

    useEffect(() => {
        ws.onopen = (e) => {
            ws.send(JSON.stringify({ type: 'save-connection', userId: user.id }));
        };
    }, [ ]);


    useRedirect(
        currentPath?.query && !location.search,
        { search: getSearchParams(currentPath?.query) }
    );

    return (
        <WebSocketProvider ws={ws} lastMessage={lastMessage} >
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
                <NotificationContainer />
            </div>
        </WebSocketProvider>
    );
}

AuthLayout.propTypes = {
    children : PropTypes.element
};

export default AuthLayout;
