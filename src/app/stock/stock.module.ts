import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { ConfirmationService } from 'primeng/api';

import { StockRoutingModule } from './stock-routing.module';
import { OfficesComponent } from './offices/offices.component';
import { ProductsComponent } from './products/products.component';
import { MovementsComponent } from './movements/movements.component';
import { CreateMovementComponent } from './movements/create-movement.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCreateMovementComponent } from './products/product-create-movement.component';
import { CreateProductComponent } from './products/create-product.component';





@NgModule({
  declarations: [
    OfficesComponent,
    ProductsComponent,
    MovementsComponent,
    MainComponent,
    CreateMovementComponent,
    ProductCreateMovementComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    CardModule,
    TableModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class StockModule { }
