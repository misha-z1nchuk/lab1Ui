import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import ItemLabel from '../ItemLabel';

import './Input.less';

const COMPONENT = {
    default  : Input,
    password : Input.Password,
    textarea : Input.TextArea
};

function InputType({
    label,
    name,
    error,
    asterisk,
    required,
    rules = [],
    onChange,
    type = 'default',
    onBlur,
    labelSuffix,
    loading,    // eslint-disable-line
    ...rest
}) {
    const { t } = useTranslation();

    function handleChange(e) {
        if (onChange) onChange(name, e.target.value);
    }

    function handleBlur(e) {
        if (onBlur) onBlur(name, e.target.value);
    }

    const inputType = rest.textarea ? 'textarea' : type;

    const Component = COMPONENT[inputType];

    return (
        <ItemLabel label={label} required={asterisk}>
            {labelSuffix}
            <Form.Item
                {...!onChange ? { name } : {}}
                validateStatus={error ? 'error' : undefined}
                help={error}
                rules={[ ...required ? [ { required: true, message: t('error.required') } ] : [], ...rules ]}
            >
                <Component
                    {...rest}
                    autoComplete='new-password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
        </ItemLabel>
    );
}

InputType.propTypes = {
    label       : PropTypes.string,
    name        : PropTypes.string,
    error       : PropTypes.string,
    asterisk    : PropTypes.bool,
    required    : PropTypes.bool,
    rules       : PropTypes.array,
    value       : PropTypes.string,
    onChange    : PropTypes.func,
    type        : PropTypes.string,
    onBlur      : PropTypes.func,
    labelSuffix : PropTypes.node,
    loading     : PropTypes.bool
};

export default InputType;
