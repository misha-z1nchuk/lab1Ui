import React from 'react';
import PropTypes from 'prop-types';

import './HTML.less';

function HTML({ body }) {
    // eslint-disable-next-line react/no-danger
    return <div className='HTML' dangerouslySetInnerHTML={{ __html: body }} />;
}

HTML.propTypes = {
    body : PropTypes.string
};

export default HTML;
