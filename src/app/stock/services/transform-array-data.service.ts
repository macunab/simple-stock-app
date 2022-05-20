import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransformArrayDataService<T> {

  constructor() { }

  transformData(data: T[]) {
    return data.map( (value) => {
      const val = { values: value };
      return val;
    });
  }
}
