import { Subject, forkJoin, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Input} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {ProductService} from "../../core/service/product.service";
import {CategoryService} from "../../core/service/category.service";
import {DialogProductComponent} from "../dialog-product/dialog-product.component";
import {CurrencyFormatPipe} from "../../core/pipes/currency-format.pipe";
import {DatetimeFormatPipe} from "../../core/pipes/datetime-format.pipe";
import {AuthService} from "../../core/service/auth.service";
import {ToastrService} from "ngx-toastr";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-product',
  styleUrl: 'product.component.css',
  templateUrl: 'product.component.html',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    CurrencyFormatPipe,
    DatetimeFormatPipe,
    MatProgressSpinnerModule
  ],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  selected = '';
  isLoading: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  customDiameter = 50;
  displayedColumns: string[] = ['id', 'category', 'name', 'entryPrice', 'price', 'quantityStock', 'quantitySold', 'dateAdded', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    public authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData() {
    forkJoin(
      [
        this.productService.getProduct(),
        this.categoryService.getCategory(),
      ],
      (productList, categoryList) => {
        return {
          products: productList,
          categories: categoryList
        };
      }
    ).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe((data) => {
        const newData = data.products.arrayProduct.map((product: any) => {
          const found = data.categories.arrayProductType.find((category: any) => category.categoryId === product.categoryId)
          return {
            ...product,
            categoryName: found ? found.categoryName : null
          }
        })
        this.dataSource.data = [...newData];
        this.isLoading = false;
      });
  }

  deleteProduct(id: number) {
    if(window.confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(res => {
        if(res) {
          this.toastr.success('Product has been deleted successfully!', 'Success');
          this.getData();
        }
      });
    } else return;
  }

  openDialogProduct(id?: number): void {
    const selectedItem = this.dataSource.data.find(product => product.productId === id);
    let dialogRef;

    if (selectedItem) {
      dialogRef = this.dialog.open(DialogProductComponent, {
        data: {...selectedItem, isAdd: false},
      });
    } else {
      dialogRef = this.dialog.open(DialogProductComponent, {
        data: {
          productId: null,
          categoryId: null,
          productName: null,
          entryPrice: null,
          price: null,
          quantityStock: null,
          quantitySold: null,
          imageProduct: null,
          descProduct: null,
          dateAdded: null,
          discountPercentage: null,
          isAdd: true
        }
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  applyNameFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.productName.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
