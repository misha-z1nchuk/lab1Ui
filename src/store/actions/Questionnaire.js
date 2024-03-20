import { sleep } from '../../utils/helpers';
import { SET_IS_MANAGE_PRODUCTS_OPEN, IS_CHAT_OPEN, SET_APPLICATION_STATUS, TRIGGER_APPLICATION_REFETCH } from '../types';

export function setShowManageProducts(isOpen) {
    return dispatch => {
        dispatch({ type: SET_IS_MANAGE_PRODUCTS_OPEN, payload: isOpen });
    };
}

export function setIsChatOpen(isOpen) {
    return async dispatch => {
        await sleep(0);
        dispatch({ type: IS_CHAT_OPEN, payload: isOpen });
    };
}

export function setApplicationStatus(status) {
    return dispatch => {
        dispatch({ type: SET_APPLICATION_STATUS, payload: status });
    };
}

export function triggerApplicationRefetch() {
    return dispatch => {
        dispatch({ type: TRIGGER_APPLICATION_REFETCH });
    };
}
