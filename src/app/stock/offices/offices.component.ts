import { Component, OnInit } from '@angular/core';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { Office } from '../interfaces/interfaces';
import { OfficesService } from '../services/offices.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styles: [
  ]
})
export class OfficesComponent implements OnInit {

  offices!: Row<Office>[];
  officeColumns: Column<Office>[] = [
    { name: 'name', title: 'Nombre' },
    { name: 'email', title: 'Email' },
    { name: 'address', title: 'Direccion' }
  ];
  buttons: ButtonSettings[] = [
    {
      class: 'p-button-rounded p-button-text p-button-warning mr-2',
      functionType: 'edit',
      icon: 'pi pi-pencil'
    },
    {
      class: 'p-button-rounded p-button-text p-button-danger mr-2',
      functionType: 'delete',
      icon: 'pi pi-trash'
    }
  ];

  constructor(private officeService: OfficesService) { }

  ngOnInit(): void {
    this.officeService.findAllOffice()
      .subscribe(resp => {
        this.offices = resp;
      });
  }

  getTableEvent($event: GenericTableEvent<Office>) {
    switch ($event.type) {
      case 'edit':
        console.log($event.data);
        break;
      case 'delete':
        console.log($event.data);
        break;
    }
  }

  openAdd() {

  }

  openDelete(id: string) {

  }

  openEdit(office: Office) {

  }
}
