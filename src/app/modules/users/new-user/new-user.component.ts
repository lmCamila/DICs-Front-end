import { CloudinaryService } from './../service/cloudinary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/shared/models/department';
import { Process } from 'src/app/shared/models/Process';
import { Subscription } from 'rxjs';
import { StructureApiService } from 'src/app/core/services/structure-api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {
  formUser: FormGroup;
  title: string;
  oruFile: File;
  srcAvatar = '/assets/default-user-icon.jpg';
  listDepartments: Department[];
  listProcess: Process[];
  listProcessByDepartment: Process[];

  inscriptionUpload: Subscription;
  avatarEvent: Subscription;
  processSubscription: Subscription;
  departmentSubscription: Subscription;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private structureApiService: StructureApiService,
              private cloudinaryService: CloudinaryService,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<NewUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(10)]],
      email: [null, [Validators.required, Validators.email]],
      idDepartment: [null, [Validators.required]],
      idProcess: [null, []],
      isLeaderDepartment: [null, []],
      isLeaderProcess: [null, []],
      isAdmin: [null, []]
    });
   }

  ngOnInit() {
    this.departmentSubscription = this.structureApiService.getDepartment().subscribe(
      data => this.listDepartments = data
    );
    this.processSubscription = this.structureApiService.getProcess().subscribe(
      data => this.listProcess = data
    );
  }

  close() {
    this.dialogRef.close();
  }

  openInput() {
    document.getElementById('fileInput').click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.oruFile = files[0];
      this.onChangeAvatar(files[0]);
    }
  }

  filterByDepartment(department) {
    console.log(department);
    this.listProcessByDepartment = this.listProcess.filter(p => p.department.id === department.id);
  }

  ngOnDestroy() {
    this.processSubscription.unsubscribe();
    this.departmentSubscription.unsubscribe();
  }

  onChangeAvatar(file) {
    this.loading = true;
    this.cloudinaryService.upload(file);
    this.avatarEvent = this.cloudinaryService.issueUrlResponse.subscribe(url => {
      this.srcAvatar = url;
      this.loading = false;
    });
  }
}
