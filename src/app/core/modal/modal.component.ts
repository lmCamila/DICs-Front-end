import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private modalService: ModalService) { }

  ngOnInit() {
  }

  onClickConfirm() {
    this.modalService.setConfirmAction(true);
    this.dialogRef.close();
  }

  onClickCancel() {
    this.modalService.setConfirmAction(false);
    this.dialogRef.close();
  }

}
