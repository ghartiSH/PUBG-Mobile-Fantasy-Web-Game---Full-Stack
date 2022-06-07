import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessage } from 'src/app/model/ErrorMessage';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorMessage, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick(){
    this.dialog.closeAll();
  }

}
