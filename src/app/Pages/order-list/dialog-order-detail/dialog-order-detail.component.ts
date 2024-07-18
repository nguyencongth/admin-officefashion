import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {CurrencyFormatPipe} from "../../../core/pipes/currency-format.pipe";
import {DatetimeFormatPipe} from "../../../core/pipes/datetime-format.pipe";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-dialog-order-detail',
  standalone: true,
  imports: [
    MatDialogModule,
    CurrencyFormatPipe,
    DatetimeFormatPipe,
    NgFor
  ],
  templateUrl: './dialog-order-detail.component.html',
  styleUrl: './dialog-order-detail.component.css'
})
export class DialogOrderDetailComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit() {
    console.log(this.data);
  }
}
