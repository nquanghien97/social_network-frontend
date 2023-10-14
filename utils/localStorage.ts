export const setToLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage?.setItem(key, value);
  }
};

export const getFromLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return window.localStorage?.getItem(key);
  }

  return null;
};

export const removeFromLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    window.localStorage?.removeItem(key);
  }
};
