import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox as AntCheckbox, Form } from 'antd';
import PropTypes from 'prop-types';

import ItemLabel from '../ItemLabel';

function Checkbox({ label, name, error, asterisk, required, value, onChange, onBlur }) {
    const { t } = useTranslation();

    function handleChange(event) {
        if (onChange) onChange(name, event.target.checked);
    }

    return (
        <ItemLabel required={asterisk}>
            <Form.Item
                {...!onChange ? { name } : {}}
                validateStatus={error ? 'error' : undefined}
                help={error}
                rules={[ ...required ? [ { required: true, message: t('error.required') } ] : [] ]}
            >
                <AntCheckbox onChange={handleChange} checked={value}>
                    {label}
                </AntCheckbox>
            </Form.Item>
        </ItemLabel>
    );
}

Checkbox.propTypes = {
    label    : PropTypes.string,
    name     : PropTypes.string,
    error    : PropTypes.string,
    value    : PropTypes.bool,
    asterisk : PropTypes.bool,
    required : PropTypes.bool,
    onChange : PropTypes.func,
    onBlur   : PropTypes.func
};

export default Checkbox;
