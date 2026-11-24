export type Locale = "id" | "en";

export type Localized = { id: string; en: string };

export const L = (id: string, en: string): Localized => ({ id, en });
