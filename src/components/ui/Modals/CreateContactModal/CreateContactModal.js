import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation }  from 'react-i18next';
import { Form, Modal } from 'antd';
import './CreateContactModal.less';
import InputType from '../../Input/Input';


function CreateContactModal({ isOpen, onOk, onClose }) {
    const { t } = useTranslation();
    const [ data, setData ] = useState({});

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name] : name === 'phone_number' ? value.replace(/\D/g, '') : value
        }));
    }

    return (
        <Modal
            title={'Create Contact'}
            centered
            destroyOnClose
            onCancel={onClose}
            onOk={() => onOk(data)}
            width        = {480}
            open         = {isOpen}
            closable = {false}
            maskClosable={false}
            okText={'Create'}
            className='ProductModal'
        >
            <div className='LoginForm'>
                <Form autoComplete='off' onFinish={() => {}}>
                    <InputType
                        label={'First name'}
                        name='firstName'
                        rules={[ { required: true, message: t('error.required') } ]}
                        value={data.firstName}
                        onChange={handleChange}
                        placeholder={'Enter First name'}
                    />
                    <InputType
                        label={'Last name'}
                        name='lastName'
                        rules={[ { required: true, message: t('error.required') } ]}
                        value={data.lastName}
                        onChange={handleChange}
                        placeholder={'Enter Last name'}
                    />
                    <InputType
                        label={'Phone number'}
                        name='phone'
                        rules={[ { required: true, message: t('error.required') } ]}
                        value={data.phone}
                        onChange={handleChange}
                        placeholder={'Enter Phone number'}
                    />
                </Form>
            </div>

        </Modal>
    );
}

CreateContactModal.propTypes = {
    isOpen  : PropTypes.bool,
    onOk    : PropTypes.func,
    onClose : PropTypes.func
};

export default CreateContactModal;
