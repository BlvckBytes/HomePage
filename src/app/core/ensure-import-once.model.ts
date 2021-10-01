/**
 * This abstract class is used for module building
 * By extending this class, it prevents importing the module into
 * somewhere else than root App Module
 */
export abstract class EnsureImportedOnceModule {
  protected constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(`${targetModule.constructor.name} has already been loaded.`);
    }
  }
}