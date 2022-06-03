import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, of, pipe } from 'rxjs';
import { ServerResponse } from 'src/app/auth/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { __values } from 'tslib';
import { ArrayResp, Office, Product, ProductDb } from '../interfaces/interfaces';
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

  findAllProducts(office: Office) {
    const url: string = `${ this.baseUrl }/products`;
    return this.http.get<ArrayResp<ProductDb>>( url, {headers: this.headers})
      .pipe(
        map( res => {
          const products = res.values.map((value) =>{
           const stock = value.stockOffices.find( el => el.office == office._id)?.stock;
           const product: Product = { _id: value._id, name: value.name, description: value.description, price: value.price, stock: stock!, office: office };
           return product;
          });
          const data = this.transform.transformData(products);
          return data;
        }),
        catchError( err => of(err.ok))
      );
  }

  findAllProductsWithoutTransformation() {
    const url: string = `${ this.baseUrl }/products`;
    return this.http.get<Product[]>( url, { headers: this.headers })
      .pipe(
        map( res => res.values ),
        catchError(err => of(err.ok))
      );
  }
  
  saveProduct(product: Product) {
    const url: string = `${ this.baseUrl }/products/create`;
    return this.http.post<ServerResponse>( url, product, { headers: this.headers })
      .pipe(
        catchError(err => of(err.ok))
      );
  }

  deleteProduct(id: string) {
    const url: string = `${ this.baseUrl }/products/${id}`;
    return this.http.delete<ServerResponse>( url, { headers: this.headers } )
      .pipe(
        map( res => res.ok ),
        catchError( err => of(err.ok))
      );
  }

  updateProduct(product: Product) {
    const url: string = `${ this.baseUrl }/products/${ product._id }`;
    const { name, description, price } = product;
    return this.http.put<ServerResponse>( url, {name, description, price }, { headers: this.headers })
      .pipe(
        map( res => res.ok ),
        catchError( err => of(err.ok))
      );

  }
}
