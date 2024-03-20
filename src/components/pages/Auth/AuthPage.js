import React, { useEffect }     from 'react';
import { useSelector }          from 'react-redux';
import classnames               from 'classnames';
import { useTranslation }       from 'react-i18next';
import {  useNavigate }         from 'react-router-dom';

import { PuffLoader } from 'react-spinners';
import { useQuery, useActions } from '../../../hooks';
import { authentication }       from '../../../store/actions/Sessions';

import './styles.less';
import './AuthPage.less';
import { sleep } from '../../../utils/helpers';
import { ROUTES } from '../../../constants';

const DELAY = 5000;

function AuthPage() {
    const [ query ]  = useQuery();
    const navigate   = useNavigate();
    const { t }      = useTranslation();
    const authAction = useActions(authentication);
    const loginError = useSelector(state => state.sessions.isError);

    useEffect(() => {
        const { search, pathname } = query;

        authAction({ navigate, pathname, search });
    }, []);

    useEffect(async () => {
        if (loginError) {
            await sleep(DELAY);
            navigate(ROUTES.LOGIN);
        }
    }, [ loginError ]);

    return (
        <div className='Login-Page AuthPage'>
            <div className='container'>
                <div
                    className={classnames({
                        'Login-text'       : true,
                        'Login-text-error' : loginError
                    })}
                >
                    {loginError ? t('auth.title.authError') : t('auth.title.authLoading')}
                </div>
                <div className='Login-loader'>
                    <PuffLoader color='#fff' />
                </div>

            </div>
        </div>
    );
}

export default AuthPage;
