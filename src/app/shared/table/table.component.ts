import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSettings, Row, Column, GenericTableEvent } from '../interfaces/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent<T> {

  @Input() rows!: Row<T>[];
  @Input() headers!: Column<T>[];
  @Input() buttons!: ButtonSettings[];
  @Input() filters!: string[];
  @Output() parentMethod = new EventEmitter<GenericTableEvent<T>>();
  @Output() addMethod = new EventEmitter<boolean>();

  constructor() { }

  sendData(data: T, type: string) {
    this.parentMethod.emit({data, type});
  }

  addEvent(open: boolean) {
    this.addMethod.emit(true);
  }

}
