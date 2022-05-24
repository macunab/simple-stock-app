import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<ArrayResp<Office>>( url, { headers } )
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
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.put<ServerResponse>( url, {}, { headers } )
      .pipe(
        map( res => res.ok),
        catchError( res => of(res.ok))
      );
  }

  saveOffice(office: Office) {
    const url: string =`${ this.baseUrl }/offices/create`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.post<ServerResponse>( url, office, { headers } )
      .pipe(
        catchError( res => of(res.ok))
      )

  }

  updateOffice(office: Office) {
    const url: string = `${ this.baseUrl }/offices/${ office._id }`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const { name, email, address } = office;
    return this.http.put<ServerResponse>( url, { name, email, address }, { headers })
      .pipe(
        map( res => res.ok),
        catchError( res => of(res.ok))
      )
  }


}
