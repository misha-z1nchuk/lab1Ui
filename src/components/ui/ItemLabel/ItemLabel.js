import React      from 'react';
import PropTypes  from 'prop-types';
import './ItemLabel.less';

function ItemLabel({ children, label, required = false, rtl }) {
    return (
        <div className='CRUDER_ItemLabel'>
            <div className='CRUDER_label' dir={rtl ? 'rtl' : ''}>
                {label} {required ? <span className='CRUDER_label--required'>*</span> : null}
            </div>
            {children}
        </div>
    );
}

ItemLabel.propTypes = {
    label    : PropTypes.string,
    children : PropTypes.node,
    required : PropTypes.bool,
    rtl      : PropTypes.bool
};

export default ItemLabel;
