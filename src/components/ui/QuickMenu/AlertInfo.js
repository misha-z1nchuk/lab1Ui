import React, { useMemo }   from 'react';
import { useTranslation }   from 'react-i18next';
import { Link }             from 'react-router-dom';

import { ROUTES }           from '../../../constants';
import { getAlertMessage }  from '../TariffItem/helpers';
import AlertImg             from '../../../assets/images/alert.png';
import { useCurrentTariff } from '../../../hooks';

import './AlertInfo.less';

function AlertInfo() {
    const { t, i18n } = useTranslation();
    const tariff      = useCurrentTariff();

    const message = useMemo(() => getAlertMessage(tariff), [ tariff, i18n.language ]);

    return message && (
        <div className='AlertInfoMenu'>
            <div className='CustomAlert'>
                <img src={AlertImg} alt='alert' className='img' />
                <div className='message'>
                    {t('message.warning.attention')}
                </div>
                <div className='description'>
                    {message}
                </div>
                <Link to={ROUTES.TARIFFS} className='link'>
                    {t('dashboard.tariffs')}
                </Link>
            </div>
            <div className='CustomAlert-collapsed'>
                <img src={AlertImg} alt='alert' className='img' />
            </div>
        </div>
    );
}

export default AlertInfo;
