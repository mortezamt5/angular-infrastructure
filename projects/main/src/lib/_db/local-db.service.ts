import { Injectable } from '@angular/core';

import { Crypto } from '../_utils/crypto';

@Injectable()
export class LocalDbService {
  constructor() {}

  save(key: string, value: any) {
    const encryptData = Crypto.encryptData(value , 'mcb-secret-key');
    localStorage.setItem(key, encryptData);
  }
  get(key: string) {
    const data = localStorage.getItem(key);
    if (data) return Crypto.decryptData(data , 'mcb-secret-key');
  }
  delete(key: string) {
    localStorage.removeItem(key);
  }
}
