import React           from 'react';
import PropTypes       from 'prop-types';
import { Button }      from 'antd';
import classnames      from 'classnames';

import './Button.less';

function ButtonType({
    type,
    icon,
    loading,
    onClick,
    disabled,
    htmlType,
    children,
    className,
    additionalClass
}) {
    return (
        <Button
            icon      = {icon}
            type      = {type}
            loading   = {loading}
            onClick   = {onClick}
            htmlType  = {htmlType}
            disabled  = {disabled}
            className = {classnames('BASE_Button', {
                BASE_Primary_button   : type === 'primary',
                BASE_Secondary_button : type === 'secondary',
                BASE_Danger_button    : type === 'danger',
                disabled,
                [className]           : className,
                [additionalClass]     : additionalClass
            })}
        >
            {children}
        </Button>
    );
}

ButtonType.propTypes = {
    type            : PropTypes.string,
    htmlType        : PropTypes.string,
    className       : PropTypes.string,
    additionalClass : PropTypes.string,
    loading         : PropTypes.bool,
    disabled        : PropTypes.bool,
    icon            : PropTypes.node,
    children        : PropTypes.node,
    onClick         : PropTypes.func
};

ButtonType.defaultProps = {
    type     : 'default',
    loading  : false,
    disabled : false,
    htmlType : 'button',
    onClick  : () => {}
};

export default ButtonType;
