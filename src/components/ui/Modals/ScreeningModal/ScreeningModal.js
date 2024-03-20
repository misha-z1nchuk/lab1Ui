import { Modal } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import screeningImg      from '../../../../assets/images/screening.png';

import './ScreeningModal.less';
import PulseLoader from '../../PulseLoader';

function ScreeningModal({ isOpen }) {
    return (
        <Modal
            centered
            destroyOnClose
            width        = {380}
            open = {isOpen}
            closable = {false}
            maskClosable={false}
            className='ScreeningModal'
            footer={null}
        >
            <div className='wrapper'>
                <img src={screeningImg} />
                <div className='title'>
                    Please wait!
                </div>
                <p className='text'>We&apos;re completing the screening process</p>
                <PulseLoader
                    additionalDots={2} color='#DDE7F9' size={20}
                    speedMultiplier={0.5} />
            </div>
        </Modal>
    );
}

ScreeningModal.propTypes = {
    isOpen : PropTypes.bool
};

export default ScreeningModal;
