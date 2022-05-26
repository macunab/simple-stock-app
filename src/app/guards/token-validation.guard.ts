import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidationGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router){}

  canActivate(): Observable<boolean>  | boolean {
    return this.authService.tokenValidation()
      .pipe(
        tap( valid => {
          if(!valid) this.router.navigateByUrl('login');
        })
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.tokenValidation()
      .pipe(
        tap( valid => {
          if(!valid) this.router.navigateByUrl('login');
        })
      );
  }
}
