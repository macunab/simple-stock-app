import { Component, OnInit, AfterContentInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { Movement, MovementDto } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';
import { TransformArrayDataService } from '../services/transform-array-data.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class MovementsComponent implements OnInit, AfterViewInit {

  movements!: Row<MovementDto>[];
  movementsDb!: Movement[];
  movementColumns: Column<MovementDto>[] = [
    { field: 'createdAt', title: 'Fecha de creacion', date: true},
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
      class: 'pi-button-rounded p-button-text p-button-help',
      functionType: 'confirm',
      icon: 'pi pi-check',
      tooltipText: 'Confirmar'
    }
  ];
  movementSearchFilter: string[] = ['values.office', 'values.user', 'values.isOut'];
  dialogDisplay: boolean = false;
  msgCreate: string = '';

  constructor(private movementService: MovementsService, 
    private transform: TransformArrayDataService<MovementDto>,
    private messageService: MessageService, private router: Router, private route: ActivatedRoute, 
      private cd: ChangeDetectorRef ) {
      this.route.queryParams.subscribe( params => {
        const val = params['crt'];
        this.msgCreate = val;
      })
    }

  ngOnInit(): void {
    this.movementService.findAllMovements()
      .subscribe( res => {
        this.movementsDb = res.values;
        this.movementsDbToMovements();
      });
  }

  ngAfterViewInit(): void {
    this.showToastMessage();
    this.cd.detectChanges();
  }

  movementsDbToMovements() {
    const data = this.movementsDb.map((value) => {
      const val = { _id: (value._id ? value._id : ''), isOut: (value.isOut) ? 'SALIDA':'ENTRADA', office: value.office.name, 
              user: value.user.name, note: (value.note ? value.note : ''), isConfirmed: (value.isConfirmed ? value.isConfirmed : false),
              products: value.products, createdAt: value.createdAt };
      return val;
    });
    this.movements = this.transform.transformData(data);
  }

  getTableEvent($event: GenericTableEvent<MovementDto>) {
    switch($event.type) {
      case 'edit':
        //this.openEditDialog($event.data);
        console.log('EDICION DE DATOS');
        //this.editDialog();
        break;
      case 'details':
        console.log('detalles de movimiento');
        break;
      case 'confirm':
        console.log('Se ha creado un movimiento');
        //this.openMovementDialog($event.data);
        break;                
    }
  }

  openAddDialog($event: boolean) {
    //this.dialogDisplay = true;
    this.router.navigateByUrl('movements/add');
  }

  showToastMessage() {
    if(this.msgCreate === undefined ) {
      return;
    }

    if(this.msgCreate === 'true') {
      this.messageService.add({ severity: 'success', summary: 'OK', 
        detail: 'Se ha guardado el movimiento exitosamente', life: 2000});
    } else {
      this.messageService.add({ severity: 'error', summary: 'ERROR', 
      detail: 'Se ha producido un error al intentar guardar un nuevo movimiento', life: 2000});
    }
  }

}
