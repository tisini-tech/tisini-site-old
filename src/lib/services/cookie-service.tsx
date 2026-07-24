/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { LocalStorageKeyType, TokenType } from "@/lib/types/state";
interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export type CookieKeys = "ck_63hsG-sscWPkl";

class Cookie {
  static set<Key extends CookieKeys, Value = any>(
    name: Key,
    value: Value,
    options: CookieOptions = {}
  ): void {
    const serializedValue = encodeURIComponent(JSON.stringify(value));
    const cookie = `${name}=${serializedValue}`;

    let expires = options.expires;
    if (expires instanceof Date) {
      expires = expires.toUTCString() as any;
    } else if (typeof expires === "number") {
      const d = new Date();
      d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
      expires = d.toUTCString() as any;
    }

    const path = options.path ? `;path=${options.path}` : "";
    const domain = options.domain ? `;domain=${options.domain}` : "";
    const secure = options.secure ? ";secure" : "";

    if (expires) {
      expires = new Date(expires);
      document.cookie = `${cookie};expires=${expires.toUTCString()}${path}${domain}${secure}`;
    } else {
      document.cookie = `${cookie}${path}${domain}${secure}`;
    }
  }

  static get<T extends CookieKeys, P = any>(name: string): P | null {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name as T}=`)) {
        const value = cookie.substring(name.length + 1);
        try {
          return JSON.parse(decodeURIComponent(value)) as P;
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }
  static setCookieToken = <Key extends CookieKeys, CookiePayload extends TokenType>(key: Key, payload: CookiePayload) => {
    Cookie.set<CookieKeys, CookiePayload>(key, payload);
  };
  static getCookieToken = <K extends CookieKeys, P extends TokenType>(
    key: K
  ) => {
    return Cookie.get<K, P>(key) as TokenType;
  };
  static removeToken = <K extends CookieKeys>(key: K) => {
    Cookie.set<K, TokenType>(key, {} as TokenType);
  };
}





class TisiniLocalStorage {
  static set<Key extends LocalStorageKeyType, Value extends string>(name: Key, value: Value): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  static get<T extends LocalStorageKeyType, P = any>(name: T): P | null {
    const value = localStorage.getItem(name as string);
    if (value) {
      try {
        return JSON.parse(value) as P;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  static removeKey = <K extends LocalStorageKeyType>(key: K) => {
    localStorage.removeItem(key as string);
  }

}

export function clearSession() {
  Cookie.removeToken('ck_63hsG-sscWPkl')
  TisiniLocalStorage.removeKey('uz-stUsx-aasSWlsdw5242-00981')
}

export { Cookie, TisiniLocalStorage }
export default Object.assign({}, Cookie, TisiniLocalStorage);//});
