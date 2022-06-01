import { Component, OnInit } from '@angular/core';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { Movement, MovementDto } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';
import { TransformArrayDataService } from '../services/transform-array-data.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styles: [
  ]
})
export class MovementsComponent implements OnInit {

  movements!: Row<MovementDto>[];
  movementsDb!: Movement[];
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

  constructor(private movementService: MovementsService, private transform: TransformArrayDataService<MovementDto>) { }

  ngOnInit(): void {
    this.movementService.findAllMovements()
      .subscribe( res => {
        this.movementsDb = res.values;
        this.movementsDbToMovements();
      });
  }

  movementsDbToMovements() {
    const data = this.movementsDb.map((value) => {
      const val = { _id: (value._id ? value._id : ''), isOut: (value.isOut) ? 'SALIDA':'ENTRADA', office: value.office.name, 
              user: value.user.name, note: (value.note ? value.note : ''), isConfirmed: (value.isConfirmed ? value.isConfirmed : false), products: value.products };
      return val;
    });
    this.movements = this.transform.transformData(data);
  }

  getTableEvent($event: GenericTableEvent<MovementDto>) {
    switch($event.type) {
      case 'edit':
        //this.openEditDialog($event.data);
        break;
      case 'delete':
        //this.openDeleteDialog($event.data);
        break;
      case 'movement':
        console.log('Se ha creado un movimiento');
        //this.openMovementDialog($event.data);
        break;                
    }
  }

  openAddDialog($event: boolean) {
    
  }

}
