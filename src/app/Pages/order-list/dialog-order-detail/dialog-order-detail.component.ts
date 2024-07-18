import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {CurrencyFormatPipe} from "../../../core/pipes/currency-format.pipe";
import {DatetimeFormatPipe} from "../../../core/pipes/datetime-format.pipe";
import {NgFor} from "@angular/common";
import {MatButton} from "@angular/material/button";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dialog-order-detail',
  standalone: true,
  imports: [
    MatDialogModule,
    CurrencyFormatPipe,
    DatetimeFormatPipe,
    NgFor,
    MatButton
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

  generatePDF(id: number) {
    const DATA: any = document.getElementById('invoice');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 210;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      const fileName = `invoice_#${id}.pdf`;
      PDF.save(fileName);
    });
  }
}
