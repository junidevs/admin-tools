
import Polyglot from 'node-polyglot';

export interface TestI18nData {
    locale: string;
    langNames: string[];
    phrases: { [key: string]: string | { [key: string]: string } };
}
export class I18n {
    loaded: boolean;

    langNames: string[];

    currentLang: string | null;

    polyglot?: Polyglot;

    constructor() {
        this.loaded = false;
        this.langNames = [];
        this.currentLang = null;
    }

    private _isLoaded(emitWarn = true) {
        if (!this.loaded && emitWarn) {
            // console.warn('i18n not loaded!');
        }
        return this.loaded;
    }

    async load(lang: string, clb?: () => void, dataForTesting?: TestI18nData): Promise<void> {
        if (dataForTesting) {
            this.polyglot = new Polyglot({
                phrases: dataForTesting.phrases,
                locale: dataForTesting.locale,
                // onMissingKey:
                //   window.DEBUG_SHOW_MISSING_TRANSLATIONS === true ? undefined : () => {}
            });
            const htmlElement = document.querySelector('html') as HTMLElement;
            htmlElement.lang = dataForTesting.locale;

            this.currentLang = dataForTesting.locale;
            this.langNames = dataForTesting.langNames;
            this.loaded = true;
        } else {
            const response = await fetch(`/assets/i18n/${lang}.json`, { cache: 'no-cache' });
            const i18nInfoData = await response.json();

            /* Pobranie listy języków,
            ale to równie dobrze może być na FE albo najlepiej jako statyczny JSON */
            this.polyglot = new Polyglot({
                phrases: i18nInfoData.phrases,
                locale: i18nInfoData.locale,
                // onMissingKey:
                //   window.DEBUG_SHOW_MISSING_TRANSLATIONS === true ? undefined : () => {}
            });
            // Tu warto wybrać język również do biblioteki czasu np. date-fns
            const htmlElement = document.querySelector('html') as HTMLElement;
            htmlElement.lang = i18nInfoData.locale;

            this.currentLang = i18nInfoData.locale;
            this.langNames = i18nInfoData.langNames;
            this.loaded = true;
        }

        if (typeof clb === 'function') {
            clb();
        }
    }

    __(key: string, options?: Polyglot.InterpolationOptions | number): string {
        if (!this._isLoaded()) return '';
        return this.polyglot ? this.polyglot.t(key, options) : '';
    }
}
const CONFIG  = {
    LANGUAGES: ['pl','en'],
    DEFAULT_LANG: 'pl',
};
export const getClientLanguage = (): string => {
    const language = window.navigator.language.slice(0, 2).toLowerCase();
    if (CONFIG.LANGUAGES.find((lang: string) => lang === language)) return language;
    return CONFIG.DEFAULT_LANG;
};

export const i18n = new I18n();
export const __ = (text: string, args?: Polyglot.InterpolationOptions | number): string =>
    i18n.__(text, args);

// Użycie gdziekolwiek:
// __("Hi, my friend"); // 'Cześć, mój przyjacielu'
// __("Hi, ${name}!", { name: "Test" }); // 'Cześć, Test!'
// Więcej info: https://airbnb.io/polyglot.js/
