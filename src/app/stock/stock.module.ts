import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { OfficesComponent } from './offices/offices.component';
import { ProductsComponent } from './products/products.component';
import { MovementsComponent } from './movements/movements.component';


@NgModule({
  declarations: [
    OfficesComponent,
    ProductsComponent,
    MovementsComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
