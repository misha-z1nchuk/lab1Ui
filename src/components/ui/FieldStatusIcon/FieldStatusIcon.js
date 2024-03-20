import { Tooltip } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { Icons } from '../../../constants';
import { STATUSES } from '../../../constants/statuses';
import './FieldStatusIcon.less';

function FieldStatusIcon({ status, comment }) {
    switch (status) {
        case STATUSES.ACCEPTED:
        case STATUSES.IDENTIFIED:
            return <span className='applicationFieldStatusIcon'><Icons.SuccessField /></span>;
        case STATUSES.REJECTED:
            return comment ?
                <Tooltip
                    title={comment} color={'white'}
                    key={'red'} overlayStyle={{ color: 'black' }}>
                    <span className='applicationFieldStatusIcon commented'>
                        <Icons.RejectField />
                    </span>
                </Tooltip>
                :
                <span className='applicationFieldStatusIcon'>
                    <Icons.RejectField />
                </span>;
        default:
            return null;
    }
}

FieldStatusIcon.propTypes = {
    status  : PropTypes.string,
    comment : PropTypes.string
};

export default FieldStatusIcon;
