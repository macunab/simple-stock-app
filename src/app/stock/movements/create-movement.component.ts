import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { isOut, Office, Product, ProductQuantity } from '../interfaces/interfaces';
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
  products!: ProductQuantity[];
  selectedProducts: ProductQuantity[] = [];
  productsDialogDisplay: boolean = false;
  movementForm: FormGroup = this.fb.group({
    isOut: [true, [Validators.required]],
    note: [''],
    isConfirmed: [false],
    office:[this.authService.user.office, [Validators.required, Validators.nullValidator]]
  });

  constructor( private fb: FormBuilder, private movementService: MovementsService, 
      private officeService: OfficesService, private productService: ProductsService,
      private authService: AuthService ) {}

  ngOnInit(): void {
    this.officeService.findAllOfficeWithoutTransformation()
        .subscribe(res => { this.offices = res }); 
  }

  saveMovement() {

    if(this.movementForm.controls['office'].invalid) {
      console.log('Hay un error en el formulario');
      return;
    }
    console.log(this.movementForm.value);
    console.log(this.selectedProducts);
    
  }

  openProducs = () => {
    this.productsDialogDisplay = true;
  }
  selectProducts() {
    console.log(this.selectedProducts);
    this.productsDialogDisplay = false;
  }

  selectOffice($event: any) {
    console.log($event.value);
    this.selectedProducts = [];
    this.productService.findAllProducts($event.value)
    .subscribe( res => { 
      this.products = res.map( (val: any) => ({
        product: val.values,
        quantity: 1
      }));
     });
  }

  selectMovementType($event: any) {
    this.selectedProducts = [];
  }

  openProductsDialog(){
    
  }

}
