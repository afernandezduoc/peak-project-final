import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      const item = localStorage.getItem(key);
      console.log(`Getting item from localStorage: ${key} = ${item}`);
      return item;
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      console.log(`Setting item in localStorage: ${key} = ${value}`);
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      console.log(`Removing item from localStorage: ${key}`);
      localStorage.removeItem(key);
    }
  }
}
