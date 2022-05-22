import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  sidebarItems!: MenuItem[];
  userItems!: MenuItem[];
  display: boolean = false;
  title: string = 'StockApp';

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.sidebarItems = [
      { 
        label: 'Sucursales',
        icon: 'pi pi-building',
        styleClass: 'p-2',
        command: () => {
          this.router.navigateByUrl('offices');
          this.display = false;
        }
      },
      {
        separator: true
      },
      { 
        label: 'Productos',
        icon: 'pi pi-qrcode',
        styleClass: 'p-2',
        command: () => {
          this.router.navigateByUrl('products');
          this.display = false;
        }
      },
      {
        separator: true
      },
      { 
        label: 'Movimientos',
        icon: 'pi pi-book',
        styleClass: 'p-2',
        command: () => {
          this.router.navigateByUrl('movements');
          this.display = false;
        }
      },
      {
        separator: true
      },
      { 
        label: 'Reportes',
        icon: 'pi pi-chart-bar',
        styleClass: 'p-2',
        command: () => {
          this.router.navigateByUrl('');
          this.display = false;
        }
      }
    ];

    this.userItems = [
      {
        label: 'Configuracion',
        icon: 'pi pi-fw pi-cog'
      },
      {
        label: 'Salir',
        icon:'pi pi-fw pi-power-off'
      }
    ];
  }

  showSidebar() {
    this.display = true;
  }

}
