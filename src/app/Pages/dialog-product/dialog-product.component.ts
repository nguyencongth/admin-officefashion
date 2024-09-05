import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {CategoryService} from "../../core/service/category.service";
import {NgFor, NgIf} from "@angular/common";
import {ProductService} from "../../core/service/product.service";
import {MatIcon} from "@angular/material/icon";
import {CloudinaryModule} from '@cloudinary/ng';
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-dialog-product',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    CloudinaryModule,
    MatProgressSpinnerModule,
    NgIf,
    NgFor,
    MatIcon
  ],
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogProductComponent implements OnInit {
  categories: any[] = [];
  imageUrl: string;
  file_store: FileList;
  isLoading = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  customDiameter = 50;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.getCategory();
    this.imageUrl = this.formProduct.get('imageProduct')?.value;
    this.formProduct.get('imageProduct')?.valueChanges.subscribe((value) => {
      this.imageUrl = value;
      this.cdRef.detectChanges();
    });
  }
  formProduct = this.fb.group({
    categoryId: [this.data.categoryId, Validators.required],
    productName: [this.data.productName, Validators.required],
    entryPrice: [this.data.entryPrice, [Validators.required, Validators.min(0)]],
    price: [this.data.price, [Validators.required, Validators.min(0)]],
    quantityStock: [this.data.quantityStock, [Validators.required, Validators.min(0)]],
    quantitySold: [this.data.quantitySold, [Validators.required, Validators.min(0)]],
    imageProduct: [this.data.imageProduct, Validators.required],
    descProduct: [this.data.descProduct, Validators.required],
    dateAdded: [this.data.isAdd ? "2024-07-09T07:35:26.604Z" : this.data.dateAdded, Validators.required],
    discountPercentage: [this.data.discountPercentage],
  });

  getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data.arrayProductType;
    })
  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.formProduct.controls.imageProduct.patchValue(`${f.name}${count}`);

      // Read the image file and generate a URL for display
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(f);
    } else {
      this.formProduct.controls.imageProduct.patchValue("");
      this.imageUrl = null; // Clear the image URL if no file is selected
      this.cdRef.detectChanges();
    }
  }

  uploadToCloudinary(file: File): Observable<string> {
    const url = `https://api.cloudinary.com/v1_1/di82e5pnv/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    return this.http.post<any>(url, formData).pipe(
      map(response => response.secure_url) // Extract the URL from the response
    );
  }

  addNewProduct() {
    this.isLoading = true;
    if (this.file_store && this.file_store.length) {
      const file = this.file_store[0];
      this.uploadToCloudinary(file).pipe(
        switchMap(imageUrl => {
          this.formProduct.controls.imageProduct.patchValue(imageUrl);
          const data = this.formProduct.value;
          return this.productService.addNewProduct(data);
        })
      ).subscribe((data) => {
        if (data) {
          this.toastr.success('Thêm sản phẩm thành công', 'Thành công');
          this.dialogRef.close(true);
          this.isLoading = false;
        }
      });
    } else {
      const data = this.formProduct.value;
      this.productService.addNewProduct(data).subscribe((data) => {
        if (data) {
          this.toastr.success('Thêm sản phẩm thành công', 'Thành công');
          this.dialogRef.close(true);
        }
      });
    }
  }

  updateInfoProduct() {
    this.isLoading = true;
    if (this.file_store && this.file_store.length) {
      const file = this.file_store[0];
      this.uploadToCloudinary(file).pipe(
        switchMap(imageUrl => {
          this.formProduct.controls.imageProduct.patchValue(imageUrl);
          const productId = this.data.productId;
          const data = { productId, ...this.formProduct.value };
          return this.productService.updateProduct(data);
        })
      ).subscribe((data) => {
        if (data) {
          this.toastr.success('Cập nhật sản phẩm thành công', 'Thành công');
          this.dialogRef.close(true);
          this.isLoading = false;
        }
      });
    } else {
      const productId = this.data.productId;
      const data = { productId, ...this.formProduct.value };
      this.productService.updateProduct(data).subscribe((data) => {
        if (data) {
          this.toastr.success('Cập nhật sản phẩm thành công', 'Thành công');
          this.dialogRef.close(true);
        }
      });
    }
  }

  handleClick(isAdd: boolean) {
    if (isAdd) {
      this.addNewProduct();
    } else {
      this.updateInfoProduct();
    }

  }
}
