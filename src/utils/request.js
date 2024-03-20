import { notification }         from 'antd';
import i18n                     from 'i18next';
import { ERROR_TYPES, ROUTES }  from '../constants';
import { removeSessionStorage } from './storage';
import ErrorService from './errors';
import { history }              from './history';

export async function handleRequest(promise) {
    try {
        const data = await promise;

        return data;
    } catch (err) {
        const { code, errors } = err || {};


        if (code === ERROR_TYPES.UNAUTHORIZED
            && errors.length === 0
            && history.location.pathname !== ROUTES.PUBLIC_APPLICATION) {
            notification.error({
                key     : ERROR_TYPES.UNAUTHORIZED,
                message : i18n.t('error.authenticationFailed')
            });

            removeSessionStorage('token');

            return history.replace(ROUTES.LOGIN);
        }


        if (errors?.length > 0) {
            const error = {
                ...ErrorService.getCorrectErrorWithFields(errors),
                error_message : err.error_message,
                errors
            };

            throw error;
        }

        throw err;
    }
}
