import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from '../_models/nav';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // TODO: Set to true if you want to add an header for components
  public displayComponentHeader = false;

  public main: NavItem[] = [];

  public components: NavItem[] = [];

  public settings: NavItem[] = [];

  public currentUrl = new BehaviorSubject<string>('');

  constructor(private router: Router, private translate: TranslateService) {
    setTimeout(() => {
      this.initMenu();
    }, 1000);
    this.router.events.subscribe((event) => {
      this.findMenuItem(event);
      setTimeout(() => {
        this.findMenuItem(event);
      }, 1000);
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public initMenu() {
    this.main = [];
    this.components = [];
    this.settings = [];

    // TODO: Change menu items

    // INIT TRANSLATION FOR MAIN MENU
    // Use menu.mainMenu.KEY and this.main.push

    // INIT TRANSLATION FOR COMPONENTS MENU
    // Use menu.componentMenu.KEY and this.components.push
    this.translate.get('menu.componentMenu.dashboard').subscribe((name) => {
      this.components.push({
        displayName: name,
        iconName: 'dashboard',
        route: '/dashboard'
      });
    });
    this.translate.get('menu.componentMenu.example').subscribe((name) => {
      this.components.push({
        displayName: name,
        iconName: 'list_alt',
        route: '/example'
      });
    });

    // INIT TRANSLATION FOR SETTINGS MENU
    // Use menu.settingsMenu.KEY and this.settings.push
    this.translate.get('menu.settingsMenu.user').subscribe((name) => {
      this.settings.push({
        displayName: name,
        iconName: 'people',
        route: '/users'
      });
    });
  }

  private findMenuItem(event: any) {
    let menuItem = [];
    const temp1 = this.main.filter((i) => i.route === event.url);
    const temp2 = this.components.filter((i) => i.route === event.url);
    const temp3 = this.settings.filter((i) => i.route === event.url);
    if (temp1.length > 0) {
      menuItem = temp1;
    } else if (temp2.length > 0) {
      menuItem = temp2;
    } else if (temp3.length > 0) {
      menuItem = temp3;
    } else {
      return;
    }
    if (menuItem[0].disabled) {
      this.router.navigate(['/']);
    }
  }
}
