import { Component } from '@angular/core';
import { MenuService } from './_services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DefaultAngular';

  constructor(menuService: MenuService) {
    menuService.initMenu();
  }
}
