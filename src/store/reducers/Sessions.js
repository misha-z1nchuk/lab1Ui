/* eslint-disable default-param-last */
import {
    LOGIN_ERROR,
    CLEAN_ERRORS,
    UPDATE_ERROR,
    LOGIN_REQUEST,
    SET_USER_DATA,
    SET_IS_CODE_SENT,
    SET_IS_LOADING
} from '../types';

const initialState = {
    isError    : false,
    isLoading  : false,
    error      : null,
    userData   : null,
    isCodeSent : false
};

export default function sessions(state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isError   : false,
                isLoading : true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                isError   : true,
                userData  : null,
                isLoading : false,
                error     : payload
            };
        case UPDATE_ERROR:
            return {
                ...state,
                isError   : true,
                isLoading : false,
                error     : payload
            };
        case CLEAN_ERRORS:
            return {
                ...state,
                isError   : false,
                isLoading : false,
                error     : null
            };
        case SET_USER_DATA:
            return {
                ...state,
                isError   : false,
                userData  : payload.user,
                isLoading : false,
                error     : null
            };
        case SET_IS_CODE_SENT:
            return {
                ...state,
                isCodeSent : payload
            };

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading : payload
            };
        default:
            return state;
    }
}
