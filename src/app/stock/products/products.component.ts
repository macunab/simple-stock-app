import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { Office, OfficesDrop, Product } from '../interfaces/interfaces';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {

  products!: Row<Product>[];
  productColumns: Column<Product>[] = [
    { field: 'name', title: 'Nombre' },
    { field: 'price', title: 'Precio'},
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
  product: Product = {} as Product;
  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    price: ['1', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(0)]]
  });
  office: Office | undefined = this.authService.user.office;
  selectedOffice: string = '';
  offices: OfficesDrop[] = [
    {name: 'Cerro', code: 'CRR'},
    {name: 'Independencia', code: 'IND'},
    {name: 'Chacabuco', code: 'CHC'}
  ]

  constructor(private fb: FormBuilder, private productService: ProductsService,
    private confirmationService: ConfirmationService, private msgService: MessageService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.productService.findAllProducts()
      .subscribe( res => {
        this.products = res;
      });
  }

  getTableEvent($event: GenericTableEvent<Product>) {
    switch($event.type) {
      case 'edit':
        console.log('edit product');
        break;
      case 'delete':
        this.openDelete($event.data);
        break;
      case 'movement':
        console.log('Se ha creado un movimiento');
        break;                
    }
  }

  fieldValid( field: string ) {
    return this.productForm.controls[field].errors
      && this.productForm.controls[field].touched;
  }

  openAdd($event: boolean) {
    this.product._id = '';
    this.productForm.reset();
    this.dialogDisplay = true;
    console.log(this.office);
  }

  // open delete modal and confirm or cancel the operation
  openDelete(data: Product) {
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

  openEdit() {

  }

  seleccion($event: any) {
    //console.log('EL SELECT ES ' + $event.value.name);
    console.log(this.selectedOffice);
  }

  saveProduct() {
    if(this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const productToSave: Product = this.productForm.value;

    if(this.office === undefined){ 
      console.log('No se ha seleccionado una sucursal valida' + this.office);
      return;
    }
    productToSave.office = this.office;

    if(this.product._id) {

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

}
