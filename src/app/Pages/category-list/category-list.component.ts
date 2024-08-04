import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../core/service/category.service";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {DialogCategoryListComponent} from "./dialog-category-list/dialog-category-list.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'categoryName', 'actions'];
  data: any[] = [];
  dataSource = new MatTableDataSource(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.getCategoryList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getCategoryList() {
    this.categoryService.getCategory().subscribe((res) => {
      if(res) {
        this.dataSource.data = res.arrayProductType;
      }
    });
  }
  deleteCategory(id: number) {
    if(window.confirm('Are you sure you want to delete?')) {
      this.categoryService.deleteCategory(id).subscribe(res => {
        if(res) {
          this.toastr.success('Category deleted successfully', 'Success');
          this.getCategoryList();
        }
      });
    } else return;
  }

  openDialog(id?: number): void {
    const selectedItem = this.dataSource.data.find(category => category.categoryId === id);
    let dialogRef;

    if (selectedItem) {
      dialogRef = this.dialog.open(DialogCategoryListComponent, {
        data: {...selectedItem, isAdd: false},
      });
    } else {
      dialogRef = this.dialog.open(DialogCategoryListComponent, {
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
          isAdd: true
        }
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategoryList();
      }
    });
  }
}
