import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ButtonSettings, Row, Column, GenericTableEvent } from '../interfaces/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent<T> implements AfterViewChecked{

  @Input() rows!: Row<T>[];
  @Input() headers!: Column<T>[];
  @Input() buttons!: ButtonSettings[];
  @Input() filters!: string[];
  @Output() parentMethod = new EventEmitter<GenericTableEvent<T>>();
  @Output() addMethod = new EventEmitter<boolean>();
  loading: boolean = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    if(this.rows !== undefined){
      this.loading = false;
    }
    this.cd.detectChanges();
  }

  sendData(data: T, type: string) {
    this.parentMethod.emit({data, type});
  }

  addEvent(open: boolean) {
    this.addMethod.emit(true);
  }

}
