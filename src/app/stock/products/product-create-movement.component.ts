import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/service/auth.service';
import { isOut, Movement, MovementSave, Office, Product, ResForm } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';

@Component({
  selector: 'app-product-create-movement',
  templateUrl: './product-create-movement.component.html',
  styles: [
  ]
})
export class ProductCreateMovementComponent {

  @Input() product!: Product;
  @Input() office!: Office | undefined;
  @Output() formResponse = new EventEmitter<ResForm<MovementSave>>();

  movementForm: FormGroup = this.fb.group({
    isOut: [true, [Validators.required]],
    note: [''],
    isConfirmed: [false],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });
  movementsType: isOut[] = [{ value: 'Entrada', key: false }, { value: 'Salida', key: true }];
  loadingButton: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
      private movementService: MovementsService) { }

  saveMovement() {
    this.loadingButton = true;
    if(this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }
    const movement: MovementSave = this.movementForm.value;
    movement.office = this.office!;
    movement.products = [{product: this.product._id!, quantity: this.movementForm.controls['quantity'].value}];
    movement.user = this.authService.user.uid;
    this.movementService.createMovementOfOneProduct(movement)
      .subscribe( res => {
        if(res.ok){
          this.formResponse.emit({ok: res.ok, data: movement});
          this.loadingButton = false;
        } 
      });
    this.movementForm.reset();
    this.movementForm.get('isConfirmed')?.setValue(false);
  }

  movementFormFieldValidation( field: string ) {
    return this.movementForm.controls[field].errors
      && this.movementForm.controls[field].touched;
  }
}
