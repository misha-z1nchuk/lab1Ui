import moment from 'moment';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from '../config';
import { store } from '../main';
import locales from '../../locales';
import { setLanguage } from '../store/actions/Language';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

const resources = {
    EN : { translation: locales.en },
    UA : { translation: locales.ua },
    RU : { translation: locales.ru }
};

export default class Localization {
    static init() {
        const lng = getLocalStorage('language') || config.language;

        return i18n.use(initReactI18next).init({
            lng,
            resources,
            fallbackLng   : config.language,
            interpolation : {
                escapeValue : false
            }
        });
    }

    static async changeLanguage(lng) {
        await i18n.changeLanguage(lng);
        setLocalStorage('language', lng);

        moment.locale(lng.toLowerCase());
        store.dispatch(setLanguage(lng));
    }
}
