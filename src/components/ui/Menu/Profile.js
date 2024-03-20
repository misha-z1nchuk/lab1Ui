/* eslint-disable react/no-danger */
import React     from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icons } from '../../../constants';
import './Profile.less';

function Profile({ isOpen }) {
    return (
        <div className='profile-block'>
            <div className='profile-menu'>
                <div className={classNames('user-name', { opened: isOpen })}>
                    <Icons.UserIcon />
                </div>
            </div>
            {/* <div className='user-logo'>
                {`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`}
            </div> */}
            <div className={classNames('profileArrow', { opened: isOpen })}><Icons.ArrowDown /></div>
        </div>
    );
}

Profile.propTypes = {
    isOpen : PropTypes.bool
};

export default Profile;

