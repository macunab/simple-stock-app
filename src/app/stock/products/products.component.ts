import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { isOut, Movement, Office, Product, ResForm } from '../interfaces/interfaces';
import { ProductsService } from '../services/products.service';
import { OfficesService } from '../services/offices.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class ProductsComponent implements OnInit, AfterContentChecked {

  products!: Row<Product>[];
  productColumns: Column<Product>[] = [
    { field: 'name', title: 'Nombre' },
    { field: 'price', title: 'Precio', currency: true},
    { field: 'stock', title: 'Stock'},
  ];
  buttons: ButtonSettings[] = [
    {
      class: 'p-button-rounded p-button-text p-button-warning mr-2',
      functionType: 'edit',
      icon: 'pi pi-pencil',
      tooltipText: 'Editar'
    },
    {
      class: 'p-button-rounded p-button-text p-button-danger mr-2',
      functionType: 'delete',
      icon: 'pi pi-trash',
      tooltipText: 'Eliminar'
    },
    {
      class: 'pi-button-rounded p-button-text p-button-info',
      functionType: 'movement',
      icon: 'pi pi-book',
      tooltipText: 'Crear movimiento'
    }
  ];
  productSearchFilter: string[] = ['values.name'];

  dialogDisplay: boolean = false;
  dialogMovement: boolean = false;

  product: Product = {} as Product;
  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    price: ['1', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(0)]]
  });

  office: Office | undefined = this.authService.user.office;
  selectedOffice: Office = {} as Office;
  changeSelectedOffice: Office | undefined = this.office;
  offices!: Office[];

  constructor(private fb: FormBuilder, private productService: ProductsService,
    private confirmationService: ConfirmationService, private msgService: MessageService,
    private authService: AuthService, private officeService: OfficesService) { }

  ngOnInit(): void {
    this.productService.findAllProducts(this.office!)
      .subscribe( res => {
        this.products = res;
      });
    this.officeService.findAllOfficeWithoutTransformation()
      .subscribe( res => {
        this.offices = res;
      });
  }

  ngAfterContentChecked(): void {
    this.selectedOffice = this.office!;
  }
    // Cambio de sucursal
    officeSelection($event: any) {
      this.changeSelectedOffice = this.selectedOffice; 
      this.products = [];
      this.productService.findAllProducts(this.selectedOffice)
        .subscribe( res => this.products = res );
    }

  getTableEvent($event: GenericTableEvent<Product>) {
    switch($event.type) {
      case 'edit':
        this.openEditDialog($event.data);
        break;
      case 'delete':
        this.openDeleteDialog($event.data);
        break;
      case 'movement':
        console.log('Se ha creado un movimiento');
        this.openMovementDialog($event.data);
        break;                
    }
  }

  fieldValid( field: string ) {
    return this.productForm.controls[field].errors
      && this.productForm.controls[field].touched;
  }

  openAddDialog($event: boolean) {
    this.product._id = '';
    this.productForm.controls['stock'].enable();
    this.productForm.reset();
    this.dialogDisplay = true;
  }

  // open delete modal and confirm or cancel the operation
  openDeleteDialog(data: Product) {
    this.confirmationService.confirm({
      message: `Esta seguro que desea eliminar el producto: ${ data.name }`,
      header: 'Eliminar producto',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(data._id!)
          .subscribe( res => {
            if(res) {
              this.msgService.add({ severity: 'success', summary: 'OK', 
                detail: `El productos ${data.name} se ha eliminado exitosamente`, life: 2000 });
              this.products = this.products.filter(val => val.values._id !== data._id);  
            } else {
              this.msgService.add({ severity: 'error', summary: 'Error', 
                detail: `Se ha producido un error al intentar eliminar el producto ${data.name}`, life: 2000 });
            }
          });
      }
    });
  }

  openEditDialog(product: Product) {
    this.product = product;
    this.productForm.controls['stock'].disable();
    this.productForm.setValue({
      name: product.name,
      description: (product.description) ? product.description : '',
      price: product.price,
      stock: product.stock
    });
    this.dialogDisplay = true;
  }

  saveProduct() {
    if(this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const productToSave: Product = this.productForm.value;
    if(this.office === undefined){ 
      return;
    }
    productToSave.office = this.office;
    if(this.product._id) {
      productToSave._id = this.product._id;
      this.productService.updateProduct( productToSave )
        .subscribe( res => {
          if(res) {
            this.msgService.add({ severity: 'success', summary: 'OK', 
              detail: `El producto ${productToSave.name} se ha editado exitosamente`, life: 2000 });
            const index = this.products.findIndex( val => val.values._id === productToSave._id );
            productToSave.stock = this.product.stock;
            (index !== -1) ? this.products[index] = {values: productToSave} : '';  
          } else {
            this.msgService.add({ severity: 'error', summary: 'Error', 
              detail: 'Se ha producido un error al intentar editar el producto', life: 2000 });
          }
        });
    } else {
      this.productService.saveProduct(productToSave)
        .subscribe(res => {
          if(res.ok == true) {
            this.msgService.add({ severity: 'success', summary: 'OK', 
              detail: `El producto ${ productToSave.name} se ha guardado exitosamente`, life: 2000});
            productToSave._id = res.uid;
            this.products.push({ values: productToSave});
            this.products = [ ...this.products ];              
          } else {
            this.msgService.add({ severity: 'error', summary: 'ERROR', 
              detail: `Se ha producido un error al intentar guardar el producto ${productToSave.name}`, life: 2000});
          }
        });
    }
    this.dialogDisplay = false;
  }

  openMovementDialog(data: Product) {
    this.product = data;
    this.dialogMovement = true;
  }

  closeMovementDialog(res: ResForm<Movement>) {
    if(res.ok){
      this.products = [];
      this.msgService.add({ severity: 'success', summary: 'OK', 
        detail: 'Se ha creado un nuevo movimiento exitosamente', life: 2000});
      this.productService.findAllProducts(this.changeSelectedOffice!)
        .subscribe( res => {
          this.products = res;
      }); 
      this.dialogMovement = false;
    } else {
      this.msgService.add({ severity: 'error', summary: 'ERROR', 
        detail: 'Ha ocurrido un error al intentar crear un nuevo movimiento', life: 2000});
      this.dialogDisplay = false;        
    }
  }

}
