import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  standalone:true,
  imports:[MatDialogModule]
})
export class ToastComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ="",){}
  ngOnInit(): void {
      
  }

}
