import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useQuery, useActions, useRedirect } from '../../../hooks';
import { LoginForm } from '../../ui/Forms';
import { ROUTES } from '../../../constants';
import { getSearchParams } from '../../../utils/helpers';
import { login } from '../../../store/actions/Sessions';
import { getSessionStorage } from '../../../utils/storage';

import './styles.less';
import './LoginPage.less';


function LoginPage() {
    const [ query ]   = useQuery();
    const navigate    = useNavigate();
    const { t }       = useTranslation();
    const loginAction = useActions(login);
    const jwt = getSessionStorage('token');
    const { error, isError, isLoading, isCodeSent } = useSelector((state) => state.sessions);

    useRedirect(!!jwt, {
        pathname : ROUTES.AUTH,
        search   : getSearchParams({ pathname: query.pathname, search: query.search })
    });

    function handleLogin(data) {
        loginAction(data, navigate);
    }


    return (
        <div className='Login-Page Login'>
            <div className='login-paper'>
                <h2 className='login-title'>{t('auth.title.login')}</h2>
                <LoginForm
                    error={error}
                    isError={isError}
                    isLoading={isLoading}
                    onSubmit={handleLogin}
                    isCodeSent={isCodeSent}
                />
            </div>
        </div>
    );
}

export default LoginPage;
