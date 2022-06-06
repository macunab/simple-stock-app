import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateMovementComponent } from './movements/create-movement.component';
import { MovementsComponent } from './movements/movements.component';
import { OfficesComponent } from './offices/offices.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'officesTemp',
    children: [
      { path: '', component: OfficesComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  {
    path: 'offices',
    component: MainComponent,
    children: [
      { path: '', component: OfficesComponent },
      { path: '**', redirectTo: ''}
    ]
  },
  {
    path: 'products',
    component: MainComponent,
    children: [
      { path: '', component: ProductsComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  {
    path: 'movements',
    component: MainComponent,
    children: [
      { path: '', component: MovementsComponent },
      { path: '/:crt', component: MovementsComponent },
      { path: 'add', component: CreateMovementComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  {
    path: '**',
    redirectTo: 'offices'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
