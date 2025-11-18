import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: 'en' | 'fr') => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language;

  return {
    t,
    changeLanguage,
    currentLanguage,
  };
};
