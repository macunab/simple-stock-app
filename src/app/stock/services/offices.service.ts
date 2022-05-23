import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ServerResponse } from 'src/app/auth/interfaces/interfaces';
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

  deleteOffice(id: string) {
    const url: string = `${ this.baseUrl }/offices/${id}/disabled`;
    return this.http.put<ServerResponse>( url, {} )
      .pipe(
        map( res => res.ok),
        catchError( res => of(res.ok))
      );
  }

  saveOffice(office: Office) {
    const url: string =`${ this.baseUrl }/offices/create`;
    return this.http.post<ServerResponse>( url, office )
      .pipe(
        map( res => res.ok ),
        catchError( res => of(res.ok))
      )

  }

  updateOffice(office: Office) {
    const url: string = `${ this.baseUrl }/offices/${ office._id }`;
    const { name, email, address } = office;
    return this.http.put<ServerResponse>( url, { name, email, address })
      .pipe(
        map( res => res.ok),
        catchError( res => of(res.ok))
      )
  }


}
