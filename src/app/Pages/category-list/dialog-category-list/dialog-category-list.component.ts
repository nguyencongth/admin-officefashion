import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {CategoryService} from "../../../core/service/category.service";

@Component({
  selector: 'app-dialog-category-list',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-category-list.component.html',
  styleUrl: './dialog-category-list.component.css'
})
export class DialogCategoryListComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCategoryListComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}
  formCategory = this.fb.group({
    categoryName: [this.data.categoryName, Validators.required],
  });
  ngOnInit() {
    console.log(this.data);
  }

  addCategory() {
    this.categoryService.createCategory(this.formCategory.value).subscribe(res => {
      if(res) {
        this.dialogRef.close(true);
      }
    })
  }

  updateCategory() {
    const categoryId = this.data.categoryId;
    const data = {
      categoryId,
      ...this.formCategory.value
    }
    this.categoryService.updateCategory(data).subscribe(res => {
      if(res) {
        this.dialogRef.close(true);
      }
    })
  }

  handleClick(isAdd: boolean) {
    if(isAdd) {
      this.addCategory();
    } else {
      this.updateCategory();
    }
  }
}
