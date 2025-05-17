// src/i18n/useTranslation.ts
import en from './locales/en.json';
import ko from './locales/ko.json';
import { useLanguage } from './LanguageContext';

const dict = { en, ko };

export function useTranslation() {
    const { lang } = useLanguage();
    return {
        t: (section: string, key: string) => (dict[lang][section] as any)[key] ?? key
    };
}