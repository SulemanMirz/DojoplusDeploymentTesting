type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  i18n: any;
  language?: string;
};

export const changeLanguage = ({ i18n, language }: Props): void => {
  window.localStorage.setItem('MY_LANGUAGE', language);
  i18n.changeLanguage(language);
};

export const initLanguage = ({ i18n, language }: Props): void => {
  const lang = window.localStorage.getItem('MY_LANGUAGE');
  if (!lang) {
    window.localStorage.setItem('MY_LANGUAGE', language);
    i18n.changeLanguage(language);
  } else {
    i18n.changeLanguage(lang);
  }
};

export const languages = [
  { code: 'en', translateKey: 'english' },
  { code: 'pt', translateKey: 'portuguese' },
  { code: 'es', translateKey: 'spanish' },
];
