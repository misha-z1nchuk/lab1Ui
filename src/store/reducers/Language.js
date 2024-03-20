/* eslint-disable default-param-last */
import { SET_LANGUAGE }    from '../types';
import { getLocalStorage } from '../../utils/storage';

const initialState = {
    language : getLocalStorage('language')
};

export default function language(state = initialState, { type, payload }) {
    switch (type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language : payload
            };

        default:
            return state;
    }
}
