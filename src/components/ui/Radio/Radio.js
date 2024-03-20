import React from 'react';
import { useTranslation } from 'react-i18next';
import { Radio as AntRadio, Form } from 'antd';
import PropTypes from 'prop-types';

import ItemLabel from '../ItemLabel';

function Radio({ label, name, values, value, error, asteriks, required, onChange, onBlur }) {
    const { t } = useTranslation();

    function handleChange(event) {
        if (onChange) onChange(name, event.target.value);
    }

    function handleBlur(event) {
        if (onBlur) onBlur(name, event.target.value);
    }

    return (
        <ItemLabel label={label} asteriks={asteriks}>
            <Form.Item
                {...!onChange ? { name } : {}}
                validateStatus={error ? 'error' : undefined}
                help={error}
                rules={[ ...required ? [ { required: true, message: t('error.required') } ] : [] ]}
            >
                <AntRadio.Group
                    id={name}
                    value={value}
                    options={values}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
        </ItemLabel>
    );
}

Radio.propTypes = {
    label    : PropTypes.string,
    name     : PropTypes.string,
    error    : PropTypes.string,
    value    : PropTypes.string,
    values   : PropTypes.array,
    asteriks : PropTypes.bool,
    required : PropTypes.bool,
    onChange : PropTypes.func,
    onBlur   : PropTypes.func
};

export default Radio;
