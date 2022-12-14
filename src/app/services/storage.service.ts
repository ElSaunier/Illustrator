import { Injectable } from '@angular/core';
import { defaultParameters, Parameters } from '../lib/defaultParameters';
import merge from 'deepmerge';
import { BehaviorSubject } from 'rxjs';

type ParametersSubjects = {
  [key in keyof Parameters]: BehaviorSubject<Parameters[key]>
};
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  parameters = {} as Parameters;
  parameters$ = {} as ParametersSubjects;

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
    this.parameters$[key].next(value);
  }

  subject<K extends keyof Parameters>(key: K) {
    return this.parameters$[key].asObservable();
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
        Object.defineProperty(this.parameters$, key, {
          value: new BehaviorSubject(storagedValue),
          enumerable: true
        });
      } else {
        Object.defineProperty(this.parameters$, key, {
          value: new BehaviorSubject(defaultParameters[key as keyof Parameters]),
          enumerable: true
        });
        this.set(key as keyof Parameters, defaultParameters[key as keyof Parameters]);
      }
    });

    this.parameters = merge(defaultParameters, parameters as Parameters);
  }
}
