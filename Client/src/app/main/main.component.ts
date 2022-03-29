import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';
import { NavItem } from '../_models/nav';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../_dialogs/profile-dialog/profile-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public isSmallScreen = false;

  main = this.menuService.main;
  components = this.menuService.components;
  settings = this.menuService.settings;

  mainLength = 0;
  componentsLength = 0;
  settingsLength = 0;
  displayComponentHeader = this.menuService.displayComponentHeader;

  constructor(
    breakpointObserver: BreakpointObserver,
    private menuService: MenuService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.isSmallScreen = breakpointObserver.isMatched('(min-width: 1000px)');
    breakpointObserver.observe('(min-width: 1000px)').subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.countMenuItems();
    });
  }

  countMenuItems() {
    this.main.forEach((item) => {
      setTimeout(() => {
        if (!item.disabled) {
          this.mainLength++;
        }
      });
      this.checkCurrentUrl(item);
    });

    this.components.forEach((item) => {
      setTimeout(() => {
        if (!item.disabled) {
          this.componentsLength++;
        }
      });
      this.checkCurrentUrl(item);
    });

    this.settings.forEach((item) => {
      setTimeout(() => {
        if (!item.disabled) {
          this.settingsLength++;
        }
      });
      this.checkCurrentUrl(item);
    });
  }

  checkCurrentUrl(item: NavItem): void {
    this.menuService.currentUrl.subscribe((url: string) => {
      if (item.route && url) {
        item.expanded = url.indexOf(`${item.route}`) === 0;
      }
    });
  }

  closeNav(snav: any): void {
    if (!this.isSmallScreen) {
      snav.close();
    }
  }

  logout(): void {
    // TODO: Add logout function
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  editProfile(): void {
    /************ DEMO CONTENT START ************/
    // TODO: Delete demo content
    const user = {
      id: 1,
      userName: 'jdoe',
      email: 'jdoe@test.com',
      firstname: 'John',
      lastname: 'Doe',
      created: new Date(),
      updated: new Date()
    };
    /************ DEMO CONTENT END ************/
    // TODO: Add get user (e.g. from localStorage)
    this.dialog.open(ProfileDialogComponent, {
      data: user,
      width: '500px'
    });
  }
}
