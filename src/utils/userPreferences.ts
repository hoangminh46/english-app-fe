const STORAGE_KEY = 'userPreferences';

export interface UserPreferences {
  audience: string;
  language: string;
}

export const getUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { audience: '', language: '' };
  } catch {
    return { audience: '', language: '' };
  }
};

export const saveAudience = (audience: string): void => {
  const current = getUserPreferences();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, audience }));
};

export const saveLanguage = (language: string): void => {
  const current = getUserPreferences();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, language }));
};

