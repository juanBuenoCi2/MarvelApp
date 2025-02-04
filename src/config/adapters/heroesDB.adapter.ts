import { MARVEL_PRIVATE_KEY, MARVEL_PUBLIC_KEY } from '@env';
import { ApisauceAdapter } from './apisauce.adapter';
import CryptoJS from 'crypto-js';

  const ts = new Date().getTime().toString();
  const publicKey = MARVEL_PUBLIC_KEY;
  const privateKey = MARVEL_PRIVATE_KEY;
  const hash = CryptoJS.MD5(ts+privateKey+publicKey).toString();

export const heroesDBFetcher = new ApisauceAdapter({

    baseUrl: 'https://gateway.marvel.com',
    params: {
        ts:ts,
        apikey:publicKey ?? 'no-key',
        hash:hash,
    },
});
