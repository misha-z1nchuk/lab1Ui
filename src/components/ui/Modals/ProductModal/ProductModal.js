import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation }  from 'react-i18next';
import { Form, Modal } from 'antd';
import './ProductModal.less';
import InputType from '../../Input/Input';


function ProductModal({ isOpen, onOk, onClose, contactData }) {
    const { t } = useTranslation();
    const [ data, setData ] = useState(contactData || {});

    useEffect(() => {
        setData(contactData);
    }, [ contactData ]);

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name] : name === 'phone_number' ? value.replace(/\D/g, '') : value
        }));
    }

    return (
        <Modal
            title={'Edit contact'}
            centered
            destroyOnClose
            onCancel={onClose}
            onOk={() => onOk(data)}
            width        = {480}
            open         = {isOpen}
            closable = {false}
            maskClosable={false}
            okText={'Update'}
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

ProductModal.propTypes = {
    isOpen      : PropTypes.bool,
    onOk        : PropTypes.func,
    onClose     : PropTypes.func,
    contactData : PropTypes.object
};

export default ProductModal;
