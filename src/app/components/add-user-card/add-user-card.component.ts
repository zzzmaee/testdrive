import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-user-card',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-user-card.component.html',
  styleUrl: './add-user-card.component.css'
})
export class AddUserCardComponent {
  public myForm: FormGroup;
  public isEdit: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AddUserCardComponent>,
              private formBuilder: FormBuilder) {
    this.isEdit = !!data;
    this.myForm = this.formBuilder.group({
      id: [data?.id || null],
      name: [data?.name || ''],
      email: [data?.email || '', [Validators.required, Validators.email]],
      username: [data?.username || ''],
      phone: [data?.phone || '', Validators.pattern(/^[0-9]+$/)]
    });
  }

  public closeDialog(): void {
    this.ref.close('Closed using function');
    console.log('Closed using function');
  }

  public saveUser(): void {
    if (this.myForm.valid) {
      this.ref.close(this.myForm.value);
    }
  }
}
