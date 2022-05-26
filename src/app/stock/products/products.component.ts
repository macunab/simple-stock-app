import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { Product } from '../interfaces/interfaces';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
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
      icon: '',
      tooltipText: 'Crear movimiento'
    }
  ];
  productSearchFilter: string[] = ['values.name'];
  dialogDisplay: boolean = false;
  product: Product = {} as Product;
  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    price: ['', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(0)]]
  });

  constructor(private fb: FormBuilder, private productService: ProductsService,
    private confirmationService: ConfirmationService, private msgService: MessageService) { }

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

  saveProduct() {

  }

}
