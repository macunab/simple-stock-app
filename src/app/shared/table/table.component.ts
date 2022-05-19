import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHeader, ButtonSettings } from '../interfaces/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  // Implements generics pending

  @Input() dataTable!: any[];
  @Input() headers!: TableHeader[];
  @Input() buttons!: ButtonSettings[];
  @Output() parentMethod = new EventEmitter<any>();

  constructor() { }

  sendMessage(data: any, type: string) {
    this.parentMethod.emit({data, type});
  }

}
