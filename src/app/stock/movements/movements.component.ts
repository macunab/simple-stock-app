import { Component, OnInit } from '@angular/core';
import { ButtonSettings, Column, Row } from 'src/app/shared/interfaces/interfaces';
import { Movement, MovementDto } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styles: [
  ]
})
export class MovementsComponent implements OnInit {

  movements!: Row<MovementDto>;
  movementColumns: Column<MovementDto>[] = [
    { field: 'office', title: 'Sucursal' },
    { field: 'user', title: 'Usuario' },
    { field: 'isOut', title: 'Tipo' },
    { field: 'isConfirmed', title: 'Estado'}
  ];
  buttons: ButtonSettings[] = [
    {
      class: 'pi-button-rounded p-button-text p-button-info',
      functionType: 'details',
      icon: 'pi pi-search',
      tooltipText: 'Detalles'
    },
    {
      class: 'p-button-rounded p-button-text p-button-warning mr-2',
      functionType: 'edit',
      icon: 'pi pi-pencil',
      tooltipText: 'Editar'
    },
    {
      class: 'p-button-rounded p-button-text p-button-danger mr-2',
      functionType: 'delete',
      icon: 'pi pi-trash',
      tooltipText: 'Eliminar'
    },
    {
      class: 'pi-button-rounded p-button-text p-button-help',
      functionType: 'confirm',
      icon: 'pi pi-book',
      tooltipText: 'Confirmar'
    }
  ];
  movementSearchFilter: string[] = ['values.office', 'values.user', 'value.isOut'];

  constructor(private movementService: MovementsService) { }

  ngOnInit(): void {
  }

}
