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
  @Output() parentMethod = new EventEmitter<GenericTableEvent<T>>();

  constructor() { }

  sendData(data: T, type: string) {
    this.parentMethod.emit({data, type});
  }

}
