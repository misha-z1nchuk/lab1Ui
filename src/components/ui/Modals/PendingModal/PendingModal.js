/* eslint-disable more/no-window */
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';
import reviewImg from '../../../../assets/images/applicationReview.png';

import './PendingModal.less';

function PendingModal({ isOpen }) {
    const { t } = useTranslation();
    const [ open, setOpen ] = useState(isOpen);

    useEffect(() => {
        if (isOpen) setOpen(true);
    }, [ isOpen ]);

    function handleClick() {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'APPLICATION_CLOSE' }));
        } else {
            setOpen(false);
        }
    }

    function renderFooter() {
        return (
            <Button
                key='cancel'
                onClick={handleClick}
                className={'submit-btn'}
                type='primary'
            >
                {t('cruder.button.ok')}
            </Button>
        );
    }

    return (
        <Modal
            centered
            destroyOnClose
            width        = {380}
            open = {open}
            closable = {false}
            maskClosable={false}
            className='PendingModal'
            footer       = {renderFooter()}
        >
            <div className='wrapper'>
                <img src={reviewImg} />
                <div className='title'>
                    Your application is set for review
                </div>
                <p>Our administrators will process it in the nearest future</p>
            </div>
        </Modal>
    );
}

PendingModal.propTypes = {
    isOpen : PropTypes.bool
};

export default PendingModal;
