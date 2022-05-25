import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, of, pipe } from 'rxjs';
import { ServerResponse } from 'src/app/auth/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { ArrayResp, Product } from '../interfaces/interfaces';
import { TransformArrayDataService } from './transform-array-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.baseUrl;
  private headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

  constructor( private http: HttpClient, 
    private transform: TransformArrayDataService<Product>) { }

  findAllProducts() {
    const url: string = `${ this.baseUrl }/products`;
    return this.http.get<ArrayResp<Product>>( url, {headers: this.headers})
      .pipe(
        map( res => {
          const data = this.transform.transformData(res.values);
          return data;
        }),
        catchError( error => of(error.ok))
      );
  } 
  
  saveProduct(product: Product) {
    const url: string = `${ this.baseUrl }/products/create`;
    return this.http.post<ServerResponse>( url, product, { headers: this.headers })
      .pipe(
        catchError(error => of(error.ok))
      );
  }

  deleteProduct(id: string) {
    const url: string = `${ this.baseUrl }/products/${id}`;
    return this.http.delete<ServerResponse>( url, { headers: this.headers } )
      .pipe(
        map( res => res.ok ),
        catchError( error => of(error.ok))
      );
  }

  updateProduct(product: Product) {
    const url: string = `${ this.baseUrl }/products/${ product._id }`;
    const { name, description, price, stock, office } = product;
    return this.http.put<ServerResponse>( url, {name, description, price, stock, office }, { headers: this.headers })
      .pipe(
        map( res => res.ok ),
        catchError( error => of(error.ok))
      );

  }
}
