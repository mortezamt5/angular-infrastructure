import { TranslateService } from "@ngx-translate/core";
import { TranslationLoaderService } from "../_service/translation-loader.service";
import { ILocale } from "./local.model";
export class AppBaseModule {
  constructor(
    private translate: TranslateService,
    private translationLoader: TranslationLoaderService,
    private langArgs: ILocale[]
  ) {
    /* Config translation in root module */
    this.translate.addLangs(["fa", "en"]);
    this.translate.setDefaultLang("fa");
    this.translate.use("fa");
    /* Load translations in each module/component as needed */
    this.translationLoader.loadTranslations(...langArgs);
  }
}
