import { Component, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Document, DocumentDto, isOut, Office, Product, ProductQuantity } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';
import { OfficesService } from '../services/offices.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styles: [
  ]
})
export class CreateMovementComponent implements OnInit, AfterViewInit, AfterContentChecked {

  movementsType: isOut[] = [{ value: 'Entrada', key: false }, { value: 'Salida', key: true }];
  offices!: Office[];
  office: Office = {} as Office;
  selectedOffice: Office = {} as Office;
  products!: ProductQuantity[];
  selectedProducts: ProductQuantity[] = [];
  productsDialogDisplay: boolean = false;
  movementForm!: FormGroup;
  //isUpdate: boolean = true;
  movementId: string = '';
  movementUpdate: DocumentDto = {} as DocumentDto;

  constructor(private fb: FormBuilder, private movementService: MovementsService,
    private officeService: OfficesService, private productService: ProductsService,
    private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const val = params['id'];
      this.movementId = val;
    })
  }

  ngOnInit(): void {
    this.officeService.findAllOfficeWithoutTransformation()
      .subscribe(res => { this.offices = res });
    if(this.movementId) {
      this.movementService.findById(this.movementId)
        .subscribe( res => {
          this.movementUpdate = res;
          this.office = res.office;
          console.log('LA oficina es: ' +this.office.name)
        });
    }  
    this.movementFormInit();
  }

  ngAfterViewInit(): void {
    console.log(this.movementId);
    if (this.movementId) {
      this.movementForm.setValue({
        isOut: this.movementUpdate.isOut,
        notes: (this.movementUpdate.note) ? this.movementUpdate.note : '',
        isConfirmed: this.movementUpdate.isConfirmed
      });
      //this.selectedOffice = this.authService.user.office!;
      /*this.movementService.findById(this.movementId)
        .subscribe( res => {
          this.movementForm.setValue({
            isOut: res.isOut,
            notes: (res.note) ? res.note : '',
            isConfirmed: res.isConfirmed
          });
          this.office = res.office;
          console.log('LA oficina es: ' +this.office.name)
        });*/
     
    }
  }

  ngAfterContentChecked(): void {
    if (this.movementId)
      this.selectedOffice = this.office;

    console.log(`LA OPTICA ES: ${this.selectedOffice.name}`)  
  }

  movementFormInit() {
    this.movementForm = this.fb.group({
      isOut: [true, [Validators.required]],
      notes: [''],
      isConfirmed: [false]
    });
  }

  saveMovement() {
    if (this.movementForm.controls['office'].invalid) {
      return;
    }
    const movement: Document = this.movementForm.value;
    movement.user = this.authService.user.uid;
    movement.products = this.selectedProducts;
    this.movementService.createMovement(movement)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['movements'], { queryParams: { crt: true } });
        } else {
          this.router.navigate(['movements'], { queryParams: { crt: false } });
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
      .subscribe(res => {
        this.products = res;
      });
  }

  selectMovementType($event: any) {
    this.selectedProducts = [];
  }
}
