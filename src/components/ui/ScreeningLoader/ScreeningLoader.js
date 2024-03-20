/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icons, STATUSES } from '../../../constants';

import './ScreeningLoader.less';

const DIAMETER = 35;
const BASE = 16;
const COEFF = 5;

function ScreeningLoader({ stages }) {
    const [ currentStage, setCurrentStage ] = useState(0);

    useEffect(() => {
        const current = stages.findIndex(item => item === STATUSES.PENDING);

        setCurrentStage(current);
    }, [ stages ]);

    return (
        <div className='screeningLoader'>
            {stages.map((item, index) => {
                if (item === STATUSES.DONE) return <Icons.StagePassed />;
                if (item === STATUSES.FAILED) return <Icons.StageFailed />;
                if (currentStage === index) return <div className='stageLoader' key={index}>{index + 1}</div>;

                const pendingIndex = index - currentStage;
                const size = DIAMETER - COEFF * pendingIndex;
                const color = (parseInt('f8faff', BASE) - pendingIndex * parseInt('40303', BASE)).toString(BASE);

                return <div
                    key={index} className='pendingStage' style={{
                        width           : size > 0 ? size : 0,
                        height          : size > 0 ? size : 0,
                        backgroundColor : `#${color}`
                    }}
                />;
            })}
        </div>
    );
}

ScreeningLoader.propTypes = {
    stages : PropTypes.array
};

export default ScreeningLoader;
