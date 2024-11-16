import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getItem(key: string): string | null {
    if (this.isBrowser && window.sessionStorage) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser && window.sessionStorage) {
      sessionStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser && window.sessionStorage) {
      sessionStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser && window.sessionStorage) {
      sessionStorage.clear();
    }
  }
}
