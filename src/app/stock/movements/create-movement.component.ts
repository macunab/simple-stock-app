import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Document, isOut, Office, Product, ProductQuantity } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';
import { OfficesService } from '../services/offices.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styles: [
  ]
})
export class CreateMovementComponent implements OnInit {
  
  movementsType: isOut[] = [{ value: 'Entrada', key: false }, { value: 'Salida', key: true }];
  offices!: Office[];
  office: Office = this.authService.user.office!;
  selectedOffice: Office = {} as Office;
  products!: ProductQuantity[];
  selectedProducts: ProductQuantity[] = [];
  productsDialogDisplay: boolean = false;
  movementForm!: FormGroup;

  constructor( private fb: FormBuilder, private movementService: MovementsService, 
      private officeService: OfficesService, private productService: ProductsService,
      private authService: AuthService, private route: Router ) {}

  ngOnInit(): void {
    this.officeService.findAllOfficeWithoutTransformation()
        .subscribe(res => { this.offices = res });
    this.movementFormInit();
  }

  movementFormInit() {
    this.movementForm = this.fb.group({
      isOut: [true, [Validators.required]],
      notes: [''],
      isConfirmed: [false],
      office:['', [Validators.required, Validators.nullValidator]]
    });
  }

  saveMovement() {
    if(this.movementForm.controls['office'].invalid) {
      return;
    }
    const movement: Document = this.movementForm.value;
    movement.user = this.authService.user.uid;
    movement.products = this.selectedProducts;
    this.movementService.createMovement(movement)
      .subscribe( res => {
        if( res ) {
          this.route.navigate(['movements'], { queryParams: { crt: true }});
        } else {
          this.route.navigate(['movements'], { queryParams: { crt: false }});
        }
      });
  }

  openProducs = () => {
    this.productsDialogDisplay = true;
  }
  selectProducts() {
    this.productsDialogDisplay = false;
  }

  selectOffice($event: any) {
    this.selectedProducts = [];
    this.productService.findAllProductsWithoutTransformation($event.value)
    .subscribe( res => { 
      this.products = res;
     });
  }

  selectMovementType($event: any) {
    this.selectedProducts = [];
  }
}
