import React          from 'react';
import PropTypes      from 'prop-types';
import { DatePicker, Form } from 'antd';
import classnames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { momentDate, momentUTCDate } from '../../../utils/date';

import './DateInput.less';
import ItemLabel from '../ItemLabel';
import { Icons } from '../../../constants';

function DateInput({
    name,
    onChange,
    error,
    onBlur,
    format,
    showTime,
    loading,
    value,
    label,
    asterisk,
    required,
    labelSuffix,
    rules = [],
    defaultPickerValue,
    placeholder,
    inputReadOnly,
    ...rest
}) {
    const { t } = useTranslation();

    function handleChange(_, dateString) {
        const val = dateString ? momentUTCDate(dateString).format() : '';

        if (onChange) onChange(name, val);
    }

    function handleBlur(a) {
        if (!onBlur) return;

        const date = a.target.value ? momentUTCDate(a.target.value) : '';

        onBlur(name, date);
    }

    function renderDatePicker() {
        const suffixIcon = loading ? <LoadingOutlined /> : <span className='anticon-calendar'><Icons.CalendarIcon /></span>;
        const startPickerValue = typeof defaultPickerValue === 'function' ? defaultPickerValue() : defaultPickerValue;

        return (
            <div
                className={classnames({ 'DateInput' : true,
                    error })
                }>
                <DatePicker
                    {...rest}
                    defaultPickerValue = {startPickerValue || momentDate().startOf('day')}
                    format             = {format || 'DD.MM.YYYY'}
                    {...value ? { value: momentDate(value) } : {}}
                    onSelect           = {handleChange}
                    onChange={handleChange}
                    showTime           = {showTime ? {
                        format       : 'HH:mm:ss',
                        defaultValue : momentDate('00:00:00', 'HH:mm:ss')
                    } : null}
                    onBlur={handleBlur}
                    suffixIcon={suffixIcon}
                    getPopupContainer={node => node.parentNode}
                    placeholder={placeholder || ''}
                    inputReadOnly={inputReadOnly ?? true}
                />
            </div>
        );
    }

    return <ItemLabel label={label} required={asterisk}>
        {labelSuffix}
        <Form.Item
            name={name}
            className      = 'CRUDER_FormInput'
            validateStatus = {error ? 'error' : undefined}
            help           = {error}
            rules={[ ...required ? [ { required: true, message: t('error.required') } ] : [], ...rules ]}
        >
            {renderDatePicker()}
        </Form.Item>
    </ItemLabel>;
}

DateInput.propTypes = {
    name               : PropTypes.string,
    onChange           : PropTypes.func,
    error              : PropTypes.string,
    onBlur             : PropTypes.func,
    format             : PropTypes.string,
    showTime           : PropTypes.bool,
    loading            : PropTypes.bool,
    value              : PropTypes.string,
    label              : PropTypes.string,
    asterisk           : PropTypes.bool,
    required           : PropTypes.bool,
    labelSuffix        : PropTypes.node,
    rules              : PropTypes.array,
    defaultPickerValue : PropTypes.any,
    placeholder        : PropTypes.string,
    inputReadOnly      : PropTypes.bool
};

export default DateInput;
