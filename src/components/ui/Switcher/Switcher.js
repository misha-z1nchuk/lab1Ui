import React from 'react';
import PropTypes from 'prop-types';

import './Switcher.less';
import { Form, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import ItemLabel from '../ItemLabel';

function InputType({
    label,
    name,
    error,
    asterisk,
    required,
    rules = [],
    onChange,
    onBlur,
    labelSuffix,
    loading,
    disabled,
    ...rest
}) {
    const { t } = useTranslation();

    function handleChange(e) {
        if (onChange) onChange(name, e.target.value);
    }

    function handleBlur(e) {
        if (onBlur) onBlur(name, e.target.value === 'true');
    }

    return (
        <ItemLabel label={label} required={asterisk}>
            {labelSuffix}
            <Form.Item
                validateStatus={error ? 'error' : undefined}
                help={error}
                rules={[ ...required ? [ { required: true, message: t('error.required') } ] : [], ...rules ]}
            >
                <div className='switcherWrapper'>
                    <Radio.Group
                        {...rest}
                        buttonStyle='solid' onChange={handleChange} onBlur={handleBlur}
                        name={name} disabled={disabled || loading}>
                        <Radio.Button value>Yes</Radio.Button>
                        <Radio.Button value={false}>No</Radio.Button>
                    </Radio.Group>
                    {loading && <div className='switcherLoader'><LoadingOutlined /></div>}
                </div>
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
    loading     : PropTypes.bool,
    disabled    : PropTypes.bool
};

export default InputType;
