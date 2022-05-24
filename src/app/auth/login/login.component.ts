import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor( private fb: FormBuilder,
      private router: Router,
      private authService: AuthService ) { }

  // true if field has errors  
  fieldIsInvalid( inputName: string ) {
    return this.loginForm.controls[inputName].errors
      && this.loginForm.controls[inputName].touched;
  }

  // Navigate to home page if login is valid
  login() {
    const { email, password } = this.loginForm.value;
    if( this.loginForm.invalid ) {
      Swal.fire('Error', 'Ingrese un email o password validos', 'error');
    }
    console.log('Login realizado');
    // service authentication
    this.authService.login( email, password)
      .subscribe( resp => {
        if( resp === true) {
          this.router.navigateByUrl('offices');
        } else {
          Swal.fire('Error', resp, 'error');
        }
      });
  }

}
