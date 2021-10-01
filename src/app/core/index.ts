import { LanguageService } from './service/language.service';
import { TranslationLanguageModel } from './model/translation-language.model';

const providers: any[] = [
  LanguageService,
];

export {
  providers,
  LanguageService,
  TranslationLanguageModel,
};