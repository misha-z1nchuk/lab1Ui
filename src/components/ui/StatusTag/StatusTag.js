import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';
import { useTranslation } from 'react-i18next';

import { Icons, STATUSES } from '../../../constants';

import './StatusTag.less';

function StatusTag({ status, className }) {
    const { t } = useTranslation();

    function renderStatusIcon() {
        switch (status) {
            case STATUSES.ACCEPTED: return <Icons.AcceptIcon />;
            case STATUSES.PENDING: return <Icons.PendingIcon />;
            case STATUSES.REJECTED: return <Icons.RejectIcon />;
            case STATUSES.DRAFT: return <Icons.DraftIcon />;
            case STATUSES.REWORK: return <Icons.ReworkIcon />;
            default: return null;
        }
    }

    return (
        <div
            className={classNames(className, {
                'status-block' : true,
                'accepted'     : status === STATUSES.ACCEPTED,
                'pending'      : status === STATUSES.PENDING,
                'rejected'     : status === STATUSES.REJECTED,
                'draft'        : status === STATUSES.DRAFT,
                'rework'       : status === STATUSES.REWORK
            })}>
            {renderStatusIcon()} {t(`cruder.table.label.${status?.toLowerCase()}`)}
        </div>
    );
}

StatusTag.propTypes = {
    status    : PropTypes.string,
    className : PropTypes.string
};

export default StatusTag;
