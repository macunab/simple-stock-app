import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Primeng components
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

// My components
import { TableComponent } from './table/table.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    TableComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ]
})
export class SharedModule { }
