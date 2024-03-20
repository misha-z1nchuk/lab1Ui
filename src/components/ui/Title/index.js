import React                  from 'react';
import PropTypes              from 'prop-types';

import './styles.less';

function Title({ title }) {
    return (
        <h1 className='Title'>{title}</h1>
    );
}

Title.propTypes = {
    title : PropTypes.string.isRequired
};

export default Title;
