import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { format, isEqual, isWithinInterval } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

/** @title Date range picker forms integration */
@Component({
  selector: 'the-date-picker',
  templateUrl: 'date-picker.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule
  ],
})
export class DateRangePickerComponent {
 
    selectedDate:Date | undefined;
  constructor() {


    
  }
  


  
}
