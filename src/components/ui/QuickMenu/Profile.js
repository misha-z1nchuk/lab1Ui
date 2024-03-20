/* eslint-disable react/no-danger */
import React            from 'react';
import { DownOutlined } from '@ant-design/icons';
import { createAvatar } from '@dicebear/avatars';
import * as style       from '@dicebear/avatars-jdenticon-sprites';

import { useUser }      from '../../../hooks';

import './Profile.less';

function Profile() {
    const user = useUser();

    function getAvatar() {
        const merchant = user?.merchant;

        if (merchant?.logo) {
            return `<img src='${merchant.logo}' alt='Avatar' class='user-logo-img'/>`;
        }

        return createAvatar(style, {
            seed   : merchant?.name,
            size   : 33,
            radius : 50
        });
    }

    return (
        <div className='profile-block'>
            <div className='user-logo' dangerouslySetInnerHTML={{ __html: getAvatar() }} />
            <div className='profile-menu'>
                <div className='user-name'>
                    <h2>{`${user?.firstName || ''} ${user?.lastName || ''}`}</h2>
                    <h3>{user?.merchant?.name}</h3>
                </div>
                <DownOutlined />
            </div>
        </div>
    );
}

export default Profile;
