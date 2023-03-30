import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from "./translation-en.json";
import translationHi from "./translation-hi.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: translationEn, hi: translationHi },
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;