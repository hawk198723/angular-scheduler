import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { AppComponent } from './app.component';
import { RequestModalComponent } from './request-modal/request-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserModule,
    ScheduleModule,
    ButtonModule,
    ContextMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  declarations: [AppComponent, RequestModalComponent],
  bootstrap: [AppComponent],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
  ],
})
export class AppModule {}
