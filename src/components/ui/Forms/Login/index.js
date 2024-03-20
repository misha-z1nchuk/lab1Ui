import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import './styles.less';
import Button from '../../Button';
import InputType from '../../Input/Input';

function LoginForm({ isLoading, error, onSubmit, isCodeSent }) {
    const [ data, setData ] = useState({ });

    const { t } = useTranslation();


    function handleSubmit(event) {
        event?.preventDefault?.();
        onSubmit(data);
    }

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name] : name === 'phone_number' ? value.replace(/\D/g, '') : value
        }));
    }

    function getErrorMessage(id) {
        const message = getFieldError(id)?.message;

        return message;
    }


    function getFieldError(id) {
        return error?.errors?.find(item => item.uri === `#/${id}`);
    }


    return (
        <div className='LoginForm'>
            <Form autoComplete='off' onFinish={handleSubmit}>
                <InputType
                    label={t('auth.label.email')}
                    name='email'
                    error={getErrorMessage('email')}
                    rules={[ { required: true, message: t('error.required') } ]}
                    value={data.email}
                    onChange={handleChange}
                    placeholder={t('auth.placeholder.email')}
                />
                <InputType
                    label={t('auth.label.password')}
                    name='password'
                    error={getErrorMessage('email')}
                    rules={[ { required: true, message: t('error.required') } ]}
                    type = 'password'
                    value={data.password}
                    onChange={handleChange}
                    placeholder={t('auth.placeholder.password')}
                />
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                    className='submit-button'
                >
                    {isCodeSent ? t('auth.button.login') : t('auth.button.next')}
                </Button>
            </Form>
        </div>
    );
}

LoginForm.propTypes = {
    isLoading  : PropTypes.bool,
    error      : PropTypes.object,
    onSubmit   : PropTypes.func,
    isCodeSent : PropTypes.bool
};

export default LoginForm;
