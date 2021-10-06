import { Injectable } from '@angular/core';
import { TranslationLanguageModel } from '@bbd/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private languages: TranslationLanguageModel[];
  private langKey = 'bbd-def-lang';

  constructor(
    private tranService: TranslateService,
  ) {
    this.languages = [
      { internalName: 'en', displayName: 'English', isActive: true },
      { internalName: 'de', displayName: 'Deutsch', isActive: false },
    ];

    // Register known languages
    tranService.addLangs(this.languages.map(it => it.internalName));
    this.decideInitialLang();
  }

  decideInitialLang() {
    const chosenLang = localStorage.getItem(this.langKey);
    if (chosenLang) {
      this.chooseLanguage(chosenLang);
      return;
    }

    // Use browser language if known, else fall back to default language
    // Don't save this "implicit" choice, to allow for future auto-detect
    const browserLang = this.tranService.getBrowserLang();
    if (this.languages.some(it => it.internalName === browserLang))
      this.chooseLanguage(browserLang, false);
    else
      this.chooseLanguage(this.tranService.defaultLang, false);
  }

  chooseLanguage(internalName: string, saveLocal: boolean = true) {
    const target = this.languages.find(it => it.internalName === internalName);

    // Language unknown
    if (!target) return;
    this.tranService.use(internalName);
    this.languages.forEach(it => it.isActive = false);
    target.isActive = true;

    // Save to local storage
    if (saveLocal)
      localStorage.setItem(this.langKey, internalName);
  }

  listLanguages(): TranslationLanguageModel[] {
    return this.languages.slice();
  }

  selectedLanguage(): TranslationLanguageModel {
    return this.languages.find(it => it.isActive)!;
  }
}