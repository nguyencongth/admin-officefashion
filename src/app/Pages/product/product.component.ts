import { Subject, forkJoin, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {ProductService} from "../../core/service/product.service";
import {CategoryService} from "../../core/service/category.service";

@Component({
  selector: 'app-product',
  styleUrl: 'product.component.css',
  templateUrl: 'product.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule
  ],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  selected = '';
  displayedColumns: string[] = ['id', 'category', 'name', 'entryPrice', 'price', 'quantityStock', 'quantitySold', 'dateAdded', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: Router,
    public dialog: MatDialog
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
      });
  }

  // openDialog(id: number): void {
  //   const selectedItem = this.dataSource.data.find(book => book.id === id);
  //   if (selectedItem) {
  //     this.dialog.open(DialogBorrowComponent, {
  //       data: selectedItem
  //     });
  //   }
  // }
}
