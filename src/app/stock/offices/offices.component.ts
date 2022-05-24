import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonSettings, Column, GenericTableEvent, Row } from 'src/app/shared/interfaces/interfaces';
import { Office } from '../interfaces/interfaces';
import { OfficesService } from '../services/offices.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class OfficesComponent implements OnInit {

  offices!: Row<Office>[];
  officeColumns: Column<Office>[] = [
    { field: 'name', title: 'Nombre' },
    { field: 'email', title: 'Email' },
    { field: 'address', title: 'Direccion' }
  ];
  buttons: ButtonSettings[] = [
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
    }
  ];
  officesSearchFilters: string[] = ['values.name', 'values.email', 'values.name'];
  dialogDisplay: boolean = false;
  officeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    address: ['', [Validators.required]]
  });
  office: Office = { name: '', email: '', address: '', isEnabled: true };

  constructor(private officeService: OfficesService, 
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private msgService: MessageService) { }

  ngOnInit(): void {
    this.officeService.findAllOffice()
      .subscribe(resp => {
        this.offices = resp;
        console.log(this.offices);
      });
  }

  // if field is valid return true
  fieldValid(field: string) {
    return this.officeForm.controls[field].errors
      && this.officeForm.controls[field].touched;
  }

  saveOffice() {
    if(this.officeForm.invalid) {
      this.officeForm.markAllAsTouched();
      return;
    }
    const officeToSave: Office = this.officeForm.value;
    //if update
    if( this.office._id ) {
      officeToSave._id = this.office._id;
      this.officeService.updateOffice(officeToSave)
        .subscribe( res => {
          if( res ) {
            this.msgService.add({ severity: 'success', summary: 'Ok',
            detail: 'La sucursal se actualizo exitosamente', life: 2000 });
            const index = this.offices.findIndex( val => val.values._id === officeToSave._id);
            ( index !== -1 ) ? this.offices[index] = { values: officeToSave } : '';
          } else {
            this.msgService.add({ severity: 'error', summary:'Error', 
            detail: 'Se ha producido un error al intentar actualizar los datos de la sucursal, por favor intentelo de nuevo mas tarde'});
          }
        });
      //if add
    } else {
      this.officeService.saveOffice(officeToSave)
        .subscribe( res => {
          if( res.ok == true ) {
            this.msgService.add({ severity: 'success', summary: 'Ok',
              detail: 'La sucursal se ha creado exitosamente', life: 2000 });
            officeToSave._id = res.uid;
            this.offices.push({ values: officeToSave });
            this.offices = [ ...this.offices ];
          } else {
            this.msgService.add({ severity: 'error', summary: 'Error', 
              detail: 'Se ha producido un error al intentar actualizar los datos de la sucursal, por favor intentelo de nuevo mas tarde'});
          }
        });
    }
    this.dialogDisplay = false;
  }

  getTableEvent($event: GenericTableEvent<Office>) {
    switch ($event.type) {
      case 'edit':
        this.openEdit($event.data);
        break;
      case 'delete':
        this.openDelete($event.data);
        break;
    }
  }

  addOpen($event: boolean) {
    this.officeForm.reset();
    this.office._id = '';
    this.dialogDisplay = $event;
  }

  openDelete(data: Office) {
    this.confirmationService.confirm({
      message: `Esta seguro que desea eliminar la sucursal: ${ data.name }`,
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.officeService.deleteOffice(data._id!)
          .subscribe(resp => {
            if(resp) {
              this.msgService.add({severity: 'success', summary: 'OK', 
                detail: 'La sucursal se elimino exitosamente', life: 2000 });
              this.offices = this.offices.filter( val => val.values._id !== data._id );  
            } else {
              this.msgService.add({ severity: 'error', summary: 'Error', 
              detail: 'Ocurrio un error al intentar eliminar la sucursal', life: 2000 })
            }
          });
        
      }
    });
  }

  openEdit(office: Office) {
    this.office = office;
    this.officeForm.setValue({
      name: office.name,
      email: office.email,
      address: office.address
    });
    this.dialogDisplay = true;
  }
}
