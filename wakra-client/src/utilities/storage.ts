export const tokenKey = 'token';

export const saveToken = (token: string): void => localStorage.setItem(tokenKey, token);

export const getToken = (): string => localStorage.getItem(tokenKey) || '';
export const deleteToken = (): void => localStorage.removeItem(tokenKey);
