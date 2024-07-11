import { Component, ViewChild } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbar,
    MatNavList,
    MatListItem,
    MatIcon,
    NgClass,
    NgIf,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;
  isExpanded = true;
  showSubmenuStatistical: boolean = false;
  isShowing = false;
  showSubMenuAccount: boolean = false;

  constructor(protected authService: AuthService) {}

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
