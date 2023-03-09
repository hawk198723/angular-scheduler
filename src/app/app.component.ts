import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  extend,
  closest,
  isNullOrUndefined,
  remove,
  removeClass,
} from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ScheduleComponent,
  CellClickEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import {
  ContextMenuComponent,
  MenuItemModel,
  BeforeOpenCloseMenuEventArgs,
  MenuEventArgs,
} from '@syncfusion/ej2-angular-navigations';
import { scheduleData } from './datasource';
import { MatDialog } from '@angular/material/dialog';
import { RequestModalComponent } from './request-modal/request-modal.component';
import { View } from '@syncfusion/ej2-angular-schedule';
// template: '<ejs-schedule height="850" width="1250"></ejs-schedule>',
// templateUrl: './app.component.html',
// @Component({
//   selector: 'app-root',
//   template: '<ejs-schedule height="850" width="1250"></ejs-schedule>',
//   // templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   title = 'scheduler-app';
// }
@Component({
  selector: 'app-root',
  // template:'<ejs-schedule height="850" width="1250" [currentView]= "setView"></ejs-schedule>',
  templateUrl: './app.component.html',
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  // public setView: View = "Month";
  constructor(private dialogRef: MatDialog) {}
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent | null = null;
  @ViewChild('menuObj')
  public menuObj: ContextMenuComponent | null = null;
  public allowResizing: Boolean = false;
  public allowDragDrop: Boolean = false;
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = {
    dataSource: <Object[]>extend([], scheduleData, undefined, true),
  };
  public selectedTarget: Element | null = null;
  public menuItems: MenuItemModel[] = [
    {
      text: 'Annual Leave Request',
      iconCss: 'e-icons new',
      id: 'Add',
    },
    {
      text: 'Other Requests',
      iconCss: 'e-icons new',
      id: 'Add',
    },
  ];

  onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    const newEventElement: HTMLElement = document.querySelector(
      '.e-new-event'
    ) as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass(
        [document.querySelector('.e-selected-cell')!],
        'e-selected-cell'
      );
    }
    if (this.scheduleObj) {
      this.scheduleObj.closeQuickInfoPopup();
    }
    const targetElement: HTMLElement = <HTMLElement>args.event.target;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    this.selectedTarget = closest(
      targetElement,
      '.e-appointment,.e-work-cells,' +
        '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells'
    );
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }
  }

  onMenuItemSelect(args: MenuEventArgs): void {
    switch (args.item.text) {
      case 'Annual Leave Request':
        this.openAnnualLeaveRequestModal();
        break;
      case 'Other Requests':
        this.openOtherRequestsModal();
        break;
      default:
        break;
    }
  }

  openAnnualLeaveRequestModal() {
    this.dialogRef.open(RequestModalComponent, {});
  }

  openOtherRequestsModal() {
    //leave this one blank for now
  }
}
