import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArrayResp, Office } from '../interfaces/interfaces';
import { TransformArrayDataService } from './transform-array-data.service';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient, 
    private transform: TransformArrayDataService<Office> ) {}

  findAllOffice() {
    const url: string = `${ this.baseUrl }/offices`;
    
    return this.http.get<ArrayResp<Office>>( url )
      .pipe(
        map( res => {
          const data = this.transform.transformData(res.values);
          return data;
        }),
        catchError( resp => of(resp.ok))
      );
  }


}
