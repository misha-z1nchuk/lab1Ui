import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation }  from 'react-i18next';
import { Form, Modal } from 'antd';
import './ShareContactModal.less';
import Select from '../../Select/index';
import api from '../../../../apiSingleton';

function ShareModal({ isOpen, onOk, onClose }) {
    const { t } = useTranslation();
    const [ userId, setUserId ] = useState(null);

    function handleChange(name, value) {
        setUserId(value);
    }

    async function fetchUsers() {
        const contactsData = await api.profile.listUsers();

        return contactsData.map(c => ({ label: c.email, option: c.id }));
    }

    return (
        <Modal
            centered
            destroyOnClose
            onCancel={onClose}
            onOk={() => onOk(userId)}
            width        = {480}
            open         = {isOpen}
            closable = {false}
            maskClosable={false}
            okText={'Share'}
            cancelText={'Cancel'}
            className='ProductModal'
        >
            <div className='LoginForm'>
                <Form autoComplete='off' onFinish={() => {}}>
                    <Select
                        label={'User'}
                        name='userId'
                        rules={[ { required: true, message: t('error.required') } ]}
                        onChange={handleChange}
                        placeholder={'Enter email'}
                        fetcher={fetchUsers}
                    />
                </Form>
            </div>

        </Modal>
    );
}

ShareModal.propTypes = {
    isOpen  : PropTypes.bool,
    onOk    : PropTypes.func,
    onClose : PropTypes.func
};

export default ShareModal;
