import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Primeng components
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';

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
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    TooltipModule,
    SidebarModule,
    MenubarModule,
    MenuModule,
    SplitButtonModule
  ],
  exports: [
    TableComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
