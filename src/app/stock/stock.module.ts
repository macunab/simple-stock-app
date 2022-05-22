import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    SharedModule
  ]
})
export class StockModule { }
