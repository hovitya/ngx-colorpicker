import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NgxColorStoreService {
  private subjects: {[idx: string]: Subject<string[]>} = {};
  constructor() { }

  private readFromLocalStorage(key: string): string[] {
    if (localStorage[key]) {
      try {
        return JSON.parse(localStorage[key]);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  private writeToLocalStorage(key: string, data: string[]) {
    localStorage[key] = JSON.stringify(data);
  }

  get(key: string): Observable<string[]> {
    if (!this.subjects[key]) {
      this.subjects[key] = new BehaviorSubject(this.readFromLocalStorage(key));
    }
    return this.subjects[key].asObservable();
  }

  add(key: string, color: string, maxLength: number) {
    const original = this.readFromLocalStorage(key);
    original.splice(0, 0, color);
    const modified = original.filter((v, i) => i < maxLength);
    this.writeToLocalStorage(key, modified);
    if (this.subjects[key]) {
      this.subjects[key].next(modified);
    }
  }

  remove(key: string, color: string) {
    const original = this.readFromLocalStorage(key);
    const pos = original.indexOf(color);
    if (pos !== -1) {
      original.splice(pos, 1);
      const modified = [...original];
      this.writeToLocalStorage(key, modified);
      if (this.subjects[key]) {
        this.subjects[key].next(modified);
      }
    }
  }
}
