import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ConfirmationService } from 'primeng/api';

import { StockRoutingModule } from './stock-routing.module';
import { OfficesComponent } from './offices/offices.component';
import { ProductsComponent } from './products/products.component';
import { MovementsComponent } from './movements/movements.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    OfficesComponent,
    ProductsComponent,
    MovementsComponent,
    MainComponent
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
    ReactiveFormsModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class StockModule { }
