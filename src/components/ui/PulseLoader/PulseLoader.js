import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

function CustomPulseLoader({ additionalDots, speedMultiplier, ...props }) {
    const wrapper = useRef();

    useEffect(() => {
        // eslint-disable-next-line
        for (let i = 3; i < 3 + additionalDots; i++) {
            const lastSpan = wrapper.current.querySelector('span span:last-child');
            const newSpan = lastSpan.cloneNode();

            // eslint-disable-next-line
            newSpan.style.animationDelay = `${0.12 / speedMultiplier * (i + 1)}s`;

            lastSpan.after(newSpan);
        }
    }, []);

    return (
        <div className='PulseLoader' ref={wrapper}>
            <PulseLoader speedMultiplier={speedMultiplier} {...props} />
        </div>
    );
}

CustomPulseLoader.propTypes = {
    additionalDots  : PropTypes.number,
    speedMultiplier : PropTypes.number
};

export default CustomPulseLoader;
