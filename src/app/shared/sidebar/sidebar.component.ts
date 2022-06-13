import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';

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
  loggedUser: string = '';
  /*selectedOffice: string = '';
  offices: OfficesDrop[] = [
    {name: 'Cerro', code: 'CRR'},
    {name: 'Independencia', code: 'IND'},
    {name: 'Chacabuco', code: 'CHC'}
  ]*/

  constructor( private router: Router, private authServive: AuthService ) { }

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
        label: 'Productos',
        icon: 'pi pi-qrcode',
        styleClass: 'p-2',
        command: () => {
          this.router.navigateByUrl('products');
          this.display = false;
        }
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
        icon:'pi pi-fw pi-power-off',
        command: () => {
          localStorage.clear();
          this.router.navigateByUrl('login');
        }
      }
    ];
    this.loggedUser = this.authServive.user.name;
  }

  showSidebar() {
    this.display = true;
  }

 /* seleccion($event: any) {
    //console.log('EL SELECT ES ' + $event.value.name);
    console.log(this.selectedOffice);
  }*/

}
