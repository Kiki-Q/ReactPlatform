import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import resources from './locales/resources';

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      fallbackLng: ['enUS', 'zhCN'],
      lng: 'enUS',
      debug: process.env.NODE_ENV === 'development',
      resources,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      detection: {
        caches: ['localStorage', 'sessionStorage', 'cookie'],
      },
    },
    (err: Error) => {
      if (err) return console.log('something went wrong loading', err);
      return null;
    }
  );

export default i18n;