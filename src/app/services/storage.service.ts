import { Injectable } from '@angular/core';
import { defaultParameters, Parameters } from '../lib/defaultParameters';
import merge from 'deepmerge';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  parameters = {} as Parameters;

  constructor() {

    this.init();
  }

  get<K extends keyof Parameters>(key: K) {
    return this.parameters[key];
  }

  set<K extends keyof Parameters>(key: K, value: Parameters[K]) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);

    this.parameters[key] = value;
  }

  private init() {
    const parameters = {};

    Object.entries(defaultParameters).forEach(([key]) => {
      const storagedValue = JSON.parse(localStorage.getItem(key) as string);

      if (storagedValue) {
        Object.defineProperty(parameters, key, {
          value: storagedValue,
          enumerable: true
        });
      } else {
        this.set(key as keyof Parameters, defaultParameters[key as keyof Parameters]);
      }
    });

    this.parameters = merge(defaultParameters, parameters as Parameters);
  }
}
