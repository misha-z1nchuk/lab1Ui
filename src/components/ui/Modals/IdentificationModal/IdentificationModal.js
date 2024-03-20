import { Modal } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';
import identificationImg from '../../../../assets/images/identificationSuccess.png';

import './IdentificationModal.less';

function IdentificationModal({ isOpen, onClose, isDraft }) {
    const { t } = useTranslation();

    function renderFooter() {
        return (
            <Button
                key='submit'
                onClick={onClose}
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
            open = {isOpen}
            closable = {false}
            maskClosable={false}
            className='IdentificationModal'
            footer       = {renderFooter()}
        >
            <div className='wrapper'>
                <img src={identificationImg} />
                <div className='title'>
                    {t('message.success.identification')}
                </div>
                {isDraft && <div className='text'>Please complete the form with additional information</div>}
            </div>
        </Modal>
    );
}

IdentificationModal.propTypes = {
    isOpen  : PropTypes.bool,
    onClose : PropTypes.func,
    isDraft : PropTypes.bool
};

export default IdentificationModal;
