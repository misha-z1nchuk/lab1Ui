import { Button, Form, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CountrySelector, usePhoneInput } from 'react-international-phone';
import { regionist } from 'regionist';
// eslint-disable-next-line import/no-unresolved
import 'react-international-phone/style.css';
import './PhoneInput.less';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ItemLabel from '../ItemLabel';
import { Icons } from '../../../constants';

function AntPhoneInput({ value, onChange, label, error, asterisk, required, disabled, name, onBlur, className, labelSuffix }) {
    const { t } = useTranslation();
    const [ isFocused, setIsFocused ] = useState(false);
    const regionRes = regionist.guess();
    const phoneInput = usePhoneInput({
        initialCountry  : regionRes.country.toLowerCase() || 'us',
        value           : value || '',
        onCountryChange : onChange
    });

    const inputRef = useRef(null);
    const wrapperRef = useRef();

    useEffect(() => {
        if (phoneInput.inputRef && inputRef.current?.input) {
            phoneInput.inputRef.current = inputRef.current.input;
        }
    }, [ inputRef, phoneInput.inputRef ]);

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur(e) {
        setIsFocused(false);

        if (onBlur) {
            const phone = e.target.value?.replace(/\D/g, '');

            onBlur(name, phone);
        }
    }

    return (
        <ItemLabel label={label} required={asterisk}>
            {labelSuffix}
            <div ref={wrapperRef}>
                <Form.Item
                    className={classNames('phoneInput', className, { isFocused, disabled })}
                    validateStatus={error ? 'error' : undefined}
                    help={error}
                    rules={[ ...required ? [ { required: true, message: t('error.required') } ] : [] ]}
                >
                    <CountrySelector
                        selectedCountry={phoneInput.country}
                        onSelect={(country) => phoneInput.setCountry(country.iso2)}
                        renderButtonWrapper={({ children, rootProps }) => (
                            <Button
                                {...rootProps}
                                className='countrySelector'
                                disabled={disabled}
                            >
                                {children}
                                <Icons.ArrowDown />
                            </Button>
                        )}
                        dropdownStyleProps={{
                            style : {
                                top          : '100%',
                                width        : wrapperRef.current?.offsetWidth,
                                borderRadius : '10px',
                                padding      : 5,
                                boxShadow    : '1px 5px 25px rgba(53, 58, 76, 0.15)'
                            }
                        }}
                    />
                    <Input
                        value={phoneInput.phone}
                        onChange={(e) => {
                            const res = phoneInput.handlePhoneValueChange(e);

                            if (onChange) onChange(name, res);
                        }}
                        ref={inputRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                    />
                </Form.Item>
            </div>
        </ItemLabel>
    );
}

AntPhoneInput.propTypes = {
    value       : PropTypes.string,
    onChange    : PropTypes.func,
    label       : PropTypes.string,
    error       : PropTypes.string,
    asterisk    : PropTypes.bool,
    required    : PropTypes.bool,
    disabled    : PropTypes.bool,
    name        : PropTypes.string,
    onBlur      : PropTypes.func,
    className   : PropTypes.string,
    labelSuffix : PropTypes.node
};

export default AntPhoneInput;
