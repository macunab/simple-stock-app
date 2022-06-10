import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { DocumentDto, Movement, MovementDto } from '../interfaces/interfaces';
import { MovementsService } from '../services/movements.service';
import { TransformArrayDataService } from '../services/transform-array-data.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

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
  movementDetail!: DocumentDto;
  skeletonDetail: boolean = true;

  constructor(private movementService: MovementsService, 
    private transform: TransformArrayDataService<MovementDto>,
    private messageService: MessageService, private router: Router, private route: ActivatedRoute, 
      private cd: ChangeDetectorRef, private confirmationService: ConfirmationService ) {
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
        console.log('EDICION DE DATOS');
        //this.editDialog();
        break;
      case 'details':
        this.openDetailDialog($event.data._id!);
        break;
      case 'confirm':
        this.confirmMovement($event.data._id!);
        break;                
    }
  }

  confirmMovement($event: string) {    
    this.confirmationService.confirm({
      message: 'Desea confirmar este movimiento?',
      accept: () => {
        this.movementService.confirmMovement($event)
          .subscribe( res => {
            if(res.ok) {
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(['movements']));
            } else {
              console.log('ERROR AL INTENTAR CONFIRMAR EL MOV: ' + res);
            }
          });
      }
  });
  }

  openAddDialog($event: boolean) {
    this.router.navigateByUrl('movements/add');
  }

  openDetailDialog(id: string) {
    this.dialogDisplay = true;
    this.movementService.findById(id)
      .subscribe( res => {
        this.movementDetail = res;
        console.log(this.skeletonDetail);
        this.skeletonDetail = false;
      });
  }

  closeDetail() {
    this.skeletonDetail = true;
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
