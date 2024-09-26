import { useState, useEffect } from 'react';

const useCookie = (cookieName: string): any => {
  const [cookieValue, setCookieValue] = useState<string | undefined>((): string | undefined => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    return cookie?.split('=')[1];
  });

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    setCookieValue(cookie?.split('=')[1]);
  }, [cookieName]);

  const setCookie = (
    value: string,
    expireInSeconds: number = 8640000
  ): void => {
    const expires = new Date(new Date().getTime() + expireInSeconds);
    document.cookie = `${cookieName}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  const deleteCookie = (): void => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  return [cookieValue, setCookie, deleteCookie];
};
export default useCookie;
