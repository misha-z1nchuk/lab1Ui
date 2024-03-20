import { SET_LANGUAGE } from '../types';

export function setLanguage(language) {
    return dispatch => {
        dispatch({ type: SET_LANGUAGE, payload: language });
    };
}
