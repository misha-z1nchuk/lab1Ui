import { notification } from 'antd';
import api          from '../../apiSingleton';
import {
    ERROR_TYPES,
    ROUTES
} from '../../constants';
import {
    getSessionStorage,
    setSessionStorage,
    removeSessionStorage
} from '../../utils/storage';
import {
    LOGIN_ERROR,
    CLEAN_ERRORS,
    SET_USER_DATA,
    LOGIN_REQUEST,
    SET_IS_CODE_SENT,
    SET_IS_LOADING
} from '../types';


export function authentication(router) {
    return async (dispatch, getState) => {
        const state = getState();
        const jwt   = getSessionStorage('token');

        if (jwt && state.sessions.userData) {
            router.navigate({
                pathname : router.pathname || ROUTES.HOME,
                search   : router.pathname ? router.search : ''
            }, { replace: true });

            return;
        }

        const request = Promise.resolve({ jwt });

        if (!jwt) return dispatch({ type: LOGIN_ERROR });

        try {
            const response = await request;

            setSessionStorage('token', response.jwt);

            const user = await api.profile.show();

            dispatch({ type: SET_USER_DATA, payload: { user } });

            const pathname = router.pathname || ROUTES.HOME;

            router.navigate({
                pathname,
                search : router.search ? router.search : ''
            }, { replace: true });
        } catch {
            removeSessionStorage('token');
            dispatch({ type: LOGIN_ERROR });
        }
    };
}

export function sendPhone(data) {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUEST });

        try {
            await api.session.sendPhone(data);
            dispatch({ type: SET_IS_CODE_SENT, payload: true });
        } catch (err) {
            removeSessionStorage('token');
            dispatch({ type: SET_IS_CODE_SENT, payload: false });
            dispatch({ type: LOGIN_ERROR, payload: err });
            console.log(err);
            if (err.error_type !== ERROR_TYPES.VALIDATION_TYPE) notification.error({ message: err?.error_message });
        } finally {
            dispatch({ type: SET_IS_LOADING, payload: false });
        }
    };
}

export function sendCode(data, navigate) {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUEST });

        try {
            if (!data.otp) {
                // eslint-disable-next-line
                throw {
                    code          : 'FORMAT_ERROR',
                    error_message : 'Validation error',
                    error_type    : 'validation',
                    errors        : [ { message: 'Required field', uri: '#/otp', code: 'REQUIRED' } ]
                };
            }

            const response = await api.session.sendCode(data);

            setSessionStorage('token', response.jwt);

            const user = await api.profile.show();

            dispatch({ type: SET_USER_DATA, payload: { user } });
            dispatch({ type: SET_IS_CODE_SENT, payload: false });
            navigate({
                pathname : ROUTES.APPLICATION,
                search   : ''
            }, { replace: true });
        } catch (err) {
            removeSessionStorage('token');
            dispatch({ type    : LOGIN_ERROR,
                payload : err.code === 'BAD_OTP' ? {
                    ...err,
                    errors : [ { message: 'Wrong or expired security code', uri: '#/otp', code: 'REQUIRED' } ]
                } : err });

            if (err.error_type !== ERROR_TYPES.VALIDATION_TYPE) notification.error({ message: err?.error_message });
        }
    };
}

export function login(data, navigate) {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUEST });

        try {
            await api.session.create(data);

            setSessionStorage('token', 'true');

            dispatch({ type: SET_USER_DATA, payload: { user: { name: 'Test' } } });

            navigate({
                pathname : ROUTES.HOME,
                search   : ''
            }, { replace: true });
        } catch (err) {
            dispatch({ type: LOGIN_ERROR, payload: err });
            throw err;
        }
    };
}

export function registration(data, navigate) {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUEST });

        try {
            await api.session.registration(data);

            setSessionStorage('token', 'true');

            dispatch({ type: SET_USER_DATA, payload: { user: { name: 'Test' } } });

            navigate({
                pathname : ROUTES.HOME,
                search   : ''
            }, { replace: true });
        } catch (err) {
            dispatch({ type: LOGIN_ERROR, payload: err });
            throw err;
        }
    };
}

export function updateProfile(data) {
    return async dispatch => {
        const user = await api.profile.update(data);

        dispatch({ type: SET_USER_DATA, payload: { user } });
    };
}


export function cleanErrors() {
    return async dispatch => {
        dispatch({ type: CLEAN_ERRORS });
    };
}
