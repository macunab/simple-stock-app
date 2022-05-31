import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { isOut, Movement, Office, Product, ResForm, QuantityProduct } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styles: [
  ]
})
export class CreateMovementComponent {

  @Input() product!: Product;
  @Input() office!: Office | undefined;

  @Output() formResponse = new EventEmitter<ResForm<Movement>>();

  movementForm: FormGroup = this.fb.group({
    isOut: [true, [Validators.required]],
    note: [''],
    isConfirmed: [false],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });
  movementsType: isOut[] = [{ value: 'Entrada', key: false }, { value: 'Salida', key: true }];

  constructor(private fb: FormBuilder, private authService: AuthService,
      private movementService: MovementsService) { }

  saveMovement() {
    if(this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }
    const movement: Movement = this.movementForm.value;
    movement.office = this.office!;
    movement.products = [{product: this.product._id!, quantity: this.movementForm.controls['quantity'].value}];
    movement.user.uid = this.authService.user.uid;
    this.movementService.createMovementOfOneProduct(movement)
      .subscribe( res => {
        if(res.ok){
          this.formResponse.emit({ok: res.ok, data: movement});
        } 
      });
    this.movementForm.reset();      
  }

  movementFormFieldValidation( field: string ) {
    return this.movementForm.controls[field].errors
      && this.movementForm.controls[field].touched;
  }
}
