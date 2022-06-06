import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ServerResponse } from 'src/app/auth/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { ArrayResp, Document, Movement, MovementDto, MovementSave } from '../interfaces/interfaces';
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
  createMovementOfOneProduct(movement: MovementSave) {
    const url: string = `${this.baseUrl}/movements/create`;
    return this.http.post<ServerResponse>( url, movement, { headers: this.headers });    
  }

  createMovement(movement: Document) {
    const url: string = `${this.baseUrl}/movements/create`;
    return this.http.post<ServerResponse>( url, movement, { headers: this.headers })
      .pipe(
        map( res => res.ok ),
        catchError( err => of(err.ok))
      );  
  }

  findAllMovements() {
    const url: string = `${ this.baseUrl }/movements/`;
    return this.http.get<ArrayResp<Movement>>( url, { headers: this.headers })
      .pipe();
  }

  /**
   * Esta funcionalidad esta en duda no se tendria que poder eliminar un movimiento 
   * que este confirmado, pero quisas se podria eliminar un movimiento que ya este confirmado...
   * @param id 
   * @returns 
   */
  deleteMovement(id: string) {
    const url: string = `${ this.baseUrl }/movements/${id}`;
    return this.http.delete<ServerResponse>( url, { headers: this.headers })
      .pipe(
        map( res => res.ok),
        catchError( err => of(err.ok))
      );
  }

  confirmMovement(id: string) {
    const url: string = `${ this.baseUrl }/movement/confirm/${ id }`;
    return this.http.put<ServerResponse>( url, {headers: this.headers});
  }
}
