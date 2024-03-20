import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, notification, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import ItemLabel from '../ItemLabel';
import { Icons } from '../../../constants';

import './Select.less';

function SelectType({
    label,
    error,
    name,
    asterisk,
    labelSuffix,
    loading,
    fetcher,
    options,
    onChange,
    className,
    multiple,
    ...rest
}) {
    const [ optionsList, setOptionsList ] = useState([]);
    const [ optionsLoading, setOptionsLoading ] = useState(false);
    const [ isOpened, setIsOpened ] = useState(false);

    useEffect(() => {
        fetchOptions();
    }, []);

    async function fetchOptions() {
        if (fetcher) {
            try {
                setOptionsLoading(true);
                const newOptions = await fetcher();

                setOptionsList(newOptions);
            } catch (e) {
                notification.error({ message: e?.error_message });
            }

            setOptionsLoading(false);
        }
    }

    function handleChange(value) {
        if (onChange) onChange(name, value);
    }

    function handleVisibleChange(open) {
        setIsOpened(open);
    }

    function renderSuffixIcon() {
        if (loading || optionsLoading) return <LoadingOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />;
        if (isOpened) return <Icons.SelectArrowUp />;

        return <Icons.SelectArrowDown />;
    }

    function renderSelect() {
        const list = fetcher ? optionsList : options;

        return (
            <Select
                {...rest}
                name={name}
                loading={optionsLoading || loading}
                onChange={handleChange}
                getPopupContainer={node => node.parentNode}
                onDropdownVisibleChange={handleVisibleChange}
                suffixIcon={renderSuffixIcon()}
                filterOption={(input, option) =>  (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
                className={classNames('CustomSelect', className)}
                virtual={false}
                mode={multiple ? 'multiple' : 'default'}
            >
                {list?.map(option => (
                    <Select.Option
                        key   = {option.option}
                        value = {option.option}
                    >
                        <div className='option'>
                            {
                                option?.data?.icon
                                    ? <img src={option.data.icon} />
                                    : null
                            }
                            {option.label}
                        </div>
                    </Select.Option>
                ))}
            </Select>
        );
    }


    return (
        <ItemLabel label={label} required={asterisk}>
            {labelSuffix}
            <Form.Item
                validateStatus={error ? 'error' : undefined}
                help={error}
            >
                {renderSelect()}
            </Form.Item>
        </ItemLabel>
    );
}

SelectType.propTypes = {
    label       : PropTypes.string,
    error       : PropTypes.string,
    name        : PropTypes.string,
    asterisk    : PropTypes.bool,
    labelSuffix : PropTypes.node,
    loading     : PropTypes.bool,
    fetcher     : PropTypes.func,
    options     : PropTypes.array,
    onChange    : PropTypes.func,
    className   : PropTypes.string,
    multiple    : PropTypes.bool
};

export default SelectType;
