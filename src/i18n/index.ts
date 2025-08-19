import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Importar traducciones
import en from './locales/en.json'
import es from './locales/es.json'
import it from './locales/it.json'

const resources = {
	en: {
		translation: en
	},
	es: {
		translation: es
	},
	it: {
		translation: it
	}
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'es',
		debug: false,
		interpolation: {
			escapeValue: false
		}
	})

export default i18n
