/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatLastMessageDate } from '../../../../utils/helpers';
import './MessageItem.less';

function MessageItem({ message }) {
    const { body, created_at, admin_id } = message;


    return (
        <div
            className={classnames({
                'MessageItem' : true,
                'admin'       : admin_id
            })}>
            <div className='time-wrapper'>
                <div>{admin_id ? 'Manager' : 'You' }</div>

                <div className='time'>{formatLastMessageDate(created_at)}</div></div>
            <div
                className={classnames({
                    'message-wrapper' : true,
                    'admin'           : admin_id
                })}>
                <div className='text' dangerouslySetInnerHTML={{ __html: body }} style={{ whiteSpace: 'pre-wrap' }} />

            </div>

        </div>
    );
}

MessageItem.propTypes = {
    message : PropTypes.object
};

export default MessageItem;
