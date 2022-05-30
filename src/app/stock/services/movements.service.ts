import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ServerResponse } from 'src/app/auth/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Movement } from '../interfaces/interfaces';
import { TransformArrayDataService } from './transform-array-data.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  private baseUrl: string = environment.baseUrl;
  private headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

  constructor( private http: HttpClient, 
    private transform: TransformArrayDataService<Movement>) { }

  // create a movement from a single product (products page)  
  createMovementOfOneProduct(movement: Movement) {
    const url: string = `${this.baseUrl}/movements/create`;
    return this.http.post<ServerResponse>( url, movement, { headers: this.headers })
      .pipe(
        //map( res => res.ok )
       //catchError(error => of(error))
      );
  }  
}