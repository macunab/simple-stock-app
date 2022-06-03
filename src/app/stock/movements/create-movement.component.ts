import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isOut, Office, Product } from '../interfaces/interfaces';
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

  movementForm: FormGroup = this.fb.group({});
  movementsType: isOut[] = [{ value: 'Entrada', key: false }, { value: 'Salida', key: true }];
  offices!: Office[];
  products!: Product[];

  constructor( private fb: FormBuilder, private movementService: MovementsService, 
      private officeService: OfficesService, private productService: ProductsService ) { }

  ngOnInit(): void {
    this.officeService.findAllOfficeWithoutTransformation()
      .subscribe(res => { this.offices = res });
    this.productService.findAllProductsWithoutTransformation()
      .subscribe( res => { this.products = res });      
  }

  saveMovement() {
    
  }

}
