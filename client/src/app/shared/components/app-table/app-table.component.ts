import { Component, Input, AfterViewInit } from '@angular/core';
import { Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent extends Ng2SmartTableComponent implements AfterViewInit {
  @Input() settings;
  @Input() source;

  ngAfterViewInit(): void {
    // this.table.grid.dataSet.deselectAll();
    // this.table.grid.dataSet['rows'][0].isSelected = false;
    // this.table.grid.dataSet['selectedRow'] = null;
    // console.log('table:', this.table);
  }

}
