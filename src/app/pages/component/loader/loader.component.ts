import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone: true,
  imports: [MatProgressSpinnerModule,AsyncPipe],
})
export class LoaderComponent {

}
