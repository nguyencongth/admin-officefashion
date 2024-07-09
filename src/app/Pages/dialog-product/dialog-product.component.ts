import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {CategoryService} from "../../core/service/category.service";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-dialog-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogProductComponent implements OnInit {
  categories: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.getCategory();
  }
  formProduct = this.fb.group({
    productId: [this.data.productId, Validators.required],
    categoryId: [this.data.categoryId, Validators.required],
    productName: [this.data.productName, Validators.required],
    entryPrice: [this.data.entryPrice, Validators.required],
    price: [this.data.price, Validators.required],
    quantityStock: [this.data.quantityStock, Validators.required],
    quantitySold: [this.data.quantitySold, Validators.required],
    imageProduct: [this.data.imageProduct, Validators.required],
    descProduct: [this.data.descProduct, Validators.required],
    dateAdded: [this.data.dateAdded, Validators.required],
  });

  getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data.arrayProductType;
    })
  }
}
