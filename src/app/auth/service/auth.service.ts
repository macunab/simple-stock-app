import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user};
  }

  constructor( private http: HttpClient) { }

  // Save token and load user data
  loadToken(res: ServerResponse) {
    localStorage.setItem('token', res.token!);
    this._user = { uid: res.uid!, name: res.name!, permissions: res.permissions!}
  }

  // authenticate to the server
  login(email: string, password: string) {

    const url: string = `${ this.baseUrl }/auth/`;
    const body = { email, password };

    return this.http.post<ServerResponse>( url, body )
      .pipe(
        tap( resp => {
          if(resp.ok) {
            this.loadToken( resp );
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg))
      );
  }

  // check if auth token is valid
  tokenValidation(): Observable<boolean> {

    const url: string = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<ServerResponse>(url, { headers })
      .pipe(
        map( resp => {
          this.loadToken( resp );
          return resp.ok;
        }),
        catchError( err => of(err.ok))
      );  
  }

  // clear the authentication data
  logout() {
    localStorage.clear();
  }
}
