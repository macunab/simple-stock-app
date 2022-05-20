import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficesComponent } from './offices/offices.component';

const routes: Routes = [
  {
    path: 'offices',
    children: [
      { path: '', component: OfficesComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
