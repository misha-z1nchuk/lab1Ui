import React from 'react';
import PropTypes from 'prop-types';
import { FileOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { formatLastMessageDate } from '../../../../utils/helpers';
import './MessageItem.less';

function FileItem({ message, additionalData }) {
    const { links, created_at, admin_id } = message;

    const fileData = additionalData.files?.find(file => file.id === links.file?.id) || {};

    return (
        <div
            className={classNames({
                'MessageItem' : true,
                'admin'       : admin_id
            })}>
            <div className='time-wrapper'>
                <div>{admin_id ? 'Manager' : 'You' }</div>

                <div className='time'>{formatLastMessageDate(created_at)}</div></div>
            <div
                className={classNames({
                    'message-wrapper' : true,
                    'admin'           : admin_id
                })}
            >
                <FileOutlined /> {fileData.file_name || 'Deleted file'}
            </div>

        </div>
    );
}

FileItem.propTypes = {
    message        : PropTypes.object,
    additionalData : PropTypes.object
};

export default FileItem;
