import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {CategoryService} from "../../core/service/category.service";
import {NgFor, NgIf} from "@angular/common";
import {ProductService} from "../../core/service/product.service";

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
})
export class DialogProductComponent implements OnInit {
  categories: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}
  ngOnInit(): void {
    this.getCategory();
  }
  formProduct = this.fb.group({
    categoryId: [this.data.categoryId, Validators.required],
    productName: [this.data.productName, Validators.required],
    entryPrice: [this.data.entryPrice, Validators.required],
    price: [this.data.price, Validators.required],
    quantityStock: [this.data.quantityStock, Validators.required],
    quantitySold: [this.data.quantitySold, Validators.required],
    imageProduct: [this.data.imageProduct, Validators.required],
    descProduct: [this.data.descProduct, Validators.required],
    dateAdded: [this.data.isAdd ? "2024-07-09T07:35:26.604Z" : this.data.dateAdded, Validators.required],
  });

  getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data.arrayProductType;
    })
  }

  addNewProduct() {
    const data = this.formProduct.value;
    this.productService.addNewProduct(data).subscribe((data) => {
      if(data) {
        this.dialogRef.close(true);
      }
    })
  }

  updateInfoProduct() {
    const productId = this.data.productId;
    const data = {productId, ...this.formProduct.value};
    this.productService.updateProduct(data).subscribe((data) => {
      if(data) {
        this.dialogRef.close(true);
      }
    })
  }

  handleClick(isAdd: boolean) {
    if (isAdd) {
      this.addNewProduct();
    } else {
      this.updateInfoProduct();
    }

  }
}
